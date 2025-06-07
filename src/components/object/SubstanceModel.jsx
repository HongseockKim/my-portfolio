import { Environment, useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import planetModel from '../../models/planet2.glb';
import buildingModel from '../../models/portpolio.glb';
import rock from '../../models/rock.glb';
import mys from '../../models/my.glb';
import useModalStore from "../../store/useModalStore.jsx";
import {useFrame} from "@react-three/fiber";

function SubstanceModel({ scale = 1, position = [0, 0, 0] }) {
    const group = useRef();
    const planetRef = useRef();
    const myCharacterRef = useRef();
    const rockRef = useRef();
    const panet3Ref = useRef();
    const [hoveredPortfolio, setHoveredPortfolio] = useState(false);
    const [hoveredMy, setHoveredMy] = useState(false);
    const { scene: planetScene } = useGLTF(planetModel);
    const { scene: portPolioScene } = useGLTF(buildingModel);
    const { scene: rockScne } = useGLTF(rock);
    const { scene: my } = useGLTF(mys);
    const buildingPosition = [1.6, 0.55, 1.2];
    const buildingRotation = [-5.6, -0.4, -1];
    const buildingScale = 5;
    const myPosition = [-1, -0.5, 1.67];
    const myRotation = [1.5, -1.5, -0.2];
    const myScale = 1;
    const openModal = useModalStore(state => state.openModal);
    const setType = useModalStore(state => state.setType);
    const initialY = myPosition[2];
    const floatAmplitude = 0.1;
    const floatSpeed = 1.2;
    const rockPosition = [5, 3, 5];



    useEffect(() => {
        document.body.style.cursor = hoveredPortfolio || hoveredMy ? 'pointer' : 'auto';
    }, [hoveredPortfolio, hoveredMy]);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (myCharacterRef.current) {
            const time = state.clock.elapsedTime;
            myCharacterRef.current.position.z = initialY + Math.sin(time * floatSpeed) * floatAmplitude;
        }

        if (rockRef.current || panet3Ref.current) {
            rockRef.current.position.x = rockPosition[0] + Math.sin(time * 0.3) * 0.5;
            rockRef.current.position.y = rockPosition[1] + Math.cos(time * 0.5) * 0.3;
            rockRef.current.position.z = rockPosition[2] + Math.sin(time * 0.4) * 0.4;

            rockRef.current.rotation.x = time * 0.1;
            rockRef.current.rotation.y = time * 0.15;
            rockRef.current.rotation.z = time * 0.05;
        }

    });



    const handlePortfolioClick = (event) => {
        event.stopPropagation();
        setType('portfolio');
        openModal();
    };

    const handleMyClick = (event) => {
        event.stopPropagation();
        setType('my');
        openModal();
    };

    return (
        <group>
            <group ref={rockRef}>
                <primitive object={rockScne.clone()} position={[5, 3, 5]} scale={2} />
            </group>
            <group ref={group} position={position} scale={scale}>
                <Environment preset="sunset" background={false} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <primitive ref={planetRef} object={planetScene} />
            </group>
            <group
                position={buildingPosition}
                rotation={buildingRotation}
                scale={buildingScale}
                onClick={handlePortfolioClick}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredPortfolio(true);
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredPortfolio(false);
                }}
                scale={hoveredPortfolio ? [buildingScale * 1.05, buildingScale * 1.05, buildingScale * 1.05] : [buildingScale, buildingScale, buildingScale]}
            >
                <primitive object={portPolioScene.clone()} />
            </group>
            <group
                ref={myCharacterRef}
                position={myPosition}
                rotation={myRotation}
                scale={myScale}
                onClick={handleMyClick}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredMy(true);
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredMy(false);
                }}
                scale={hoveredMy ? [myScale * 1.1, myScale * 1.1, myScale * 1.1] : [myScale, myScale, myScale]}
            >
                <primitive object={my.clone()} />
            </group>
        </group>
    );
}

useGLTF.preload(planetModel);
useGLTF.preload(buildingModel);
useGLTF.preload(rock);
useGLTF.preload(mys);

export default SubstanceModel;