import { useSpring, animated } from '@react-spring/three'
import { Text } from '@react-three/drei'

const ShootingStarText = ({ children, finalPosition, delay = 0 }) => {
    const springs = useSpring({
        from: {
            position: [-20, 10, -5],
            opacity: 0,
            scale: 0.1
        },
        to: {
            position: finalPosition,
            opacity: 1,
            scale: 1
        },
        config: { tension: 120, friction: 14 },
        delay: delay
    })

    return (
        <animated.group {...springs}>
            <Text
                fontSize={0.5}
                color="#FFE81F"
                material-transparent={true}
                outlineWidth={0.02}
                outlineColor="#FFA500"
            >
                {children}
            </Text>
        </animated.group>
    )
}

export default ShootingStarText