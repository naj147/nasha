import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ScrollControls, useScroll, useTexture } from '@react-three/drei'
import { easing } from 'maath'
import { Banner } from './components/vibyBanner.js'
import './components/util'
import MiddleImage from './components/MiddleImage.js'

const App = () => (
  <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
    <fog attach="fog" args={['#a79', 8.5, 12]} />
    <ScrollControls pages={4} infinite>
      <Rig rotation={[0, 0.6, -0.4]}>
        <MiddleImage/>
      </Rig>
      <Banner position={[0, -0.15, 0]} />
    </ScrollControls>
    <Environment preset="dawn" background blur={0.5} />
  </Canvas>
)

function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2) // Rotate contents
    state.events.update() // Raycasts every frame rather than on pointer-move
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
    state.camera.lookAt(0, 0, 0) // Look at center
  })
  return <group ref={ref} {...props} />
}




export default App