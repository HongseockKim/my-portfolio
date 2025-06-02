import React from 'react';
import Building from "./object/Building.jsx";

function Scene() {

    return (
        <>
                  <mesh
                      position={[0, -8, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      receiveShadow
                  >
                <planeGeometry args={[50, 30,20,30]} />
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
            <mesh position={[-7, -5, -5]} castShadow>
                <Building position={[-6, 0, 0]} width={5} height={7} depth={1} color="#4a90e2" />
            </mesh>
        </>

    );
}

export default Scene;