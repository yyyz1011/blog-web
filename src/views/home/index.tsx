import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import './index.less'
import { FBXLoader } from '@/utils/threejs/FBXLoader'
import { throttle } from 'lodash-es'

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
    if (!camera || !renderer || !scene) return
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight)
    const threeId = document.getElementById('three')
    if (!threeId) return
    threeId.appendChild(renderer.domElement)
    camera.position.set(0, 35, 0)
    renderer.render(scene, camera)
  }

  const initLight = () => {
    if (!camera || !renderer || !scene) return
    const ambientLight = new THREE.AmbientLight(0xFFFFE0, 0.2)
    scene.add(ambientLight)
    const lightPosition = {
      x: 35,
      y: 60,
      z: -60
    }
    const pointLightPink = new THREE.PointLight(0xFFB6C1, 0.4)
    pointLightPink.position.set(lightPosition.x, lightPosition.y, lightPosition.z)
    scene.add(pointLightPink)
    const pointLightBlue = new THREE.PointLight(0x00CED1, 0.4)
    pointLightBlue.position.set(-lightPosition.x, lightPosition.y, lightPosition.z)
    scene.add(pointLightBlue)
    const light = new THREE.PointLight(0xffffff, 0.2)
    light.castShadow = true
    light.position.set(lightPosition.x, lightPosition.y, lightPosition.z)
    scene.add(light)
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
      object && scene?.add(object)
    })
  }

  const animate = () => {
    if (!camera || !renderer || !scene) return
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  window.onresize = throttle(() => {
    if (!camera || !renderer || !scene) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, 60)

  useEffect(() => {
    if (!renderer || !scene || !camera) {
      init()
    }
  }, [renderer, scene, camera])

  useEffect(() => {
    initThree()
    initLight()
    initModel()
  }, [renderer, scene, camera])

  useEffect(() => {
    animate()
  })

  return (
    <>
      <div id='three' />
    </>
  )
}

export default Home