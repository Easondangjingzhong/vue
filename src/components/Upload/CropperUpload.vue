<template>
  <div id="create-ant-upload-preview">
    <div class="ant-upload-preview">
      <div class="avatatImg">
        <a-upload
          name="avatar"
          listType="picture-card"
          :showUploadList="false"
          :beforeUpload="beforeUpload"
          :customRequest="function () {}"
          @change="handleChange"
          :accept="accept"
        >
          <img
            class="upload_img"
            v-if="imageUrl"
            :src="imageUrl"
            alt="avatar"
          />
          <div v-else>
            <!-- <PlusOutlined />
            <a-icon :type="loading ? 'loading' : 'plus'" /> -->
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
        <div class="text">
          <div>{{ avatarText }}</div>
        </div>
      </div>
      <!-- 引入裁剪组件 -->
      <CropperModal
        ref="CropperModal"
        :imgType="imgType"
        :fileName="fileName"
        :cropperMode="cropperMode"
        @cropper-no="handleCropperClose"
        @cropper-ok="handleCropperSuccess"
      />
    </div>
  </div>
</template>
 
<script>
import CropperModal from "./CropperModal.vue";
export default {
  components: { CropperModal },
  props: {
    //图片裁切配置
    options: {
      type: Object,
      default: function () {
        return {
          autoCrop: true, //是否默认生成截图框
          autoCropWidth: 1029, //默认生成截图框宽度
          autoCropHeight: 480, //默认生成截图框高度
          fixedBox: true, //是否固定截图框大小 不允许改变
          previewsCircle: false, //预览图是否是原圆形
          title: "修改图片",
        };
      },
    },
    avatarText: {
      type: String,
      default:
        "支持jpg, png格式的图片, 建议最小尺寸480x270，大小不能超过2M",
    },
    // 上传图片的大小，单位M
    imgSize: {
      type: Number,
      default: 2 * 1024 * 1024,
    },
    //图片存储在oss上的上级目录名
    imgType: {
      type: String,
      default: "",
    },
    // 图片地址
    imageUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isError: false,
      accept: "image/png,image/jpg,image/jpeg",
      fileName: "", // 文件名
      loading: false,
      isStopRun: false,
      cropperMode: "contain", // 图片渲染方式
    };
  },
  methods: {
    //从本地选择文件
    handleChange(info) {
      if (this.isError || this.isStopRun) {
        return;
      }
      this.loading = info.file.status;
      this.fileName = info.file.name;
      this.getBase64(info.file.originFileObj, (imageUrl) => {
        const target = Object.assign({}, this.options, {
          img: imageUrl,
        });
        this.$refs.CropperModal.edit(target);
      });
    },
    // 上传之前 格式与大小校验
    beforeUpload(file) {
      // this.$emit("avatarLoadingFn", true);
      this.isError = false;
      this.isStopRun = false;
      const imgTypeArr = ["image/jpeg", "image/png", "image/jpg"];
      const isJpgOrPng = imgTypeArr.includes(file.type);
      if (!isJpgOrPng) {
        this.isError = true;
        this.$message.error("不能上传其他类型的图片");
        return;
      }
 
      const isSizeLegal = file.size <= this.imgSize;
      if (!isSizeLegal) {
        this.$message.error("图片大小超过限制");
        this.isStopRun = true;
        this.isError = true;
        return;
      }
 
      // 获取上传图片尺寸
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        var img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // 1、先根据图片裁剪的尺寸
          if (this.options.autoCropWidth > this.options.autoCropHeight) {
            // 2、再根据上传图片尺寸
            this.cropperMode = this.options.autoCropWidth + "px auto";
          } else {
            if (img.width >= img.height) {
              this.cropperMode = "auto " + this.options.autoCropHeight + "px";
            } else {
              this.cropperMode = this.options.autoCropWidth + "px auto";
            }
          }
        };
      };
 
      return isJpgOrPng;
    },
    //获取服务器返回的地址
    handleCropperSuccess(data) {
      //将返回的数据回显
      this.loading = false;
      this.$emit("avatarfn", data);
    },
    // 取消上传
    handleCropperClose() {
      this.loading = false;
    },
    getBase64(img, callback) {
      if (img) {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    },
  },
};
</script>
<style lang="less" scoped>
#create-ant-upload-preview {
  .avatar-upload-wrapper {
    height: 180px;
    width: 100%;
  }
  //更改上传组件宽高
  /deep/ .ant-upload-select {
    width: 198px;
    height: 108px;
  }
 
  .ant-upload-preview {
    background-color: #fff;
 
    .ant-upload-select-picture-card i {
      font-size: 14px;
      color: #5e6166;
    }
    .upload_img {
      width: 100%;
    }
    .ant-upload-select-picture-card .ant-upload-text {
      font-size: 14px;
      margin-top: 8px;
      color: #5e6166;
    }
  }
  .ant-upload-picture-card-wrapper {
    width: auto;
  }
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .avatatImg {
    display: flex;
    flex-direction: column;
    .text {
      div {
        line-height: 22px !important;
        font-weight: 600;
        color: #919399;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
      }
    }
  }
}
</style>