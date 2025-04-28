<script lang="ts">
	import * as THREE from 'three';
	import type { Map } from '$lib/utils/pocketbase';

	const { map, scene }: { map: Map; scene: THREE.Scene } = $props();

	// Color scheme for different building types
	const colors = {
		ground: 0x8b8b8b, // Light gray for ground
		mainBuilding: 0x4a90e2, // Blue for main building
		sideBuilding: 0x50e3c2, // Teal for side building
		storage: 0xf5a623, // Orange for storage
		temporary: 0xd0021b // Red for temporary structures
	};

	$effect(() => {
		if (map && scene) {
			// Clear existing map objects
			scene.children.forEach((child) => {
				if (child.userData.isMapObject) {
					scene.remove(child);
				}
			});

			// Create new map objects
			map.mapDefinition.shapes.forEach((shape, index) => {
				let geometry: THREE.BufferGeometry;
				let material: THREE.MeshStandardMaterial;

				switch (shape.type) {
					case 'plane':
						geometry = new THREE.PlaneGeometry(shape.width, shape.height);
						material = new THREE.MeshStandardMaterial({
							color: colors.ground,
							side: THREE.DoubleSide,
							roughness: 0.8,
							metalness: 0.2
						});
						break;
					case 'box':
						geometry = new THREE.BoxGeometry(shape.width, shape.height, shape.depth);
						// Assign colors based on building type/position
						let buildingColor = colors.mainBuilding;
						if (index === 2) buildingColor = colors.sideBuilding;
						if (index === 3) buildingColor = colors.storage;
						if (index === 4) buildingColor = colors.temporary;

						material = new THREE.MeshStandardMaterial({
							color: buildingColor,
							transparent: true,
							opacity: 0.9,
							roughness: 0.5,
							metalness: 0.3
						});
						break;
				}

				const mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(shape.position.x, shape.position.y, shape.position.z);

				if (shape.rotation) {
					mesh.rotation.set(shape.rotation.x, shape.rotation.y, shape.rotation.z);
				}

				// Mark as map object for easy cleanup
				mesh.userData.isMapObject = true;

				scene.add(mesh);
			});
		}
	});
</script>
