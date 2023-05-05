<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动组件 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <!-- 展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table border :data="records">
          <el-table-column
            label="序号"
            width="80"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="Spu名称"
            width="width"
            prop="spuName"
          ></el-table-column>
          <el-table-column
            label="Spu描述"
            width="width"
            prop="description"
          ></el-table-column>
          <el-table-column label="操作" width="width" prop="prop">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>
              <template>
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @onConfirm="deleteSpu(row)"
                >
                  <hint-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    title="删除sku"
                    slot="reference"
                  ></hint-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total "
          style="text-align: center"
          @current-change="handlerCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku" @changeScenes="changeScenes"></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku商品列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" border style="width: 100%;" v-loading="loading">
        <el-table-column property="skuName" label="名称" width="width"></el-table-column>
        <el-table-column property="price" label="价格" width="width"></el-table-column>
        <el-table-column property="weight" label="重量" width="width"></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
import { done } from 'nprogress';
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      records: [], //spu列表数据
      total: 0,
      scene: 0, //0 spu列表 1 添加|修改spu  2添加sku
      dialogTableVisible: false,
      spu:{},
      skuList:[],
      loading:true
    };
  },
  methods: {
    //自定义事件，把子组件相应id传给父组件
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        //清除2、3的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        //清除3的id
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //获取SPU列表数据
        this.getSpuList();
      }
    },
    //获取Spu列表数据的方法
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let res = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      }
    },
    //点击分页器页码的回调
    handlerCurrentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    //分页器每页展示数据条数变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.page = 1;
      this.getSpuList();
    },
    //添加spu按钮的回调
    addSpu() {
      this.scene = 1;
      //通知子组件发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改某一个spu
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    //spuForm自定义事件
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "修改") {
        this.handlerCurrentChange(this.page);
      } else {
        this.handlerCurrentChange(1);
      }
    },
    //删除spu按钮回调
    async deleteSpu(row) {
      let res = await this.$API.spu.reqDeleteSpu(row.id);
      if (res.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.handlerCurrentChange(
          this.records.length > 1 ? this.page : this.page - 1
        );
      }
    },
    //添加sku按钮的回调
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id,this.category2Id,row)
    },
    //skuForm通知父组件修改场景
    changeScenes(scene){
      this.scene = scene
    },
    //查看sku按钮的回调
    async handler(spu){
      this.dialogTableVisible = true
      this.spu = spu
      let result = await this.$API.spu.reqSkuList(spu.id)
      if(result.code == 200) {
        this.skuList = result.data
        this.loading = false
      }
    },
    //关闭对话框的回调
    close(done){
      this.loading = true
      this.skuList = []
      done()
    }
  },
};
</script>
<style scoped>
</style>