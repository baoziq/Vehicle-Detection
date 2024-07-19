<template>
  <div>
    <h2>删除用户</h2>
    <input v-model="username" placeholder="请输入用户名"/>
    <button @click="deleteUser">删除</button>
    <p v-if="message">{{ message }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeleteUser',
  data() {
    return {
      username: '',
      message: '',
      error: ''
    };
  },
  methods: {
    async deleteUser() {
      try {
        const response = await axios.delete('http://127.0.0.1:5000/api/admin/delete_user', {
          data: { username: this.username }
        });
        this.message = response.data.message;
        this.error = '';
      } catch (err) {
        this.error = err.response?.data?.error || '删除用户失败';
        this.message = '';
      }
    }
  }
}
</script>
