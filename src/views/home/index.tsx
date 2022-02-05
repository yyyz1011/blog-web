import React, { useEffect } from 'react'
import * as THREE from 'three'
import './index.less'

const Home: React.FC = () => {

  const initThree = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    const threeId = document.getElementById('three')
    if (!threeId) return
    threeId.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    renderer.render(scene, camera)
  }

  useEffect(() => {
    initThree()
  })

  return (
    <>
      <div id='three' />
    </>
  )
}

export default Home