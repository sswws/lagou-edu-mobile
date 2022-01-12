<template>
  <div class="learn">
    <!-- 顶部功能 -->
    <van-nav-bar title="已购课程" />
    <!-- 课程列表 -->
    <course-content-list
      :fetchData="fetchData"
    ></course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import LayoutFooter from '@/components/LayoutFooter'
import CourseContentList from '@/components/CourseContentList'
import { getPurchaseCourse } from '@/services/course'
export default ({
  name: 'Learn',
  components: {
    LayoutFooter,
    CourseContentList,
    VanNavBar: NavBar
  },
  data () {
    return {
      // 课程信息
      courseList: []
    }
  },
  methods: {
    fetchData () {
      return getPurchaseCourse()
    }
  }
})
</script>

<style lang="scss" scoped>
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>
