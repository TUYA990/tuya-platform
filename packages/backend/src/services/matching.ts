import { query } from './database';

interface Driver {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  rating: number;
  totalRides: number;
  isOnline: boolean;
  distance?: number;
}

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Find nearest available drivers
export const findNearestDrivers = async (
  latitude: number,
  longitude: number,
  maxDistance: number = 5, // km
  limit: number = 5
): Promise<Driver[]> => {
  try {
    const result = await query(
      `SELECT 
        d.id, 
        d.user_id as "userId", 
        d.latitude, 
        d.longitude, 
        d.rating, 
        d.total_rides as "totalRides",
        d.is_online as "isOnline"
      FROM drivers d
      WHERE d.is_online = true
      AND d.latitude IS NOT NULL
      AND d.longitude IS NOT NULL`
    );

    const drivers = result.rows as Driver[];

    // Calculate distance for each driver
    const driversWithDistance = drivers
      .map((driver) => ({
        ...driver,
        distance: calculateDistance(latitude, longitude, driver.latitude, driver.longitude),
      }))
      .filter((driver) => driver.distance <= maxDistance)
      .sort((a, b) => {
        // Sort by: distance (primary), rating (secondary), total rides (tertiary)
        if (a.distance !== b.distance) {
          return a.distance - b.distance;
        }
        if (a.rating !== b.rating) {
          return b.rating - a.rating;
        }
        return b.totalRides - a.totalRides;
      })
      .slice(0, limit);

    return driversWithDistance;
  } catch (error: any) {
    throw new Error(`Failed to find nearest drivers: ${error.message}`);
  }
};

// Match passenger with driver
export const matchPassengerWithDriver = async (
  passengerId: string,
  rideId: string,
  pickupLatitude: number,
  pickupLongitude: number
): Promise<string | null> => {
  try {
    const nearestDrivers = await findNearestDrivers(
      pickupLatitude,
      pickupLongitude,
      5, // 5 km radius
      1 // Get only 1 driver
    );

    if (nearestDrivers.length === 0) {
      return null; // No drivers available
    }

    const selectedDriver = nearestDrivers[0];

    // Update ride with driver
    await query(
      'UPDATE rides SET driver_id = $1, status = $2 WHERE id = $3',
      [selectedDriver.userId, 'accepted', rideId]
    );

    return selectedDriver.userId;
  } catch (error: any) {
    throw new Error(`Failed to match passenger with driver: ${error.message}`);
  }
};

// Get driver availability score
export const getDriverAvailabilityScore = (driver: Driver): number => {
  let score = 100;

  // Reduce score based on rating (max 20 points)
  score -= (5 - driver.rating) * 4;

  // Reduce score based on total rides (newer drivers get priority)
  if (driver.totalRides > 100) {
    score -= 5;
  }

  return Math.max(0, score);
};

// Smart matching with availability score
export const smartMatchDriver = async (
  passengerId: string,
  rideId: string,
  pickupLatitude: number,
  pickupLongitude: number
): Promise<string | null> => {
  try {
    const nearestDrivers = await findNearestDrivers(
      pickupLatitude,
      pickupLongitude,
      10, // 10 km radius
      10 // Get top 10 drivers
    );

    if (nearestDrivers.length === 0) {
      return null;
    }

    // Score drivers based on multiple factors
    const scoredDrivers = nearestDrivers.map((driver) => ({
      ...driver,
      score:
        (1 - driver.distance / 10) * 50 + // Distance score (50%)
        (driver.rating / 5) * 30 + // Rating score (30%)
        getDriverAvailabilityScore(driver), // Availability score (20%)
    }));

    // Sort by score
    scoredDrivers.sort((a, b) => b.score - a.score);

    const selectedDriver = scoredDrivers[0];

    // Update ride with driver
    await query(
      'UPDATE rides SET driver_id = $1, status = $2 WHERE id = $3',
      [selectedDriver.userId, 'accepted', rideId]
    );

    return selectedDriver.userId;
  } catch (error: any) {
    throw new Error(`Failed to smart match driver: ${error.message}`);
  }
};
