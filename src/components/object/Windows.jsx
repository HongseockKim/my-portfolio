function Windows({ buildingWidth, buildingHeight, buildingDepth }) {
    const windows = [];

    // 앞면 창문들
    for (let floor = 1; floor < Math.floor(buildingHeight / 1.5); floor++) {
        for (let col = 0; col < 2; col++) {
            windows.push(
                <mesh
                    key={`front-${floor}-${col}`}
                    position={[
                        (col - 0.5) * (buildingWidth * 0.6),  // 좌우 배치
                        floor * 1.5,                          // 층별 높이
                        buildingDepth / 2 + 0.02                // 벽 앞쪽
                    ]}
                >
                    <boxGeometry args={[0.4, 0.4, 0.05]} />
                    <meshStandardMaterial
                        color="#87ceeb"    // 하늘색 유리
                        transparent
                        opacity={0.7}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh >
            );
        }
    }
}

export default Windows;