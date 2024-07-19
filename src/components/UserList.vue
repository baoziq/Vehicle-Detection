<template>
    <div>
      <h2>查看所有用户</h2>
      <button @click="fetchUsers">查看用户列表</button>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="users.length > 0">
        <h3>用户列表:</h3>
        <ul>
          <li v-for="user in users" :key="user.username">{{ user.username }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserList',
    data() {
      return {
        users: [],
        loading: false,
        error: null
      };
    },
    methods: {
      async fetchUsers() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get('http://127.0.0.1:5000/api/admin/list_users');
          this.users = response.data.users;
        } catch (error) {
          this.error = '无法加载用户列表';
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .loading {
    color: #007bff;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
  }
  
  .error {
    color: red;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  </style>
  