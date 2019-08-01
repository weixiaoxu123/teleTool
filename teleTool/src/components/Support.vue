<template>
 <div>
   <br>
   <div class="input-group mb-3">
        <input type="text" id="Helperip" :value="helpIp" class="form-control" disabled="true" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
        <div class="input-group-append">
            <button class="btn btn-primary" @click="linkView()">准备链接</button>
            <!--<button class="btn btn-primary" @click="closeView()">关闭链接</button>-->
        </div>
    </div>
    <div class="card bg-light mb-3" style="max-width: 570px;">
        <div class="card-header">操作说明</div>
        <div class="card-body">
            <p class="card-text">1.将链接码发给求助者，开启vncServer，等待连接；</p>
            <p class="card-text">2.如果失败，请使用备用模式</p>
            <p class="card-text">3.在备用模式中链接被协助者</p>
        </div>
      </div>
   <transition name='fade'>
      <div v-if="showSupport">
        <hr>
        <label id="beiyong" style="font-size: 24px;  fill:blue; ">支撑模式备用链接</label>
        <div class="input-group mb-3">
            <input type="text" id="Assistantip" placeholder="输入被协助者链接码 " style="width:260px;" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
            <div class="input-group-append">
                 <button class="btn btn-primary" @click="linkViewBeiyong()">准备链接</button>
            </div>
           </div>
        </div>
    </transition>

    <div id='runned' v-if="showRunned">
        <br>
        connecting....
        <br>
        <button class="btn btn-danger" @click="stopView">断开链接</button>
        <button class="btn btn-warning" @click="qiuzhu" >备用模式</button>
    </div>
     <!-- 看下是否-->
    <div id='runned' v-if="showBeiyongRunned">
        <br>
        connecting....
        <br>
        <button class="btn btn-danger" @click="stopViewBeiyong">断开链接</button>
        <button class="btn btn-warning" @click="qiuzhu" >备用模式</button>
    </div>

    <br>
    <div class='buttonBack'>
   <router-link id='back' class='btn btn-primary' to='/'>Back</router-link>
   </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Support',
  data () {
    return {
      showBeiyongRunned: false,
      showSupport: false,
      msg: '支撑人员模式',
      helpIp: '',
      showRunned: false
    }
  },
  methods: {
    linkView () {
      this.showRunned = true
      let data = {
        'ip': this.helpIp
      }
      window.moveTo(0, 0)
      window.resizeTo(230, 145)
      axios.post('/api/linkView', qs.stringify(data))
        .then((res) => {
          console.log(res.data)
        }, (err) => {
          console.log(err)
        }
        )
    },
    stopView () {
      this.showRunned = false
      let data = {
        'ip': this.helpIp
      }
      window.moveTo(100, 50)
      window.resizeTo(816, 616)
      axios.post('/api/stopView', qs.stringify(data))
        .then((res) => {
          console.log(res.data)
        }, (err) => {
          console.log(err)
        }
        )
    },
    linkViewBeiyong () {
      this.showBeiyongRunned = true
      let data = {
        'ip': this.helpIp
      }
      window.moveTo(0, 0)
      window.resizeTo(230, 145)
      axios.post('/api/linkViewBeiyong', qs.stringify(data))
        .then((res) => {
          console.log(res.data)
        }, (err) => {
          console.log(err)
        }
        )
    },
    stopViewBeiyong () {
      this.showBeiyongRunned = false
      let data = {
        'ip': this.helpIp
      }
      window.moveTo(100, 50)
      window.resizeTo(816, 616)
      axios.post('/api/stopViewBeiyong', qs.stringify(data))
        .then((res) => {
          console.log(res.data)
        }, (err) => {
          console.log(err)
        }
        )
    },
    qiuzhu () {
      this.showRunned ? this.stopView() : this.stopViewBeiyong()
      this.showRunned = false
      this.showSupport = true
      this.showBeiyongRunned = false
    }
  },
  mounted () {
    window.moveTo(100, 50)
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
    margin-top:20px;
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
