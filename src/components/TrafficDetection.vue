<template>
    <div class="background">
      <div class="login-container">
        <div class="login-card">
          <h1>车流量识别系统</h1>
          <div class="input-group">
            <label for="video-upload" class="upload-label">上传视频：</label>
            <input type="file" id="video-upload" style="display: none;" @change="handleFileUpload" accept="video/*" />
            <button class="upload-button" @click="openFilePicker">选择文件</button>
          </div>
          <div class="uploaded-files" v-if="uploadedVideo">
            <h2>已上传文件：</h2>
            <div class="video-preview">
              <video :src="uploadedVideo.preview" controls class="preview-video"></video>
              <button class="delete-button" @click="deleteFile">删除</button>
            </div>
          </div>
          <button type="submit" class="recognize-button" @click.prevent="recognize" :disabled="!uploadedVideo">识别</button>
          <div v-if="error" class="error">{{ error }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TrafficFlowRecognition',
    data() {
      return {
        uploadedVideo: null,
        error: null
      };
    },
    methods: {
      openFilePicker() {
        document.getElementById('video-upload').click();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            file.preview = e.target.result;
            this.uploadedVideo = file;
          };
          reader.readAsDataURL(file);
        }
      },
      async recognize() {
        try {
          const formData = new FormData();
          formData.append('video', this.uploadedVideo);
          const response = await axios.post('http://192.168.0.220:5000/upload', formData);
          if (response.data) {
            this.$router.push({ name: 'RecognitionResults', params: { results: response.data } });
          }
        } catch (error) {
          this.error = '识别失败';
        }
      },
      deleteFile() {
        this.uploadedVideo = null;
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
  }
  
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/background.jpg'); /* 设置背景图片路径 */
    background-size: cover; /* 背景图片大小自适应 */
    background-position: center; /* 背景图片居中 */
  }
  
  .login-container {
    position: relative; /* 相对定位，以便设置背景图层 */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 让页面铺满整个视口高度 */
  }
  
  .login-card {
    background-color: rgba(255, 255, 255, 0.8); /* 设置背景颜色透明度 */
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 50%; /* 增加宽度以适应图片预览 */
    height: auto; /* 自动高度 */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 垂直方向上均匀分布内容 */
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 28px;
    text-align: center;
    color: #000000;
  }
  
  .input-group {
    display: flex; /* 使用 Flexbox 布局 */
    align-items: center; /* 垂直居中对齐 */
    margin-bottom: 20px;
  }
  
  .upload-label {
    margin-right: 10px; /* 调整 label 和 input 之间的间距 */
    font-weight: bold;
    color: #000000;
  }
  
  .upload-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }
  
  .upload-button:hover {
    background-color: #0056b3;
  }
  
  .uploaded-files {
    max-height: 200px; /* 设置最大高度 */
    overflow-y: auto; /* 垂直滚动条 */
    margin-bottom: 20px;
  }
  
  .video-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .preview-video {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .delete-button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .delete-button:hover {
    background-color: #bd2130;
  }
  
  .recognize-button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
    margin-top: 10px; /* 添加上边距以创建间隔 */
    margin-bottom: 10px; /* 添加下边距以创建间隔 */
  }
  
  .recognize-button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  </style>
  