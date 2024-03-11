import { Card } from './card.js'
import { useRef } from 'react'
import { Environment, ScrollControls, useScroll, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function Carousel({ radius = 1.4, count = 8 }) {
    return Array.from({ length: count }, (_, i) => (
      <Card
        key={i}
        url={`/img${Math.floor(i % 10) + 1}_.jpg`}
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      />
    ))
  }

  export default function Banner(props) {
    const ref = useRef()
    const texture = useTexture('/logo_text.png')
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    const scroll = useScroll()
    useFrame((state, delta) => {
      ref.current.material.time.value += Math.abs(scroll.delta) * 4
      ref.current.material.map.offset.x += delta / 2
    })
    return (
      <mesh ref={ref} {...props}>
        <cylinderGeometry args={[1.6, 1.6, 0.2, 128, 16, true]} />
        <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[40, 1]} side={THREE.DoubleSide} toneMapped={true} />
      </mesh>
    )
  }