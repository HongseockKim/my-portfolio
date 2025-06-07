import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SubstanceModel from "./object/SubstanceModel.jsx";
import * as THREE from 'three';


function Scene({ viewportSize }) {
    const { camera, scene } = useThree();
    const controlsRef = useRef();
    const starsRef = useRef();

    useEffect(() => {
        scene.background = new THREE.Color('#000000');
        scene.fog = new THREE.FogExp2('#000000', 0.010);
    }, [scene]);

    useFrame((state, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.x += delta * 0.01;
            starsRef.current.rotation.y += delta * 0.01;
        }
    });

    useEffect(() => {
        if (camera) {
            camera.aspect = viewportSize.width / viewportSize.height;
            const baseWidth = 1920;
            const baseDistance = 10;
            const scaleFactor = Math.max(0.8, Math.min(1.5, baseWidth / viewportSize.width));
            camera.position.set(0, 0, baseDistance * scaleFactor);
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();

            if (controlsRef.current) {
                controlsRef.current.update();
            }
        }
    }, [viewportSize, camera]);

    return (
        <>
            <group ref={starsRef}>
                <Stars
                    radius={100}
                    depth={50}
                    count={3000}
                    factor={10}
                    saturation={0.5}
                    fade
                />
            </group>
               <group>
                <Stars
                    radius={120}
                    depth={80}
                    count={1000}
                    factor={20}
                    saturation={0.8}
                    fade
                />
            </group>


            <OrbitControls
                ref={controlsRef}
                enableDamping
                dampingFactor={0.05}
                rotateSpeed={0.5}
                zoomSpeed={0.7}
                minDistance={5}
                maxDistance={50}
            />

            <mesh
                position={[0, -2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
            >
                <SubstanceModel
                    scale={20}
                    position={[0, 0, 0]}
                />
            </mesh>
        </>
    );
}

export default Scene;