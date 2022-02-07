import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './index.less'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { throttle } from 'lodash-es'

type SceneType = THREE.Scene | null
type CameraType = THREE.PerspectiveCamera | null
type RendererType = THREE.WebGLRenderer | null
type RaycasterType = THREE.Raycaster | null
type ProjectiveObjType = THREE.Object3D | null
type MouseType = THREE.Vector2 | null
type RenderRaycasterObjReq = {
  raycaster: RaycasterType;
  scene: SceneType;
  camera: CameraType;
  mouse: MouseType;
}

const Home: React.FC = () => {

  const [scene, setScene] = useState<SceneType>(null)
  const [camera, setCamera] = useState<CameraType>(null)
  const [renderer, setRenderer] = useState<RendererType>(null)
  const [raycaster, setRaycaster] = useState<RaycasterType>(null)
  const [projectiveObj, setProjectiveObj] = useState<ProjectiveObjType>(null)
  const threeRef = useRef(null)
  let mouse: MouseType = new THREE.Vector2

  const init = () => {
    setScene(new THREE.Scene())
    setCamera(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
    setRenderer(new THREE.WebGLRenderer({
      antialias: true
    }))
    setRaycaster(new THREE.Raycaster())
  }

  const initThree = () => {
    if (!camera || !renderer || !scene) return
    renderer.shadowMap.enabled = true
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (!threeRef?.current) return
    (threeRef.current as any).appendChild(renderer.domElement)
    camera.position.set(0, 35, 0)
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

  /**
   * 根据光投射器判断鼠标所在向量方向是否穿过物体
   * @param {*} raycaster 光投射器
   * @param {*} scene     场景
   * @param {*} camera    相机
   * @param {*} mouse     鼠标位置对应的二维向量
   */
  function renderRaycasterObj({ raycaster, scene, camera, mouse }: RenderRaycasterObjReq) {
    if (!raycaster || !scene || !camera || !mouse) return
    raycaster.setFromCamera(mouse, camera)
    let intersects = raycaster.intersectObjects(scene.children)
    if (intersects.length > 0) {
      let currentProjectiveObjT = intersects[0].object
      if (projectiveObj != currentProjectiveObjT) {
        if ((currentProjectiveObjT instanceof THREE.AxesHelper) || (currentProjectiveObjT instanceof THREE.GridHelper)) {
          return
        }
        setProjectiveObj(intersects[0].object)
      }
    } else {
      setProjectiveObj(null)
    }
  }

  const animate = () => {
    if (!camera || !renderer || !scene) return
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  window.onmousemove = throttle((event) => {
    if (!raycaster || !scene || !camera || !mouse) return
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    renderRaycasterObj({ raycaster, scene, camera, mouse })
  }, 60)

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
    initThree()
    initLight()
    initModel()
  }, [renderer, scene, camera])

  useEffect(() => {
    animate()
  })

  useEffect(() => {
    switch (projectiveObj?.name) {
      case 'polySurface26':
        console.log('台灯')
        console.log(projectiveObj)
        break
      case 'pSphere1':
        console.log('鼠标')
        console.log(projectiveObj)
        break
      case 'polySurface12':
        console.log('书本')
        console.log(projectiveObj)
        break
      case 'polySurface9':
        console.log('电脑')
        console.log(projectiveObj)
        break
      case 'anjian1':
        console.log('键盘')
        console.log(projectiveObj)
        break
      default:
    }
  }, [projectiveObj])

  return (
    <>
      <div className='three' ref={threeRef} />
    </>
  )
}

export default Home