<template>
 <div>
    <div class="showzhengchang" v-if="showzhengchang">

      <label id="beiyong" style="font-size: 24px;  fill:blue; ">正常模式链接</label>
      <div class="input-group mb-3">
          <input id="Helperip" :value="helpIp" class="form-control" disabled="true" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
          <div class="input-group-append">
              <button class="btn btn-primary" @click="fuzhi">复制链接码</button>
              <button class="btn btn-primary" @click="linkView()">准备链接</button>
          </div>
      </div>

      <div class="card bg-light mb-3" style="max-width: 570px;">
          <div class="card-header">操作步骤</div>
          <div class="card-body">
              <p class="card-text">1.将链接码发给求助者，等待连接；</p>
              <p class="card-text">2.如果失败，请使用备用模式。</p>
          </div>
      </div>

      <div class='buttonBack'>
        <router-link id='back' class='btn btn-primary' to='/'>返回</router-link>
      </div>
    </div>

    <transition name='fade'>
        <div v-if="showBeiyongSupport">
          <label id="beiyong" style="font-size: 24px;  fill:blue; ">备用模式链接</label>
          <div class="input-group mb-3">
              <input type="text" id="Assistantip" v-model="beiyongIp" placeholder="输入被协助者链接码" style="width:260px;" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
              <div class="input-group-append">
                  <button class="btn btn-primary"  @click="linkViewBeiyong()" :disabled="disableButton">准备链接</button>
              </div>
          </div>
          <div class="card bg-light mb-3" style="max-width: 570px;">
              <div class="card-header">操作说明</div>
              <div class="card-body">
                  <p class="card-text">1.输入被协助者的链接码；</p>
                  <p class="card-text">2.准备链接</p>
              </div>
          </div>
          <div class='buttonBack'>
            <button class='btn btn-primary' @click="beiyongBack ">返回正常模式</button>
          </div>
          </div>
      </transition>

    <div id='runned' v-if="showRunned">
        <br>
        正常模式连接中
        <br>
        <button class="btn btn-danger" @click="stopView">断开链接</button>
        <button class="btn btn-warning" @click="qiuzhu" >备用模式</button>
    </div>
    <div id='runned' v-if="showBeiyongRunned">
        <br>
        备用模式连接中
        <br>
        <button class="btn btn-danger" @click="stopViewBeiyong">断开链接</button>
    </div>
    <br>
  </div>
</template>

<script>
import { StartVNCViewer, StopVNCViewer, Helping } from '@/utils/helper'
export default {
  name: 'Support',
  data () {
    return {
      showzhengchang: true,
      showBeiyongRunned: false,
      showBeiyongSupport: false,
      disableButton: true,
      msg: '支撑人员模式',
      helpIp: '',
      beiyongIp: '',
      showRunned: false
    }
  },
  watch: {
    beiyongIp (val) {
      if (val !== '') {
        this.disableButton = false
      } else {
        this.disableButton = true
      }
    }
  },
  methods: {
    linkView () {
      this.showzhengchang = false
      this.showRunned = true
      window.moveTo(0, 0)
      window.resizeTo(230, 145)
      StartVNCViewer()
    },
    stopView () {
      this.showzhengchang = true
      this.showRunned = false
      window.resizeTo(816, 616)
      StopVNCViewer()
    },
    linkViewBeiyong () {
      this.showBeiyongRunned = true
      window.moveTo(0, 0)
      window.resizeTo(230, 145)
      Helping(this.beiyongIp)
    },
    stopViewBeiyong () {
      this.showBeiyongRunned = false
      window.resizeTo(816, 616)
      StopVNCViewer()
    },
    qiuzhu () {
      this.stopView()
      this.showzhengchang = false
      this.showRunned = false
      this.showBeiyongSupport = true
      this.showBeiyongRunned = false
    },
    fuzhi () {
      var inp = document.getElementById('Helperip')
      inp.disabled = false
      inp.select()
      document.execCommand('Copy')
      inp.disabled = true
    },
    beiyongBack () {
      this.showBeiyongSupport = false
      this.showzhengchang = true
    }
  },
  mounted () {
    window.resizeTo(816, 616)
    this.helpIp = window.localStorage.getItem('IPv4')
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
