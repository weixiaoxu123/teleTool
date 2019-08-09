<template>
    <div>
        <div class="chushimoshi" v-if="showChuShi">
          <label id="beiyong" style="font-size: 24px;  fill:blue; ">正常模式链接</label>
          <div class="input-group mb-3">
          <input type="text" id="Helperip" v-model="linkIp" class="form-control" placeholder="输入从支撑人员处获取的链接码" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button id='connect' class="btn btn-primary" type="button" @click="connectSuppot()" :disabled='disableButton'>准备链接</button>
            </div>
          </div>
        <div class="card bg-light mb-3" style="max-width: 570px;">
          <div class="card-header">操作步骤</div>
            <div class="card-body">
                <p class="card-text">1.输入从支撑人员处获取的链接码，与支撑人员链接；</p>
                <p class="card-text">2.如果连接失败，请使用备用模式。</p>
            </div>
          </div>
          <div class='buttonBack'>
           <router-link id='back' class='btn btn-primary' to='/'>返回</router-link>
          </div>
        </div>
        <div id='runned' v-if="showRunned">
          <br>
          正常模式连接中
          <br>
          <button class="btn btn-danger" @click="stopLinkServer">断开链接</button>
          <button class="btn btn-warning" @click="qiuzhu" >备用模式</button>
        </div>

        <div id='runned' v-if="showBeiyongRunned">
          <br>
          备用模式连接中
          <br>
          <button class="btn btn-danger" @click="stopBeiyong">断开链接</button>
        </div>

      <transition name='fade'>
            <div v-if="showbeiyong">
                <label id="beiyong" style="font-size: 24px;  fill:blue; ">备用模式链接</label>
                <br>
                <div class="input-group mb-3">
                  <input id='beiyongInput' :value="helpIp" class="form-control" aria-label="Recipient's username" disabled="true" aria-describedby="basic-addon2">
                  <div class="input-group-append">
                    <button class="btn btn-primary" @click="fuzhi">复制链接码</button>
                    <button class="btn btn-primary" @click="linkBeiyong">准备连接</button>
                  </div>
                </div>
                <div class="card bg-light mb-3" style="max-width: 570px;">
                  <div class="card-header">操作步骤</div>
                    <div class="card-body">
                        <p class="card-text">1.将链接码复制发送给对方准备链接；</p>
                        <p class="card-text">2.准备链接，等待对方链接。</p>
                    </div>
                </div>
                <div class='buttonBack'>
                  <button @click="beiyongBack" class='btn btn-primary'>返回正常模式</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { StartVNCServer, StopVNCServer, StartVNCServer2 } from '@/utils/helper'
export default {
  name: 'Salesman',
  data () {
    return {
      showChuShi: true,
      showBeiyongRunned: false,
      showbeiyong: false,
      msg: '被协助者模式',
      disableButton: true,
      linkIp: '',
      showRunned: false,
      helpIp: ''
    }
  },
  watch: {
    linkIp (val) {
      if (val !== '') {
        this.disableButton = false
      } else {
        this.disableButton = true
      }
    }
  },
  mounted () {
    window.resizeTo(816, 616)
    this.helpIp = window.localStorage.getItem('IPv4')
  },
  destroyed () {
    console.log('关闭所有vnc')
  },
  methods: {
    connectSuppot: function (e) {
      window.moveTo(0, 0)
      window.resizeTo(230, 145)
      this.showChuShi = false
      this.showRunned = true
      StartVNCServer(this.linkIp)
    },
    stopLinkServer: function () {
      window.resizeTo(816, 616)
      this.showChuShi = true
      this.showRunned = false
      StopVNCServer()
    },
    qiuzhu () {
      this.stopLinkServer()
      this.showChuShi = false
      this.showRunned = false
      this.showbeiyong = true
      this.showBeiyongRunned = false
    },
    linkBeiyong () {
      this.showbeiyong = false
      this.showBeiyongRunned = true
      window.moveTo(0, 0)
      window.resizeTo(230, 145)
      this.showRunned = false
      StartVNCServer2()
    },
    stopBeiyong () {
      this.showbeiyong = true
      window.resizeTo(816, 616)
      this.showBeiyongRunned = false
      StopVNCServer()
    },
    beiyongBack () {
      this.showbeiyong = false
      this.showChuShi = true
    },
    fuzhi () {
      var inp = document.getElementById('beiyongInput')
      inp.disabled = false
      inp.select()
      document.execCommand('Copy')
      inp.disabled = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttonBack {
    text-align: right;
}
#back {
    margin-top:50px;
    position: relative;
    bottom:50px;
}
#ButtonShopAssistantMode2 {
    width:305px;
    margin-top:10px;
}
.card {
    text-align: left;
}
#runned {
    text-align: center;
    position: fixed;
    top: 20px;
    left: 10px;
}
</style>
