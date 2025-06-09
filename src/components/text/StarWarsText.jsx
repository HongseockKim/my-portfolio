import { useSpring, animated } from '@react-spring/three'
import { Text } from '@react-three/drei'
import { useEffect, useState } from 'react'

const StarWarsText = ({ children, delay = 0, duration = 8000 }) => {
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    const springs = useSpring({
        from: {
            position: [0, 8, -2],
            opacity: 0,
            rotationX: Math.PI / 6,
            scale: 1.5
        },
        to: started ? {
            position: [0, -15, -8],
            opacity: 0,
            rotationX: Math.PI / 4,
            scale: 0
        } : {
            position: [0, 8, -2],
            opacity: 0,
            rotationX: Math.PI / 6,
            scale: 1.5
        },
        config: { duration: duration, easing: t => t }, // 일정한 속도
    })

    return (
        <animated.group
            position={springs.position}
            rotation-x={springs.rotationX}
            scale={springs.scale}
        >
            <animated.mesh material-opacity={springs.opacity}>
                <Text
                    fontSize={0.5}
                    color="#FFE81F"
                    material-transparent={true}
                    outlineWidth={0.03}
                    outlineColor="#FFA500"
                    textAlign="center"
                    maxWidth={8}
                    lineHeight={1.2}
                >
                    {children}
                </Text>
            </animated.mesh>
        </animated.group>
    )
}

export default StarWarsText