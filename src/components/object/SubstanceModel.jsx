import { Environment, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import planetModel from '../../models/planet2.glb';
import buildingModel from '../../models/portpolio.glb';

function SubstanceModel({ scale = 1, position = [0, 0, 0] }) {
    const group = useRef();
    const planetRef = useRef();

    // 모델 로드
    const { scene: planetScene } = useGLTF(planetModel);
    const { scene: portPolioScene } = useGLTF(buildingModel);

    // PivotControls에서 확인한 값
    const buildingPosition = [1.8,-0.5, 1.5]; // 콘솔에서 확인한 위치
    const buildingRotation = [2.5, 0.4,-1]; // 회전 값 - 필요하다면 수정
    const buildingScale = 3;

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
        </group>
    );
}

// 모델 프리로드
useGLTF.preload(planetModel);
useGLTF.preload(buildingModel);

export default SubstanceModel;