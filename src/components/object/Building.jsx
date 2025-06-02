import {useFrame} from "@react-three/fiber";
import {useRef} from "react";
import Windows from "./Windows.jsx";

function Building({
                      position = [0, 0, 0],     // 건물 위치
                      width = 3,                // 가로
                      height = 3,               // 높이
                      depth = 2,                // 세로
                      color = "#4a90e2"         // 색상
                  }) {
    const buildingRef = useRef();

    // 🌟 건물 애니메이션 (선택사항)
    useFrame((state) => {
        if (buildingRef.current) {
            // 살짝 흔들리는 효과
            buildingRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.02;
        }
    });

    return (
        <group ref={buildingRef} position={position}>
            {/* 🏗️ 메인 건물 몸체 */}
            <mesh position={[0, height/2, 0]}>  {/* Y축 중심을 바닥에 맞춤 */}
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.1}      // 살짝 금속성
                    roughness={0.8}      // 거친 표면
                />
            </mesh>

            {/* 🏠 지붕 */}
            <mesh position={[0, height + 0.3, 0]}>
                <coneGeometry args={[width * 0.7, 0.8, 7]} />  {/* 사각뿔 지붕 */}
                <meshStandardMaterial color="#8b4513" />  {/* 갈색 지붕 */}
            </mesh>

            {/* 🚪 문 */}
            <mesh position={[0, 0.8, depth/2 + 0.01]}>  {/* 살짝 앞으로 */}
                <boxGeometry args={[1, 1.6, 0.1]} />
                <meshStandardMaterial color="#654321" />
            </mesh>

            {/* 🪟 창문들 */}
            <Windows
                buildingWidth={width}
                buildingHeight={height}
                buildingDepth={depth}
            />
        </group>
    );
}

export default Building;