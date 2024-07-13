<template>
  <div class="background">
    <div class="login-container">
      <div class="login-card">
        <h1>车辆图像识别</h1>
        <div class="input-group">
          <label for="image-upload" class="upload-label">上传图片：</label>
          <input type="file" id="image-upload" style="display: none;" multiple @change="handleFileUpload" accept="image/*" />
          <button class="upload-button" @click="openFilePicker">选择文件</button>
        </div>
        <div class="uploaded-files" ref="uploadedFiles">
          <h2>已上传文件：</h2>
          <ul class="file-list">
            <li v-for="(file, index) in uploadedImages" :key="index">
              <span>{{ file.name }}</span>
              <button class="delete-button" @click="deleteFile(index)">删除</button>
            </li>
          </ul>
        </div>
        <button type="submit" class="recognize-button" @click.prevent="recognize" :disabled="uploadedImages.length === 0">识别</button>
        <div v-if="results.length > 0" class="result-container">
          <h2>识别结果：</h2>
          <p class="first-result">{{ results.join(', ') }}</p>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VehicleRecognition',
  data() {
    return {
      results: [],
      uploadedImages: [],
      error: null
    };
  },
  methods: {
    openFilePicker() {
      document.getElementById('image-upload').click();
    },
    handleFileUpload(event) {
      const newFiles = Array.from(event.target.files);
      this.uploadedImages = this.uploadedImages.concat(newFiles);
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    async recognize() {
      this.results = [];
      try {
        const formData = new FormData();
        this.uploadedImages.forEach(image => {
          formData.append('image', image);
        });
        const response = await axios.post('http://192.168.0.66:5000/recognize', formData);
        // Assuming response.data is an array of objects with a 'class' property
        if (response.data.length > 0) {
          this.results = response.data.map(result => result.class);
        }
      } catch (error) {
        this.error = '识别失败';
      }
    },
    deleteFile(index) {
      this.uploadedImages.splice(index, 1);
    },
    scrollToBottom() {
      const uploadedFilesDiv = this.$refs.uploadedFiles;
      if (uploadedFilesDiv) {
        uploadedFilesDiv.scrollTop = uploadedFilesDiv.scrollHeight;
      }
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
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 300px; /* 设置宽度为正方形 */
  height: auto; /* 自动高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 垂直方向上均匀分布内容 */
}

.login-card:hover {
  transform: translateY(-5px);
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
  color: #333;
}

.input-group {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
  margin-bottom: 20px;
}

.upload-label {
  margin-right: 10px; /* 调整 label 和 input 之间的间距 */
  font-weight: bold;
  color: #555;
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

.file-list {
  list-style-type: none;
  padding: 0;
}

.file-list li {
  margin-bottom: 5px;
}

.delete-button {
  margin-left: 10px;
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

.result-container {
  margin-top: 20px;
  text-align: left;
}

.result-container h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.result-list {
  list-style-type: none;
  padding: 0;
}

.uploaded-files {
  max-height: 200px; /* 设置最大高度 */
  overflow-y: auto; /* 垂直滚动条 */
}
</style>
