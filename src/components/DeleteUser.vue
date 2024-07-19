<template>
    <div>
      <h2>删除用户</h2>
      <input v-model="userId" placeholder="请输入用户ID"/>
      <button @click="deleteUser">删除</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeleteUser',
    methods: {
      deleteUser() {
        // 在这里添加删除用户的逻辑
        console.log(`删除用户: ${this.userId}`);
      }
    }
  }
  </script>
  