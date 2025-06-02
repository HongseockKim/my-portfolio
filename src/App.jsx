import React, {Suspense, useState} from 'react'
import {Canvas} from '@react-three/fiber';
import Scene from './components/Scene';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="app">
      {/* 3D 캔버스 */}
          <Canvas
              camera={{
                  position: [0, 0, 10],
                  fov: 75
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
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
