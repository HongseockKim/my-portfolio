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
import {ScaleLoader} from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        }}>
            <ScaleLoader
                color="#36d7b7"
                height={50}
                width={5}
                radius={2}
                margin={2}
            />
            <div style={{ color: '#ffffff', marginTop: '20px', fontSize: '16px' }}>
                Loading...
            </div>
        </div>
    );
};


function App() {
    const [viewportSize, setViewportSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [isCanvasLoading, setIsCanvasLoading] = useState(true);
    const [isModelLoading, setIsModelLoading] = useState(true);
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

    const handleModelLoad = () => {
        setIsModelLoading(false);
    };


    return (
        <div className="app">
            {(isCanvasLoading || isModelLoading) && <LoadingSpinner />}
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
          onCreated={() => setIsCanvasLoading(false)}
      >
        <Suspense fallback={null}>
          <Scene viewportSize={viewportSize} onModelLoad={handleModelLoad} />
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={10}
                rotateSpeed={0.5}
                target={[0, 0, 0]}
                autoRotate={false}
                autoRotateSpeed={1}

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