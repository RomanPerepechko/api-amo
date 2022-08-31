<template>
  <n-dialog-provider>
    <main-page></main-page>
  </n-dialog-provider>
</template>

<script>
import MainPage from '@/pages/main-page.vue';
export default {

  components: {
    MainPage
  }

}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
</style>
