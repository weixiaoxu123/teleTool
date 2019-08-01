<template>
  <div id="app">
    <header><h4>电信远程协助工具</h4></header>
    <div class='container' style="width:600px">
      <div v-if="pass">
        <router-view></router-view>
      </div>
      <div v-else>
        <h5>对不起，你的IP地址不对，不能为你提供服务</h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      IPv4: null,
      pass: true
    }
  },
  methods: {
    showIp: function () {
      axios.get('/api/getIp').then((res) => {
        window.localStorage.setItem('IPv4', res.data.address)
        this.pass = res.data.pass
        this.IPv4 = res.data.address
      })
    }
  },
  mounted () {
    window.moveTo(100, 50)
    window.resizeTo(816, 616)
    this.showIp()
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
h4 {
  margin-bottom: 60px;
}
</style>
