<template>
  <div class='home'>
    <div ref='threeRef' class='three-wrapper'></div>
  </div>
</template>

<script>
import * as THREE from 'three'

// const { FBXLoader } = import('three/examples/jsm/loaders/FBXLoader')
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export default {
  name: 'IndexPage',
  mounted() {
    this.scene = null
    this.renderer = null
    this.camera = null

    this.fbxModel = null

    this.threeInit()
    this.threeInitFbx()
    this.threeAnimate()
  },
  methods: {
    threeInit() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.camera.position.z = 5
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      const light = new THREE.AmbientLight(0x404040)
      this.scene.add(light)

      this.$refs.threeRef.appendChild(this.renderer.domElement)
    },
    threeInitFbx() {
      console.log(FBXLoader)
      console.log(1)

      // const fbxLoader = new FBXLoader()
      // fbxLoader.load('../static/fgx-model/ZZ01.fbx', (fbx) => {
      //   console.log(fbx)
      // })
    },
    threeAnimate() {
      requestAnimationFrame(this.threeAnimate)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped>
.three-wrapper {
  width: 100vw;
  height: 100vh;
}

canvas {
  width: 100%;
  height: 100%
}
</style>
