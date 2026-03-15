import { query } from './database';

export const getDriverById = async (driverId: string) => {
  try {
    const result = await query('SELECT * FROM drivers WHERE user_id = $1', [driverId]);
    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to get driver: ${error.message}`);
  }
};

export const updateDriverStatus = async (driverId: string, isOnline: boolean) => {
  try {
    const result = await query(
      'UPDATE drivers SET is_online = $1, last_seen = NOW() WHERE user_id = $2 RETURNING *',
      [isOnline, driverId]
    );

    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to update driver status: ${error.message}`);
  }
};

export const updateDriverLocation = async (driverId: string, latitude: number, longitude: number) => {
  try {
    const result = await query(
      'UPDATE drivers SET latitude = $1, longitude = $2, last_location_update = NOW() WHERE user_id = $3 RETURNING *',
      [latitude, longitude, driverId]
    );

    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to update driver location: ${error.message}`);
  }
};

export const getNearbyDrivers = async (latitude: number, longitude: number, radiusKm: number = 5) => {
  try {
    // Using PostgreSQL earth distance extension
    const result = await query(
      `SELECT * FROM drivers 
       WHERE is_online = true 
       AND earth_distance(ll_to_earth($1, $2), ll_to_earth(latitude, longitude)) < $3 * 1000
       ORDER BY earth_distance(ll_to_earth($1, $2), ll_to_earth(latitude, longitude))`,
      [latitude, longitude, radiusKm]
    );

    return result.rows;
  } catch (error: any) {
    throw new Error(`Failed to get nearby drivers: ${error.message}`);
  }
};

export const addEarnings = async (driverId: string, amount: number) => {
  try {
    const result = await query(
      'UPDATE drivers SET total_earnings = total_earnings + $1 WHERE user_id = $2 RETURNING *',
      [amount, driverId]
    );

    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to add earnings: ${error.message}`);
  }
};
