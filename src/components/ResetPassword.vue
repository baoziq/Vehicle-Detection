<template>
    <div>
      <h2>修改用户密码</h2>
      <input v-model="userId" placeholder="请输入用户ID"/>
      <input v-model="newPassword" type="password" placeholder="请输入新密码"/>
      <button @click="resetPassword">修改</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userId: '',
        newPassword: ''
      }
    },
    methods: {
      resetPassword() {
        // 在这里添加修改用户密码的逻辑
        console.log(`修改用户 ${this.userId} 的密码为 ${this.newPassword}`);
      }
    }
  }
  </script>
  