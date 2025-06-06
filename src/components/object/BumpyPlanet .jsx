import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { TextureLoader } from 'three';

function BumpyPlanet(props) {
    const meshRef = useRef();
    const [textures, setTextures] = React.useState({
        color: null,
        displacement: null,
        normal: null,
    });

    // 텍스처 로딩
    useEffect(() => {
        const textureLoader = new TextureLoader();

        if (props.colorMap) {
            textureLoader.load(props.colorMap, (texture) => {
                setTextures(prev => ({ ...prev, color: texture }));
            });
        }

        if (props.displacementMap) {
            textureLoader.load(props.displacementMap, (texture) => {
                setTextures(prev => ({ ...prev, displacement: texture }));
            });
        }

        if (props.normalMap) {
            textureLoader.load(props.normalMap, (texture) => {
                setTextures(prev => ({ ...prev, normal: texture }));
            });
        }
    }, [props.colorMap, props.displacementMap, props.normalMap]);

    // 행성 회전
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
      <Sphere args={[props.radius || 3, 128, 128]}>
        <meshStandardMaterial
            color={props.color || "#a3a3a3"}
            map={textures.color}
            displacementMap={textures.displacement}
            displacementScale={props.displacementScale || 0.3}
            normalMap={textures.normal}
            roughness={props.roughness || 0.8}
            metalness={props.metalness || 0.2}
        />
      </Sphere>
    </mesh>
    );
}

export default BumpyPlanet;