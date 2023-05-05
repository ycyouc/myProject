<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="Spu名称">
        <el-input placeholder="Spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in trademarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="Spu描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handleSucess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="(unSelect, index) in unSelectSaleAttr"
            :key="unSelect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 展示当前spu属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名"
            prop="saleAttrName"
            width="width"
          ></el-table-column>
          <el-table-column label="属性值名称列表" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <!--  @keyup.enter.native="handleInputConfirm"
                 @click="showInput"-->
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index,1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "", //描述
        id: 0,
        tmId: '', //品牌id
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ], //spu图片信息
        spuName: "",
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ], //平台属性与属性值
      }, //spu信息
      trademarkList: [], //品牌信息
      spuImageList: [], //spu图片数据
      saleList: [], //销售属性
      attrIdAndAttrName: "", //收集未选择的销售属性id和name
    };
  },
  methods: {
    //照片墙图片移出
    handleRemove(file, fileList) {
      this.spuImageList = fileList;
    },
    //照片墙图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //照片墙图片上传成功回调
    handleSucess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    //初始化spuForm数据
    async initSpuData(spu) {
      //获取spu信息数据
      let spuRes = await this.$API.spu.reqSpu(spu.id);
      if (spuRes.code == 200) {
        this.spu = spuRes.data;
      }
      //获取品牌信息
      let trademarkRes = await this.$API.spu.reqTrademarkList();
      if (trademarkRes.code == 200) {
        this.trademarkList = trademarkRes.data;
      }
      //获取spu图片数据
      let spuImageRes = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageRes.code == 200) {
        let listArr = spuImageRes.data;
        //照片墙数组需要name和url字段
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      }
      //获取平台全部销售属性
      let saleRes = await this.$API.spu.reqBaseSaleAttrList();
      if (saleRes.code == 200) {
        this.saleList = saleRes.data;
      }
    },
    //添加新的销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    //属性值添加按钮
    addSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    //el-input失去焦点事件
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      let isRepeat = row.spuSaleAttrValueList.some(item=> item.saleAttrName == inputValue);
      if (isRepeat){
        this.$message('属性值不能重复')
        return
      }

      let newSaleAttrValue = { baseSaleAttrId, saleAttrName: inputValue };
      row.inputVisible = false;
      row.spuSaleAttrValueList.push(newSaleAttrValue);
    },
    //保存按钮的回调
    async addOrUpdateSpu(){
      //整理参数
      this.spu.spuImageList = this.spuImageList.map(item=>{
        return {
          imgName:item.name,
          imgUrl:(item.response && item.response.data) || item.url
        }
      })
      let res = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if(res.code==200){
        this.$message({type:'success',message:'保存成功'})
        this.$emit('changeScene', {scene:0,flag:this.spu.id?'修改':'添加'})
      }
      //清除数据
      Object.assign(this._data, this.$options.data())
    },
    //点击添加SPU按钮的回调
    async addSpuData(category3Id){
      this.spu.category3Id = category3Id
      //获取品牌信息
      let trademarkRes = await this.$API.spu.reqTrademarkList();
      if (trademarkRes.code == 200) {
        this.trademarkList = trademarkRes.data;
      }
      //获取平台全部销售属性
      let saleRes = await this.$API.spu.reqBaseSaleAttrList();
      if (saleRes.code == 200) {
        this.saleList = saleRes.data;
      }
    },
    //取消按钮
    cancel(){
      this.$emit('changeScene', {scene:0,flag:''})
      Object.assign(this._data, this.$options.data())
    }

  },
  computed: {
    //计算还未选择的销售属性
    unSelectSaleAttr() {
      let result = this.saleList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>