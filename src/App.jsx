import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import './App.css'
import SubstanceModel from "./components/object/SubstanceModel.jsx";
import {OrbitControls} from "@react-three/drei";
import Modal from "./components/modal/Modal.jsx";
import PortThree from "./components/PortThree.jsx";
import useModalStore from "./store/useModalStore.jsx";
import MyInfo from "./components/MyInfo.jsx";

function App() {
    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const type = useModalStore(state => state.type);
    const calculateCameraPosition = () => {
        const baseWidth = 1920;
        const baseDistance = 10;
        const scaleFactor = Math.max(0.8, Math.min(1.5, baseWidth / window.innerWidth));
        const zPosition = baseDistance * scaleFactor;

        return [0, 0, zPosition];
    };

    useEffect(() => {
        const handleResize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="app">
      <Canvas
          shadows
          camera={{
              position: calculateCameraPosition(),
              fov: 75,
              aspect: viewportSize.width / viewportSize.height,
              near: 0.1,
              far: 1000
          }}
          style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
          }}
      >
        <Suspense fallback={null}>
          <Scene viewportSize={viewportSize} />
            <OrbitControls
                enablePan={false} // 패닝(이동) 비활성화
                enableZoom={true} // 줌 활성화
                enableRotate={true} // 회전 활성화
                minDistance={2} // 최소 줌 거리
                maxDistance={10} // 최대 줌 거리
                rotateSpeed={0.5} // 회전 속도
                target={[0, 0, 0]} // 카메라가 바라보는 중심점
                autoRotate={false} // 자동 회전 활성화
                autoRotateSpeed={1} // 자동 회전 속도

            />
        </Suspense>
      </Canvas>
            <Modal>
                {
                    type === 'portfolio' ? <PortThree/> : <MyInfo/>
                }

            </Modal>
    </div>
    )
}

export default App