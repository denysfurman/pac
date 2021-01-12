<template>
  <div id="app">
    <Header/>
    <MainPage/>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'
import Header from './components/blocks/Header'

export default {
  name: 'App',
  components: {
    MainPage,
    Header,
  }
}
</script>
