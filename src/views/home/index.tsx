import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import './index.less'
import { FBXLoader } from '@/utils/threejs/FBXLoader'

const Home: React.FC = () => {

  const [scene, setScene] = useState<THREE.Scene | null>(null)
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null)

  const init = () => {
    setScene(new THREE.Scene())
    setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    setRenderer(new THREE.WebGLRenderer())
  }

  const initThree = () => {
    if (!renderer || !scene || !camera) return
    renderer.setSize(window.innerWidth, window.innerHeight)
    const threeId = document.getElementById('three')
    if (!threeId) return
    threeId.appendChild(renderer.domElement)

    camera.position.z = 10
    camera.position.y = 35
    camera.position.x = 0

    renderer.render(scene, camera)
  }

  const initModel = () => {
    let loader = new FBXLoader()
    loader.load(require('@/assets/model/home-fbx/ZZ01.fbx'), (object: any) => {
      object.traverse(function(child: any) {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      object.rotateY(Math.PI)
      scene?.add(object)
      if (scene && camera)
        renderer?.render(scene, camera)
    })
  }

  useEffect(() => {
    if (!renderer || !scene || !camera) {
      init()
    }
  }, [renderer, scene, camera])

  useEffect(() => {
    initThree()
    initModel()
  })

  return (
    <>
      <div id='three' />
    </>
  )
}

export default Home