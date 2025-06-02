import React, {useState} from 'react';
import {useThree} from '@react-three/fiber';
import {Center, ContactShadows, Environment, Float, OrbitControls, Text3D} from '@react-three/drei';
import {Bloom, EffectComposer} from '@react-three/postprocessing';

import FloatingObjects from './FloatingObjects';
import ParticleField from './ParticleField';
import InteractiveModels from "./InteractiveModels.jsx";

function Scene() {
    const { viewport } = useThree();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // 마우스 추적
    const handlePointerMove = (event) => {
        setMousePos({
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        });
    };

    return (
        <>
      {/* 카메라 컨트롤 */}
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2}
                minDistance={5}
                maxDistance={50}
            />

            {/* 조명 설정 */}
            <ambientLight intensity={0.4} />
      <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-10, -10, -10]} color="#ff6b6b" intensity={0.5} />
      <pointLight position={[10, -10, 10]} color="#4ecdc4" intensity={0.5} />

            {/* 환경 */}
            <Environment preset="city" />

            {/* 파티클 배경 */}
            <ParticleField mousePos={mousePos} />

            {/* 3D 텍스트 */}
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Center>
          <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={viewport.width / 8}
              height={0.2}
              position={[0, 2, 0]}
          >
            PORTFOLIO
            <meshStandardMaterial color="#ffffff" />
          </Text3D>
        </Center>
      </Float>

            {/* 떠다니는 오브젝트들 */}
            <FloatingObjects />

            {/* 인터랙티브 모델들 */}
            <InteractiveModels mousePos={mousePos} />

            {/* 바닥 그림자 */}
            <ContactShadows
                position={[0, -4, 0]}
                opacity={0.4}
                scale={20}
                blur={1.5}
                far={4.5}
            />

            {/* 포스트 프로세싱 */}
            <EffectComposer>
        <Bloom
            intensity={0.5}
            luminanceThreshold={0.8}
            luminanceSmoothing={0.9}
        />
      </EffectComposer>

            {/* 마우스 이벤트 */}
            <mesh
                position={[0, 0, -5]}
                onPointerMove={handlePointerMove}
                visible={false}
            >
        <planeGeometry args={[100, 100]} />
      </mesh>
    </>
    );
}

export default Scene;