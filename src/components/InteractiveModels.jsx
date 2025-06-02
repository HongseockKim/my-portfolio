// src/components/InteractiveModels.jsx
import React, {useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import {Box, Dodecahedron, Html, Octahedron, Sphere, Text} from '@react-three/drei';
import * as THREE from 'three';

function InteractiveModels({ mousePos }) {
    const groupRef = useRef();
    const [hoveredModel, setHoveredModel] = useState(null);
    const [clickedModel, setClickedModel] = useState(null);

    // 애니메이션 루프
    useFrame((state) => {
        if (groupRef.current) {
            // 마우스 추적
            groupRef.current.rotation.x += (mousePos.y * 0.05 - groupRef.current.rotation.x) * 0.1;
            groupRef.current.rotation.y += (mousePos.x * 0.05 - groupRef.current.rotation.y) * 0.1;

            // 자동 회전
            groupRef.current.rotation.z += 0.002;
        }
    });

    // 모델 정보
    const models = [
        {
            id: 'react',
            position: [-6, 2, 0],
            color: '#61dafb',
            title: 'React',
            description: '컴포넌트 기반 UI 라이브러리',
            Component: Octahedron,
            props: { args: [1.2] }
        },
        {
            id: 'threejs',
            position: [6, -1, 2],
            color: '#049ef4',
            title: 'Three.js',
            description: '3D 그래픽 라이브러리',
            Component: Dodecahedron,
            props: { args: [1] }
        },
        {
            id: 'javascript',
            position: [0, -3, -1],
            color: '#f7df1e',
            title: 'JavaScript',
            description: '동적 프로그래밍 언어',
            Component: Box,
            props: { args: [1.5, 1.5, 1.5] }
        },
        {
            id: 'webgl',
            position: [-3, -2, 3],
            color: '#ff6b6b',
            title: 'WebGL',
            description: '웹 3D 그래픽 API',
            Component: Sphere,
            props: { args: [1, 32, 32] }
        }
    ];

    // 클릭 핸들러
    const handleClick = (modelId) => {
        setClickedModel(modelId === clickedModel ? null : modelId);

        // 클릭 시 카메라 줌 인 효과 (선택사항)
        console.log(`🎯 ${modelId} 클릭됨!`);
    };

    return (
        <group ref={groupRef}>
      {models.map((model) => {
          const { id, position, color, title, description, Component, props } = model;
          const isHovered = hoveredModel === id;
          const isClicked = clickedModel === id;

          return (
              <group key={id} position={position}>
            {/* 3D 모델 */}
                  <Component
                      {...props}
                      onPointerEnter={() => setHoveredModel(id)}
                      onPointerLeave={() => setHoveredModel(null)}
                      onClick={() => handleClick(id)}
                      scale={isHovered ? 1.3 : isClicked ? 1.5 : 1}
                  >
              <meshStandardMaterial
                  color={color}
                  metalness={isHovered ? 0.8 : 0.5}
                  roughness={isHovered ? 0.1 : 0.3}
                  emissive={color}
                  emissiveIntensity={isHovered ? 0.3 : isClicked ? 0.5 : 0.1}
                  transparent
                  opacity={isHovered ? 1 : 0.9}
              />
            </Component>

                  {/* 3D 텍스트 라벨 */}
                  {(isHovered || isClicked) && (
                      <Text
                          position={[0, 2, 0]}
                          fontSize={0.5}
                          color="white"
                          anchorX="center"
                          anchorY="middle"
                          font="/fonts/helvetiker_regular.typeface.json"
                      >
                {title}
              </Text>
                  )}

                  {/* HTML 툴팁 - 클릭했을 때만 표시 */}
                  {isClicked && (
                      <Html
                          position={[0, 2.5, 0]}
                          center
                          style={{
                              pointerEvents: 'none',
                              userSelect: 'none'
                          }}
                      >
                <div className="model-tooltip">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="tooltip-actions">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log(`📖 ${title} 자세히 보기`);
                        }}
                        style={{ pointerEvents: 'auto' }}
                    >
                      자세히 보기
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setClickedModel(null);
                        }}
                        style={{ pointerEvents: 'auto' }}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </Html>
                  )}

                  {/* 파티클 이펙트 - 호버/클릭 시 */}
                  {(isHovered || isClicked) && (
                      <ParticleRing
                          radius={2}
                          count={isClicked ? 50 : 20}
                          color={color}
                      />
                  )}

                  {/* 홀로그램 링 - 클릭했을 때 */}
                  {isClicked && (
                      <HologramRing
                          radius={2.5}
                          color={color}
                          speed={2}
                      />
                  )}
          </group>
          );
      })}
    </group>
    );
}

// 🎨 파티클 링 컴포넌트
function ParticleRing({ radius = 2, count = 20, color = '#ffffff' }) {
    const meshRef = useRef();

    const positions = React.useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            pos[i * 3] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = Math.sin(angle) * radius;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
        return pos;
    }, [count, radius]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.elapsedTime * 2;
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
          size={0.1}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
      />
    </points>
    );
}

// ✨ 홀로그램 링 컴포넌트
function HologramRing({ radius = 2.5, color = '#64ffda', speed = 1 }) {
    const ringRef = useRef();

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * speed;
            ringRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.05, 8, 32]} />
      <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
      />
    </mesh>
    );
}

export default InteractiveModels;