import React from 'react';
import {Box, Float, Sphere, Torus} from '@react-three/drei';

function FloatingObjects() {
    return (
        <group>
      {/* 큐브 */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Box position={[-4, 1, -2]} args={[1, 1, 1]}>
          <meshStandardMaterial
              color="#ff6b6b"
              metalness={0.5}
              roughness={0.2}
              emissive="#ff1744"
              emissiveIntensity={0.2}
          />
        </Box>
      </Float>

            {/* 구체 */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere position={[4, -1, 1]} args={[0.8]}>
          <meshStandardMaterial
              color="#4ecdc4"
              metalness={0.8}
              roughness={0.1}
              emissive="#00bcd4"
              emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>

            {/* 토러스 */}
            <Float speed={1} rotationIntensity={2} floatIntensity={1}>
        <Torus position={[2, 2, -3]} args={[1, 0.3, 16, 32]}>
          <meshStandardMaterial
              color="#ffd54f"
              metalness={0.6}
              roughness={0.3}
              emissive="#ff9800"
              emissiveIntensity={0.15}
          />
        </Torus>
      </Float>

            {/* 더 많은 오브젝트들 */}
            {Array.from({ length: 5 }, (_, i) => (
                <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1}>
          <Box
              position={[
                  Math.sin(i * 2) * 6,
                  Math.cos(i * 2) * 3,
                  -5 + i
              ]}
              args={[0.5, 0.5, 0.5]}
          >
            <meshStandardMaterial
                color={`hsl(${i * 60}, 70%, 60%)`}
                metalness={0.7}
                roughness={0.2}
            />
          </Box>
        </Float>
            ))}
    </group>
    );
}

export default FloatingObjects;