<template>
  <div id="app">
    <header>
      <router-view name="header" />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <router-view name="footer" />
    </footer>
  </div>
</template>

<script>
// import CommonNavBar from '@/components/common-navigation-bar'
// import TabBar from '@/components/tab-bar'

export default {
  name: 'App',
  components: {
    // CommonNavBar,
    // TabBar
  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
    display: flex;
    flex-direction: column;

    main {
      flex: 1;
      overflow-x: hidden;
    }
  }
</style>
