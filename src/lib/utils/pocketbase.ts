import PocketBase from 'pocketbase';
import type { RecordModel } from 'pocketbase';
import { VITE_POCKETBASE_URL } from '$env/static/private';

// Create a new PocketBase instance
export const pb = new PocketBase(VITE_POCKETBASE_URL);

// Collection names
export const COLLECTIONS = {
  MAPS: 'maps',
  POINTS: 'points',
  USERS: 'users'
} as const;

// Types for our collections
export interface Map extends RecordModel {
  name: string;
  mapDefinition: {
    shapes: Array<{
      type: 'plane' | 'box';
      width: number;
      height: number;
      depth?: number;
      position: { x: number; y: number; z: number };
      rotation?: { x: number; y: number; z: number };
    }>;
    metadata: { scale: number };
  };
}

export interface Point extends RecordModel {
  mapId: string;
  x: number;
  y: number;
  z: number;
  label: string;
  type: string;
}

export interface User extends RecordModel {
  mapId: string;
  name: string;
  position: { x: number; y: number; z: number };
  status: string;
}

// Helper functions for common operations
export async function getActiveMap() {
  // For now, just get the first map
  // In a real app, you might want to implement map selection
  const records = await pb.collection(COLLECTIONS.MAPS).getList<Map>(1, 1);
  return records.items[0];
}

export async function getPointsForMap(mapId: string) {
  const records = await pb.collection(COLLECTIONS.POINTS)
    .getList<Point>(1, 50, {
      filter: `mapId = "${mapId}"`
    });
  return records.items;
}

export async function getUsersForMap(mapId: string) {
  const records = await pb.collection(COLLECTIONS.USERS)
    .getList<User>(1, 50, {
      filter: `mapId = "${mapId}"`
    });
  return records.items;
} 