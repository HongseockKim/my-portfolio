function LightingSetup() {
    return (
        <>
            <ambientLight intensity={0.4} color="#ffffff" />
            <directionalLight
                position={[10, 10, 5]}    // 태양 위치
                intensity={1}
                color="#fff8dc"           // 따뜻한 햇빛
                castShadow               // 그림자 생성
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <directionalLight
                position={[-5, 5, -5]}
                intensity={0.3}
                color="#b0c4de"          // 차가운 보조 조명
            />
            <pointLight
                position={[0, 8, 0]}
                intensity={0.8}
                color="#ffffe0"
                distance={20}            // 조명 범위
            />
        </>
    );
}

export default LightingSetup;