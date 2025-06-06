import { Environment, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import planetModel from '../../models/planet2.glb';
import buildingModel from '../../models/portpolio.glb';
import mys from '../../models/my.glb';

function SubstanceModel({ scale = 1, position = [0, 0, 0] }) {
    const group = useRef();
    const planetRef = useRef();

    // 모델 로드
    const { scene: planetScene } = useGLTF(planetModel);
    const { scene: portPolioScene } = useGLTF(buildingModel);
    const { scene: my } = useGLTF(mys);

    // PivotControls에서 확인한 값
    const buildingPosition = [1.6,0.55, 1.2];
    const buildingRotation = [-5.6, -0.4,-1];
    const buildingScale = 5;
    const myPosition = [-1,-0.5, 1.67];
    const myRotation = [1.5, -1.5,-0.2];
    const myScale = 1;

    return (
        <group>
            {/* 행성 그룹 */}
            <group ref={group} position={position} scale={scale}>
                <Environment preset="sunset" background={false} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <primitive ref={planetRef} object={planetScene} />
            </group>

            {/* 테스트용 좌표축 표시 - 개발 완료 후 제거 가능 */}
            <axesHelper args={[20]} />

            {/* 고정된 위치와 회전으로 건물 배치 */}
            <group
                position={buildingPosition}
                rotation={buildingRotation}
                scale={buildingScale}
            >
                <primitive object={portPolioScene.clone()} />
            </group>
            <group
                position={myPosition}
                rotation={myRotation}
                scale={myScale}
            >
                <primitive object={my.clone()} />
            </group>
        </group>
    );
}

// 모델 프리로드
useGLTF.preload(planetModel);
useGLTF.preload(buildingModel);

export default SubstanceModel;