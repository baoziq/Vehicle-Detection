<template>
  <div>
    <h2>修改用户密码</h2>
    <div class="input-group">
      <label for="userId">用户ID:</label>
      <input v-model="userId" id="userId" placeholder="请输入用户ID" />
    </div>
    <div class="input-group">
      <label for="newPassword">新密码:</label>
      <input v-model="newPassword" id="newPassword" type="password" placeholder="请输入新密码" />
    </div>
    <button @click="resetPassword" :disabled="!userId || !newPassword">修改</button>
    <div v-if="message" class="message">{{ message }}</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      newPassword: '',
      message: null,
      error: null
    };
  },
  methods: {
    async resetPassword() {
      this.message = null;
      this.error = null;
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/admin/change_password', {
          username: this.userId,
          new_password: this.newPassword
        });
        this.message = response.data.message || '密码修改成功';
        setTimeout(() => {
          this.$router.push('/login');  // 重定向到登录页面
        }, 2000); // 延迟2秒以显示成功消息
      } catch (error) {
        this.error = error.response?.data?.error || '密码修改失败';
      }
    }
  }
};
</script>

<style scoped>
.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}

.message, .error {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}

.message {
  color: green;
}

.error {
  color: red;
}
</style>
