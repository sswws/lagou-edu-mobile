<template>
  <div class="course-content-list">
    <!-- 下拉刷新列表 -->
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh">
      <!-- 列表组件 -->
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        @click="$router.push({
          name: 'course-info',
          params: {
            courseId: item.id
          }
        })"
      >
      <!-- 课程左边图片 -->
      <div>
        <!-- 所有课程与已购课程的图片数据属性名不同，检测后使用 -->
        <img :src="item.courseImgUrl || item.image" alt="">
      </div>
      <!--课程右侧信息 -->
      <div class="course-info">
        <!-- 名称检测 -->
        <h3 v-text="item.courseName || item.name"></h3>
        <p class="course-preview" v-html="item.previewFirstField"></p>
        <!-- 如果已购课程，无需显示价格区域-->
        <p
          v-if="item.price"
          class="price-container"
        >
          <span class="course-discounts">¥{{ item.discounts }}</span>
          <s class="course-price">¥{{ item.price }}</s>
        </p>
      </div>
     </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { getQueryCourses } from '@/services/course'
export default ({
  name: 'CourseContentList',
  props: {
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 用于存储数据
      list: [],
      // 是否处于加载中
      loading: false,
      // 是否加载完毕
      finished: false,
      // 数据页数
      currentPage: 1,
      // 下拉刷新状态
      isRefreshing: false
    }
  },
  methods: {
    async onRefresh () {
      // 还原数据页数为 1
      this.currentPage = 1
      // 重新请求数据
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 下拉刷新，需要清除所有数据，直接赋值给 this.list
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      // 提示
      this.$toast('刷新成功')
      // 关闭下拉提示框
      this.isRefreshing = false
    },
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        // 代表上架课程
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      // 下次请求下一页
      this.currentPage++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    }
  }
})
</script>

<style lang="scss" scoped>
// 列表组件的固定滚动设置
.course-content-list {
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
// 课程列表项目的样式
.van-cell__value {
  display: flex;
  height: 100px;
  padding: 10px 0;
}
.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}
.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.course-info .course-preview {
  flex-grow: 1;
}
.course-info .course-discounts {
  color: #ff7452;
  margin-right: 10px;
}
.p, h3 {
  margin: 0;
}
</style>
