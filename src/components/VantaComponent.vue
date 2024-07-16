<template>
    <div id="vanta-bg"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  import WAVES from 'vanta/dist/vanta.waves.min';
  
  export default {
    name: 'VantaComponent',
    mounted() {
      this.vantaEffect = WAVES({
        el: "#vanta-bg",
        THREE: THREE,
        color: 0x1b1e34,
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 0.5,
        zoom: 1,
      });
    },
    beforeUnmount() { // 使用 beforeUnmount 替换 beforeDestroy
      if (this.vantaEffect) this.vantaEffect.destroy();
    }
  }
  </script>
  
  <style scoped>
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  #vanta-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, #ccd6df, #e2eaf0); /* 更加素雅的渐变色 */
    background-size: 400% 400%;
    animation: gradientAnimation 20s ease infinite; /* 放慢动画速度 */
    z-index: -1;
  }
  </style>
  