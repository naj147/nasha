import * as THREE from 'three'
import { Image } from '@react-three/drei'
import './util'
const MiddleImage = () => {
    return (
      <Image  url={`/logo.gif`} transparent side={THREE.DoubleSide} >
        <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
      </Image>
    )
  }


  export default MiddleImage