<template>
  <div class="pagination">
    <!-- 上一页、1 -->
    <button :disabled="pageNo == 1" @click="sendPageNo(pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="sendPageNo(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间 -->
    <button
      v-for="(page, index) in activeNum"
      :key="index"
      @click="sendPageNo(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下一页，最后一页 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="sendPageNo(totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="sendPageNo(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  

  <script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续的页码起始与结束数字
    startNumAndEndNum() {
      let { pageNo, totalPage, total, continues } = this;
      let start = 0,
        end = 0;
      //总页数小于连续页数
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //start为负数和0
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //end超出totalPage
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
    activeNum() {
      let realPages = [];
      for (
        let i = this.startNumAndEndNum.start;
        i <= this.startNumAndEndNum.end;
        i++
      ) {
        realPages.push(i);
      }
      return realPages;
    },
  },
  methods: {
    sendPageNo(value) {
      this.$emit("getPageNo", value);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
