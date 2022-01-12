<template>
  <div class="course-header">
    <van-image :src="require('@/assets/logo.png')"></van-image>
  </div>
</template>

<script>
import { Image } from 'vant'
export default ({
  name: 'CourseHeader',
  components: {
    VanImage: Image
  }
})
</script>

<style lang="scss" scoped>
.course-header {
  height: 50px;
}
.van-image {
  width: 180px;
  margin-left: -20px;
}
</style>
