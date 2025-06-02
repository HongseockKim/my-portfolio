import React from 'react';

function Scene() {

    return (
        <>
                  <mesh
                      position={[0, -8, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      receiveShadow
                  >
                <planeGeometry args={[100, 20,20,30]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
            <ambientLight intensity={0.1} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <fog attach="fog" args={['#fff', 0, 100]} />
        </>

    );
}

export default Scene;