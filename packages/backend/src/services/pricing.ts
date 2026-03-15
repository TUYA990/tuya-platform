import { query } from './database';

interface PricingRequest {
  distance: number;
  duration?: number;
  rideType: 'economy' | 'premium' | 'xl';
  pickupLatitude: number;
  pickupLongitude: number;
  hour?: number;
}

// Base rates per km and minute
const BASE_RATES = {
  economy: { perKm: 0.5, perMinute: 0.1, base: 2 },
  premium: { perKm: 0.75, perMinute: 0.15, base: 3 },
  xl: { perKm: 1.0, perMinute: 0.2, base: 4 },
};

// Calculate base fare
export const calculateBaseFare = (distance: number, rideType: 'economy' | 'premium' | 'xl'): number => {
  const rate = BASE_RATES[rideType];
  return rate.base + distance * rate.perKm;
};

// Calculate surge pricing multiplier
export const calculateSurgeMultiplier = async (
  latitude: number,
  longitude: number,
  hour: number = new Date().getHours()
): Promise<number> => {
  try {
    // Count active rides in the area
    const result = await query(
      `SELECT COUNT(*) as active_rides
       FROM rides
       WHERE status IN ('pending', 'accepted', 'in_progress')
       AND created_at > NOW() - INTERVAL '1 hour'`
    );

    const activeRides = parseInt(result.rows[0].active_rides);

    // Count online drivers in the area
    const driverResult = await query(
      `SELECT COUNT(*) as online_drivers
       FROM drivers
       WHERE is_online = true`
    );

    const onlineDrivers = parseInt(driverResult.rows[0].online_drivers);

    // Calculate demand ratio
    const demandRatio = onlineDrivers > 0 ? activeRides / onlineDrivers : 1;

    // Base surge multiplier
    let surgeMultiplier = 1;

    // Peak hours (7-9 AM, 5-7 PM)
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      surgeMultiplier = 1.5;
    }

    // Night hours (10 PM - 5 AM)
    if (hour >= 22 || hour <= 5) {
      surgeMultiplier = 1.3;
    }

    // Apply demand ratio
    if (demandRatio > 2) {
      surgeMultiplier *= 2; // 2x surge
    } else if (demandRatio > 1.5) {
      surgeMultiplier *= 1.5; // 1.5x surge
    } else if (demandRatio > 1) {
      surgeMultiplier *= 1.2; // 1.2x surge
    }

    return Math.min(surgeMultiplier, 3); // Cap at 3x
  } catch (error) {
    console.error('Error calculating surge multiplier:', error);
    return 1; // Default to no surge on error
  }
};

// Calculate total fare with surge pricing
export const calculateFare = async (request: PricingRequest): Promise<number> => {
  try {
    // Calculate base fare
    let fare = calculateBaseFare(request.distance, request.rideType);

    // Add time-based fare if duration provided
    if (request.duration) {
      const rate = BASE_RATES[request.rideType];
      fare += (request.duration / 60) * rate.perMinute;
    }

    // Calculate and apply surge multiplier
    const surgeMultiplier = await calculateSurgeMultiplier(
      request.pickupLatitude,
      request.pickupLongitude,
      request.hour
    );

    fare *= surgeMultiplier;

    // Round to 2 decimal places
    return Math.round(fare * 100) / 100;
  } catch (error: any) {
    throw new Error(`Failed to calculate fare: ${error.message}`);
  }
};

// Get pricing details
export const getPricingDetails = async (request: PricingRequest) => {
  try {
    const baseFare = calculateBaseFare(request.distance, request.rideType);
    const surgeMultiplier = await calculateSurgeMultiplier(
      request.pickupLatitude,
      request.pickupLongitude,
      request.hour
    );
    const totalFare = await calculateFare(request);

    return {
      baseFare: Math.round(baseFare * 100) / 100,
      surgeMultiplier: Math.round(surgeMultiplier * 100) / 100,
      totalFare,
      breakdown: {
        baseFare: Math.round(baseFare * 100) / 100,
        surgeFee: Math.round((totalFare - baseFare) * 100) / 100,
        total: totalFare,
      },
    };
  } catch (error: any) {
    throw new Error(`Failed to get pricing details: ${error.message}`);
  }
};

// Calculate driver earnings
export const calculateDriverEarnings = (fare: number, commissionRate: number = 0.2): number => {
  const commission = fare * commissionRate;
  const driverEarnings = fare - commission;
  return Math.round(driverEarnings * 100) / 100;
};

// Get fare estimate
export const getFareEstimate = async (
  distance: number,
  rideType: 'economy' | 'premium' | 'xl' = 'economy',
  pickupLatitude: number,
  pickupLongitude: number
): Promise<{
  minFare: number;
  maxFare: number;
  estimatedFare: number;
  surgeMultiplier: number;
}> => {
  try {
    const surgeMultiplier = await calculateSurgeMultiplier(pickupLatitude, pickupLongitude);

    const baseFare = calculateBaseFare(distance, rideType);
    const estimatedFare = baseFare * surgeMultiplier;

    return {
      minFare: Math.round(baseFare * 100) / 100,
      maxFare: Math.round(estimatedFare * 100) / 100,
      estimatedFare: Math.round(estimatedFare * 100) / 100,
      surgeMultiplier: Math.round(surgeMultiplier * 100) / 100,
    };
  } catch (error: any) {
    throw new Error(`Failed to get fare estimate: ${error.message}`);
  }
};
