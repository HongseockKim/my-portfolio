import React, {useMemo, useRef} from 'react';
import {useFrame} from '@react-three/fiber';

function ParticleField({ mousePos }) {
    const meshRef = useRef();
    const particleCount = 1000;

    // 파티클 위치 생성
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;     // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
        }
        return pos;
    }, []);

    // 애니메이션
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;

            // 마우스 인터랙션
            meshRef.current.rotation.x += mousePos.y * 0.1;
            meshRef.current.rotation.y += mousePos.x * 0.1;
        }
    });

    return (
        <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
          size={0.05}
          color="#64ffda"
          transparent
          opacity={0.6}
          sizeAttenuation
      />
    </points>
    );
}

export default ParticleField;