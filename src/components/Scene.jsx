import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SubstanceModel from "./object/SubstanceModel.jsx";

function Scene({ viewportSize }) {
    const { camera } = useThree();
    const controlsRef = useRef();

    // 화면 크기에 따른 카메라 업데이트
    useEffect(() => {
        if (camera) {
            // 화면 비율 업데이트
            camera.aspect = viewportSize.width / viewportSize.height;

            // 화면 너비에 따라 카메라 위치 조정
            const baseWidth = 1920;
            const baseDistance = 10;
            const scaleFactor = Math.max(0.8, Math.min(1.5, baseWidth / viewportSize.width));

            // 카메라 위치 직접 설정
            camera.position.set(0, 0, baseDistance * scaleFactor);
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();

            // 컨트롤 리셋
            if (controlsRef.current) {
                controlsRef.current.update();
            }
        }
    }, [viewportSize, camera]);

    return (
        <>
            {/* OrbitControls 추가 */}
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