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
        <button type="submit" class="recognize-button" @click.prevent="recognize" :disabled="!uploadedVideo || isLoading">
          识别
        </button>
        <div v-if="isLoading" class="loading">加载中...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="recognitionSuccess" class="success">
          识别成功！请选择要保存的文件夹
          <input type="file" id="folder-picker" style="display: none;" webkitdirectory @change="handleFolderSelect" />
          <button class="save-button" @click="openFolderPicker">选择文件夹</button>
        </div>
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
      isLoading: false,
      error: null,
      recognitionSuccess: false,
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
      this.isLoading = true;
      this.error = null;
      this.recognitionSuccess = false;
      try {
        const formData = new FormData();
        formData.append('video', this.uploadedVideo);
        const response = await axios.post('http://192.168.137.115:5000/recognize', formData);
        if (response.data) {
          this.recognitionSuccess = true;
        }
      } catch (error) {
        this.error = '识别失败';
      } finally {
        this.isLoading = false;
      }
    },
    deleteFile() {
      this.uploadedVideo = null;
      this.recognitionSuccess = false;
    },
    openFolderPicker() {
      document.getElementById('folder-picker').click();
    },
    handleFolderSelect(event) {
      const folder = event.target.files;
      if (folder.length > 0) {
        // 处理将视频保存到选定的文件夹
        this.saveVideoToFolder(folder[0].webkitRelativePath.split('/')[0]);
      }
    },
    saveVideoToFolder(folderPath) {
      const link = document.createElement('a');
      link.href = this.uploadedVideo.preview;
      link.download = `${folderPath}/${this.uploadedVideo.name}`;
      link.click();
    },
  },
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
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
}

.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
  color: #000000;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.upload-label {
  margin-right: 10px;
  font-weight: bold;
  color: #000000;
}

.upload-button, .recognize-button, .save-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.upload-button:hover, .recognize-button:hover, .save-button:hover {
  background-color: #0056b3;
}

.uploaded-files {
  max-height: 200px;
  overflow-y: auto;
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

.recognize-button, .save-button {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.loading, .error, .success {
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
}

.loading {
  color: #007bff;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
 