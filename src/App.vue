<template>
  <!-- 根路由出口 -->
  <router-view/>
</template>

<script>
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/front/ad/getAdList'
})
export default ({
})
</script>

<style lang="scss"></style>
