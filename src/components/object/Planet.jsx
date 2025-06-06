import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

function Planet(props) {
    const meshRef = useRef();

    // 행성 회전 애니메이션
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            castShadow
        >
      <Sphere args={[props.radius || 3, 64, 64]}>
        <meshStandardMaterial
            color={props.color || "#3c91e6"}
            roughness={0.7}
            metalness={0.2}
            map={props.texture}
            bumpMap={props.bumpMap}
            bumpScale={0.2}
        />
      </Sphere>
    </mesh>
    );
}

export default Planet;