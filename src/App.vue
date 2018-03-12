<template>
  <div id="app">
    <Header class="top"></Header>
    <transition name="tranApp">
      <keep-alive>
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
    <Footer class="bottom"></Footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss">
  #app{
    width:100%;
    height:100%;
    background:#fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .top{
      order: 1;
      flex: 0 0 2.3rem;
    }
    .view{
      width:100%;
      flex: 1 1 auto;
      order: 2;
    }
    .bottom{
      order: 3;
      flex: 0 0 2.3rem;
    }
  }

  .tranApp-enter-active, .tranApp-leave-active {
    transform: translate(-100%, 0, 0);
  }
  .tranApp-enter, .tranApp-leave-to {
    transform: translate(0, 0, 0);
  }
</style>
