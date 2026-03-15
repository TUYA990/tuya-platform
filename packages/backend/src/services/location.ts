import { query } from './database';

interface LocationUpdate {
  userId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  speed?: number;
  heading?: number;
  timestamp?: Date;
}

interface RideLocation {
  rideId: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

// Update driver location
export const updateDriverLocation = async (update: LocationUpdate): Promise<void> => {
  try {
    await query(
      `UPDATE drivers 
       SET latitude = $1, longitude = $2, last_location_update = NOW()
       WHERE user_id = $3`,
      [update.latitude, update.longitude, update.userId]
    );
  } catch (error: any) {
    throw new Error(`Failed to update driver location: ${error.message}`);
  }
};

// Record ride location history
export const recordRideLocation = async (location: RideLocation): Promise<void> => {
  try {
    const { v4: uuidv4 } = await import('uuid');
    
    await query(
      `INSERT INTO ride_locations (id, ride_id, latitude, longitude, timestamp)
       VALUES ($1, $2, $3, $4, $5)`,
      [uuidv4(), location.rideId, location.latitude, location.longitude, location.timestamp || new Date()]
    );
  } catch (error: any) {
    throw new Error(`Failed to record ride location: ${error.message}`);
  }
};

// Get driver current location
export const getDriverLocation = async (driverId: string) => {
  try {
    const result = await query(
      `SELECT latitude, longitude, last_location_update
       FROM drivers
       WHERE user_id = $1`,
      [driverId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return {
      latitude: result.rows[0].latitude,
      longitude: result.rows[0].longitude,
      lastUpdate: result.rows[0].last_location_update,
    };
  } catch (error: any) {
    throw new Error(`Failed to get driver location: ${error.message}`);
  }
};

// Get ride location history
export const getRideLocationHistory = async (rideId: string) => {
  try {
    const result = await query(
      `SELECT latitude, longitude, timestamp
       FROM ride_locations
       WHERE ride_id = $1
       ORDER BY timestamp ASC`,
      [rideId]
    );

    return result.rows.map((row) => ({
      latitude: row.latitude,
      longitude: row.longitude,
      timestamp: row.timestamp,
    }));
  } catch (error: any) {
    throw new Error(`Failed to get ride location history: ${error.message}`);
  }
};

// Calculate distance traveled
export const calculateDistanceTraveled = (locations: Array<{ latitude: number; longitude: number }>): number => {
  if (locations.length < 2) {
    return 0;
  }

  let totalDistance = 0;

  for (let i = 0; i < locations.length - 1; i++) {
    const lat1 = locations[i].latitude;
    const lon1 = locations[i].longitude;
    const lat2 = locations[i + 1].latitude;
    const lon2 = locations[i + 1].longitude;

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
    const distance = R * c;

    totalDistance += distance;
  }

  return Math.round(totalDistance * 100) / 100;
};

// Get ride route
export const getRideRoute = async (rideId: string) => {
  try {
    const locations = await getRideLocationHistory(rideId);

    if (locations.length === 0) {
      return {
        waypoints: [],
        distance: 0,
        duration: 0,
      };
    }

    const distance = calculateDistanceTraveled(locations);

    // Calculate duration from first to last location
    const firstTimestamp = new Date(locations[0].timestamp).getTime();
    const lastTimestamp = new Date(locations[locations.length - 1].timestamp).getTime();
    const duration = Math.round((lastTimestamp - firstTimestamp) / 1000 / 60); // in minutes

    return {
      waypoints: locations,
      distance,
      duration,
    };
  } catch (error: any) {
    throw new Error(`Failed to get ride route: ${error.message}`);
  }
};

// Check if location is valid (not too far from expected route)
export const isValidLocation = (
  currentLat: number,
  currentLon: number,
  expectedLat: number,
  expectedLon: number,
  maxDeviation: number = 2 // km
): boolean => {
  const R = 6371;
  const dLat = ((expectedLat - currentLat) * Math.PI) / 180;
  const dLon = ((expectedLon - currentLon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((currentLat * Math.PI) / 180) *
      Math.cos((expectedLat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= maxDeviation;
};

// Detect GPS spoofing (impossible speed)
export const detectGPSSpoofing = (
  previousLat: number,
  previousLon: number,
  currentLat: number,
  currentLon: number,
  timeDiffSeconds: number,
  maxSpeed: number = 250 // km/h
): boolean => {
  if (timeDiffSeconds <= 0) {
    return false;
  }

  const R = 6371;
  const dLat = ((currentLat - previousLat) * Math.PI) / 180;
  const dLon = ((currentLon - previousLon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((previousLat * Math.PI) / 180) *
      Math.cos((currentLat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  const speedKmH = (distance / (timeDiffSeconds / 3600));

  return speedKmH > maxSpeed;
};
