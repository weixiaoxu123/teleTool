<template>
  <div id="app">
    <header><h4>电信远程协助工具</h4>
    </header>
    <div class='container' style="width:600px">
      <div v-if="pass">
      <hr>
      <h6>欢迎你！{{staff_code}} {{name}}</h6>
      <hr>
        <router-view/>
      </div>
      <div v-else>
        <h5>对不起，你的IP地址不对，不能为你提供服务</h5>
      </div>
    </div>
  </div>
</template>

<script>
import {getIp} from './utils/helper'
import process from 'process'
export default {
  name: 'App',
  data () {
    return {
      staff_code: '',
      name: '',
      IPv4: null,
      pass: true,
      dataInfo: false
    }
  },
  methods: {
    showIp: function () {
      var ip = getIp()
      if (ip === 'noIp') {
        this.pass = false
      } else {
        window.localStorage.setItem('IPv4', ip)
        this.pass = true
      }
    }
  },
  mounted () {
    window.resizeTo(816, 616)
    this.showIp()
  },
  created () {
    try {
      let param = JSON.parse(/{.*}/.exec(process.env.param)[0])
      this.staff_code = param.staff_code
      this.name = param.name
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  margin-top: 20px;
  overflow: hidden;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
h5 {
  color:red;
}
header {
  margin-bottom: 60px; 
}
</style>
