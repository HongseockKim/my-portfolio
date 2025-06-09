import React, {lazy, Suspense, useEffect, useRef} from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import {OrbitControls, Stars, Text} from '@react-three/drei';
const SubstanceModel = lazy(() => import('./object/SubstanceModel.jsx'));
import * as THREE from 'three';
import ShootingStarText from "./text/ShootingStarText.jsx";
import StarWarsText from "./text/StarWarsText.jsx";


function Scene({ viewportSize,onModelLoad}) {
    const { camera, scene,gl } = useThree();
    const controlsRef = useRef();
    const starsRef = useRef();

    useEffect(() => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }, [gl]);

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
                    count={1500}
                    factor={10}
                    saturation={0.5}
                    fade
                />
            </group>
            <group position={[0,10,5]}>
                <StarWarsText delay={0} duration={6000} >
                    안녕하세요
                </StarWarsText>
                <StarWarsText delay={4000} duration={6000} >
                    찾아주셔서 감사합니다.
                </StarWarsText>
                <StarWarsText delay={8000} duration={6000} >
                    모델링을 클릭하면 상세보기가 가능합니다!
                </StarWarsText>
            </group>
               <group>
                <Stars
                    radius={120}
                    depth={80}
                    count={500}
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
                onAfterRender={() => onModelLoad?.()}
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