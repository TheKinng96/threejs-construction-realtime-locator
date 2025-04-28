import type { Map, Point, User } from './pocketbase';

export const mockMap: Map = {
  id: 'mock-map-1',
  collectionId: 'maps',
  collectionName: 'maps',
  name: 'Demo Construction Site',
  mapDefinition: {
    shapes: [
      // Ground plane
      {
        type: 'plane',
        width: 100,
        height: 100,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: -Math.PI / 2, y: 0, z: 0 }
      },
      // Main building structure
      {
        type: 'box',
        width: 20,
        height: 10,
        depth: 20,
        position: { x: 0, y: 5, z: 0 }
      },
      // Side building
      {
        type: 'box',
        width: 10,
        height: 15,
        depth: 10,
        position: { x: 30, y: 7.5, z: -20 }
      },
      // Storage area
      {
        type: 'box',
        width: 15,
        height: 5,
        depth: 15,
        position: { x: -25, y: 2.5, z: 25 }
      },
      // Temporary structure
      {
        type: 'box',
        width: 8,
        height: 4,
        depth: 8,
        position: { x: 20, y: 2, z: 15 }
      }
    ],
    metadata: { scale: 1 }
  },
  created: new Date().toISOString(),
  updated: new Date().toISOString()
};

export const mockPoints: Point[] = [
  {
    id: 'point-1',
    collectionId: 'points',
    collectionName: 'points',
    mapId: 'mock-map-1',
    x: 0,
    y: 0,
    z: 0,
    label: 'Main Entrance',
    type: 'entrance',
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'point-2',
    collectionId: 'points',
    collectionName: 'points',
    mapId: 'mock-map-1',
    x: 30,
    y: 0,
    z: -20,
    label: 'Side Building Entrance',
    type: 'entrance',
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'point-3',
    collectionId: 'points',
    collectionName: 'points',
    mapId: 'mock-map-1',
    x: -25,
    y: 0,
    z: 25,
    label: 'Storage Area',
    type: 'storage',
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    collectionId: 'users',
    collectionName: 'users',
    mapId: 'mock-map-1',
    name: 'Worker A',
    position: { x: 5, y: 0, z: 5 },
    status: 'working',
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'user-2',
    collectionId: 'users',
    collectionName: 'users',
    mapId: 'mock-map-1',
    name: 'Worker B',
    position: { x: -10, y: 0, z: 15 },
    status: 'moving',
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  },
  {
    id: 'user-3',
    collectionId: 'users',
    collectionName: 'users',
    mapId: 'mock-map-1',
    name: 'Excavator 1',
    position: { x: 20, y: 0, z: -10 },
    status: 'operating',
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  }
]; 