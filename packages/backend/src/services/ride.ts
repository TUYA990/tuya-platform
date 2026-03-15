import { v4 as uuidv4 } from 'uuid';
import { query } from './database';

export const requestRide = async (passengerId: string, pickupLocation: string, destination: string, distance: number) => {
  try {
    const rideId = uuidv4();

    // Calculate fare (example: $0.5 per km + $2 base)
    const fare = (distance * 0.5) + 2;

    const result = await query(
      'INSERT INTO rides (id, passenger_id, pickup_location, destination, distance, fare, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *',
      [rideId, passengerId, pickupLocation, destination, distance, fare, 'pending']
    );

    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to request ride: ${error.message}`);
  }
};

export const acceptRide = async (rideId: string, driverId: string) => {
  try {
    const result = await query(
      'UPDATE rides SET driver_id = $1, status = $2, accepted_at = NOW() WHERE id = $3 RETURNING *',
      [driverId, 'accepted', rideId]
    );

    if (result.rows.length === 0) {
      throw new Error('Ride not found');
    }

    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to accept ride: ${error.message}`);
  }
};

export const startRide = async (rideId: string) => {
  try {
    const result = await query(
      'UPDATE rides SET status = $1, started_at = NOW() WHERE id = $2 RETURNING *',
      ['in_progress', rideId]
    );

    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to start ride: ${error.message}`);
  }
};

export const completeRide = async (rideId: string) => {
  try {
    const result = await query(
      'UPDATE rides SET status = $1, completed_at = NOW() WHERE id = $2 RETURNING *',
      ['completed', rideId]
    );

    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to complete ride: ${error.message}`);
  }
};

export const getRideById = async (rideId: string) => {
  try {
    const result = await query('SELECT * FROM rides WHERE id = $1', [rideId]);
    return result.rows[0];
  } catch (error: any) {
    throw new Error(`Failed to get ride: ${error.message}`);
  }
};

export const getAvailableRides = async () => {
  try {
    const result = await query('SELECT * FROM rides WHERE status = $1 ORDER BY created_at DESC', ['pending']);
    return result.rows;
  } catch (error: any) {
    throw new Error(`Failed to get rides: ${error.message}`);
  }
};
