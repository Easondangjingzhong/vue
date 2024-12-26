<template>
  <div id="create-cropper-modal" ref="repalymodal">
    <a-modal
      :open="visible"
      :title="options.title"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      :width="600"
      :footer="null"
      :getContainer="() => $refs.repalymodal"
      @ok="handleSumbit"
      @cancel="handleCancel"
    >
      <a-row>
        <a-col :xs="24" :md="24" :style="{ height: '420px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            :mode="cropperMode"
            @realTime="realTime"
          >
          </vue-cropper>
        </a-col>
      </a-row>
      <a-row class="cropper-row" style="margin-top: 10px; justify-content: space-between">
        <a>
          <svg
            @click="handlePhotoAdd"
            style="vertical-align: middle"
            t="1734423241649"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="21264"
            width="18"
            height="18"
          >
            <path
              d="M747.52 730.3168a19.5584 19.5584 0 0 0 0-27.648l-73.6768-73.6768a19.5584 19.5584 0 0 0-27.648 0l-10.5984 10.5984L737.28 740.9152z"
              fill="#808080"
              p-id="21265"
            ></path>
            <path
              d="M635.6992 639.5904l-11.9808 11.9808a19.5584 19.5584 0 0 0 0 27.648l73.6768 73.6768a19.5584 19.5584 0 0 0 27.648 0l11.9808-11.9808z"
              fill="#616161"
              p-id="21266"
            ></path>
            <path
              d="M981.9648 896.256a19.6608 19.6608 0 0 0 0-27.648l-221.4912-221.4912a19.6608 19.6608 0 0 0-27.648 0l-44.8 44.8L936.96 941.056z"
              fill="#FFBC5B"
              p-id="21267"
            ></path>
            <path
              d="M688.0256 691.9168l-46.5408 46.5408a19.6608 19.6608 0 0 0 0 27.648l221.4912 221.4912a19.6608 19.6608 0 0 0 27.648 0l46.336-46.5408z"
              fill="#FFA726"
              p-id="21268"
            ></path>
            <path
              d="M404.736 34.1504A373.76 373.76 0 0 0 138.24 670.72L667.2896 141.8752A372.6336 372.6336 0 0 0 404.736 34.1504z"
              fill="#808080"
              p-id="21269"
            ></path>
            <path
              d="M667.2896 141.8752L138.24 670.72A373.76 373.76 0 1 0 667.2896 141.8752z"
              fill="#808080"
              p-id="21270"
            ></path>
            <path
              d="M404.736 101.12a306.8928 306.8928 0 0 0-218.88 522.24L619.8784 189.44a305.92 305.92 0 0 0-215.1424-88.32z"
              fill="#FFFFFF"
              p-id="21271"
            ></path>
            <path
              d="M619.8784 189.44L185.856 623.3088A306.8928 306.8928 0 1 0 619.8784 189.44z"
              fill="#EEEEEE"
              p-id="21272"
            ></path>
            <path
              d="M438.2208 246.272a33.4848 33.4848 0 0 0-66.9696 0v128.3584H242.8416a33.536 33.536 0 0 0 0 67.0208h124.672l70.7072-70.7072z"
              fill="#70BBF7"
              p-id="21273"
            ></path>
            <path
              d="M566.6304 374.6304H438.2208v-3.6864L367.5136 441.6512h3.7376v128.4096a33.4848 33.4848 0 0 0 66.9696 0V441.6512h128.4096a33.536 33.536 0 0 0 0-67.0208z"
              fill="#42A5F5"
              p-id="21274"
            ></path>
          </svg>
          <svg
            @click="handlePhotoAddTo"
            style="vertical-align: middle;margin-left: 5px;"
            t="1734423173796"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="21098"
            width="20"
            height="20"
          >
            <path
              d="M724.5824 696.8832L657.2032 629.76a17.8688 17.8688 0 0 0-25.2416 0l-9.728 9.6768 92.672 92.6208 9.6768-9.6768a17.8688 17.8688 0 0 0 0-25.4976z"
              fill="#808080"
              p-id="21099"
            ></path>
            <path
              d="M622.2336 639.1808l-10.9568 11.0592a17.92 17.92 0 0 0 0 25.2928l67.3792 67.3792a18.0224 18.0224 0 0 0 25.2928 0l10.9568-11.008z"
              fill="#616161"
              p-id="21100"
            ></path>
            <path
              d="M938.8032 848.5888l-202.496-202.496a17.8688 17.8688 0 0 0-25.2416 0l-40.96 40.96 227.7376 227.7376 40.96-40.96a17.8688 17.8688 0 0 0 0-25.2416z"
              fill="#FFBC5B"
              p-id="21101"
            ></path>
            <path
              d="M670.1056 687.0528l-42.5472 42.5472a17.8688 17.8688 0 0 0 0 25.2416L830.0544 957.44a17.8688 17.8688 0 0 0 25.2416 0l42.5472-42.5472z"
              fill="#FFA726"
              p-id="21102"
            ></path>
            <path
              d="M411.0848 85.6064a341.9136 341.9136 0 0 0-243.5584 581.9392l483.5328-483.5328a340.8384 340.8384 0 0 0-239.9744-98.4064zM651.1616 184.32l-483.6352 483.2256A341.9136 341.9136 0 1 0 651.1616 184.32z"
              fill="#808080"
              p-id="21103"
            ></path>
            <path
              d="M210.8928 624.2304l396.8512-396.8zM411.0848 146.8416a280.6272 280.6272 0 0 0-200.192 477.3888l396.8-396.8512a279.6032 279.6032 0 0 0-196.608-80.5376z"
              fill="#FFFFFF"
              p-id="21104"
            ></path>
            <path
              d="M607.7952 227.4816l-396.8512 396.8a280.6272 280.6272 0 1 0 396.8512-396.8z"
              fill="#EEEEEE"
              p-id="21105"
            ></path>
            <path
              d="M556.544 393.5744H441.5488l-61.44 61.44h176.4352a30.72 30.72 0 1 0 0-61.44z"
              fill="#42A5F5"
              p-id="21106"
            ></path>
            <path
              d="M260.5056 393.5744a30.72 30.72 0 0 0 0 61.44h119.808l61.44-61.44z"
              fill="#70BBF7"
              p-id="21107"
            ></path>
          </svg>
        </a>
        <a>
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button
            class="cropper-btn"
            style="background-color: #f0ad4e; border-color: #eea236; margin-left: 5px; color: #fff"
            key="submit"
            :loading="confirmLoading"
            @click="handleSumbit"
          >
            保存
          </a-button>
        </a>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  // import { Upgrad } from "corporatetrainingbundle/js/service";
  export default {
    props: {
      //图片存储在oss上的上级目录名
      imgType: {
        type: String,
        default: '',
      },
      fileName: {
        type: String, // 文件名
        default: '',
      },
      cropperMode: {
        // 图片渲染方式
        type: String,
        default: 'contain',
      },
    },
    mounted() {},
    data() {
      return {
        visible: false,
        img: null,
        confirmLoading: false,
        options: {
          img: '', //裁剪图片的地址
          autoCrop: true, //是否默认生成截图框
          // autoCropWidth: 200, //默认生成截图框宽度
          // autoCropHeight: 200, //默认生成截图框高度
          // fixedBox: true, //是否固定截图框大小 不允许改变
          previewsCircle: false, //预览图是否是原圆形
          title: '修改图片',
        },
        previews: {},
        url: {
          upload: '/sys/common/saveToImgByStr',
        }
      };
    },
    methods: {
      handlePhotoAdd() {
        this.$refs.cropper.changeScale(1);
      },
      handlePhotoAddTo() {
        this.$refs.cropper.changeScale(-1);
      },
      edit(record) {
        this.visible = true;
        this.options = Object.assign({}, this.options, record);
        console.log(this.options);
      },
      // 取消截图
      handleCancel() {
        this.confirmLoading = false;
        this.visible = false;
        //this.$emit("cropper-no");
      },
      // 确认截图
      handleSumbit() {
        this.confirmLoading = true;
        // 获取截图的base64 数据
        this.$refs.cropper.getCropData(async (data) => {
          this.handleCancel();
          this.$emit('cropper-ok', data);
          // const file = this.dataURLtoFile(data, this.fileName);
          // let formData = new window.FormData();
          // formData.append("file", file);
          // 调用后端接口上传裁剪后图片，获取图片url传递给组件表单和回显
          // formData.append("token", $("#upload_token").val());
          // try {
          //   const { id, url } = await Upgrad.uploadImageApi(formData);
          //   this.$emit("cropper-ok", id, url);
          // } catch (error) {
          //   this.$message.error("网络异常，请稍后再试！");
          // } finally {
          //   this.visible = false;
          //   this.confirmLoading = false;
          // }
        });
      },
      //移动框的事件
      realTime(data) {
        this.previews = data;
      },
      // base 64 转成二进制文件流
      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      },
    },
  };
</script>
<style lang="less" scoped>
  #create-cropper-modal {
    .avatar-upload-preview_range,
    .avatar-upload-preview {
      position: absolute;
      top: 50%;
      transform: translate(50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 0 4px #ccc;
      overflow: hidden;
      img {
        background-color: red;
        height: 100%;
      }
    }
    .avatar-upload-preview_range {
      border-radius: 0;
    }
    #create-cropper-modal:deep(.cropper-row) {
      margin-top: 5px;
      text-align: right;
    }

    #create-cropper-modal:deep(.cropper-btn) {
      margin-left: 5px;
      background-color: bisque;
      border-color: antiquewhite;
      color: #fff;
    }
  }
</style>
