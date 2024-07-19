<template>
    <div class="admin">
      <h1>管理员界面</h1>
      <div class="actions">
        <button @click="navigateTo('delete')">删除用户</button>
        <button @click="navigateTo('history')">查看用户历史记录</button>
        <button @click="navigateTo('reset-password')">修改用户密码</button>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminPage',
    methods: {
      navigateTo(action) {
        this.$router.push(`/admin/${action}`);
      }
    }
  }
  </script>
  
  <style scoped>
  .admin {
    padding: 20px;
  }
  .actions button {
    margin: 10px;
  }
  </style>
  