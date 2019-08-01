<template>
<div>
  <h5>请选择您的角色：被协助者 or 协助者 </h5>
  <router-link id='salesman' to='/salesman' class="btn btn-primary">被协助者模式</router-link>
  <br>
  <router-link id='support' to='/support' class="btn btn-primary">协助者模式</router-link>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#salesman {
  margin-top:10px;
  width:250px;
  margin-bottom:10px;
}
#support {
  margin-top:10px;
  width:250px;
}
</style>
