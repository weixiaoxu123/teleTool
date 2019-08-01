<template>
    <div>
        <br>
          <div class="input-group mb-3">
          <input type="text" id="Helperip" v-model="linkIp" class="form-control" placeholder="输入从支撑人员处获取的链接码" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button id='connect' class="btn btn-primary" type="button" @click="connectSuppot()" :disabled='disableButton'>准备链接</button>
            </div>
          </div>
        <div class="card bg-light mb-3" style="max-width: 570px;">
          <div class="card-header">操作说明</div>
            <div class="card-body">
                <!--<h5 class="card-title">Light card title</h5>-->
                <p class="card-text">1.输入从支撑人员处获取的链接码,点击链接,与支撑人员链接</p>
                <p class="card-text">2.如果连接失败,请使用备用模式,并告知协助者</p>
                <p class="card-text">3.在备用模式中点击链接,等待协助者链接</p>
            </div>
          </div>
        <div id='runned' v-if="showRunned">
          <br>
          connecting....
          <br>
          <button class="btn btn-danger" @click="stopLinkServer">断开链接</button>
          <button class="btn btn-warning" @click="qiuzhu" >备用模式</button>
        </div>

        <div id='runned' v-if="showBeiyongRunned">
          <br>
          connecting....
          <br>
          <button class="btn btn-danger" @click="stopBeiyong">断开链接</button>
          <button class="btn btn-warning" @click="qiuzhu" >备用模式</button>
        </div>

        <transition name='fade'>
            <div v-if="showbeiyong">
              <hr>
              <label id="beiyong" style="font-size: 24px;  fill:blue; ">营业员模式备用链接</label>
              <br>
              <div class="input-group mb-3">
                <input type="text" :value="helpIp" class="form-control" aria-label="Recipient's username" disabled="true" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button" @click="linkBeiyong">准备连接</button>
                </div>
              </div>
            </div>
        </transition>
        <div class='buttonBack'>
        <router-link id='back' class='btn btn-primary' to='/'>Back</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Salesman',
  data () {
    return {
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
    this.helpIp = window.localStorage.getItem('IPv4')
  },
  destroyed () {
    console.log('关闭所有vnc')
  // 在离开的时候判断 是否需要stop。。
  },
  methods: {
  // 被协助者模式中的 链接 server
    connectSuppot: function (e) {
      let data = {
        'ip': this.linkIp
      }
      window.moveTo(0, 0)
      window.resizeTo(230, 145)
      this.showRunned = true
      axios.post('/api/callForHelp', qs.stringify(data))
        .then((res) => {
          console.log(res.data)
        }
        )
    },
    // 被协助者模式中的 断开server
    stopLinkServer: function () {
      let data = {
        'ip': this.linkIp
      }
      window.moveTo(100, 50)
      window.resizeTo(816, 616)
      this.showRunned = false
      axios.post('/api/stopLinkServer', qs.stringify(data))
        .then((res) => {
          console.log(res.data)
        }
        )
    },
    // 备用模式
    qiuzhu () {
      this.showRunned ? this.stopLinkServer() : this.stopBeiyong()
      this.showRunned = false
      this.showbeiyong = true
      this.showBeiyongRunned = false
    },
    // 备用模式中的run
    linkBeiyong () {
      this.showBeiyongRunned = true
      let data = {
        'ip': this.linkIp
      }
      window.moveTo(0, 0)
      window.resizeTo(230, 145)
      this.showRunned = false
      axios.post('/api/linkBeiyong', qs.stringify(data))
        .then((res) => {
          console.log(res.data)
        }
        )
      console.log('linkbeiyong')
    },
    // 备用模式中的stop
    stopBeiyong () {
      let data = {
        'ip': this.linkIp
      }
      window.moveTo(100, 50)
      window.resizeTo(816, 616)
      this.showBeiyongRunned = false
      axios.post('/api/stopBeiyong', qs.stringify(data))
        .then((res) => {
          console.log(res.data)
        }
        )
      console.log('stopbeiyong')
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
#beiyong {
    margin-top:20px;
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
