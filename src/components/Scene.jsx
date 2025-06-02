import React from 'react';

function Scene() {

    return (
        <>
            <mesh visible userData={{ hello: 'world' }} position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="hotpink" transparent />
            </mesh>
                  <mesh
                      position={[0, -1, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      receiveShadow
                  >
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#f0f0f0" />
            </mesh>
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
        </>

    );
}

export default Scene;