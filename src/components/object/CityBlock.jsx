function CityBlock() {
    const buildings = [
        // 각 건물의 설정 [x, z, width, height, depth, color]
        { pos: [0, 0, 0], size: [2, 6, 2], color: "#4a90e2" },      // 파란 건물
        { pos: [4, 0, 0], size: [1.5, 4, 1.5], color: "#e74c3c" }, // 빨간 건물
        { pos: [-4, 0, 0], size: [2.5, 8, 2], color: "#2ecc71" },  // 초록 건물
        { pos: [0, 0, 5], size: [3, 5, 2.5], color: "#f39c12" },   // 주황 건물
        { pos: [6, 0, 3], size: [1.8, 7, 1.8], color: "#9b59b6" }, // 보라 건물
        { pos: [-3, 0, -4], size: [2.2, 4.5, 2.2], color: "#1abc9c" }, // 청록 건물
    ];

    return (
        <group>
            {buildings.map((building, index) => (
                <Building
                    key={index}
                    position={building.pos}
                    width={building.size[0]}
                    height={building.size[1]}
                    depth={building.size[2]}
                    color={building.color}
                />
            ))}
        </group>
    );
}
export default CityBlock;