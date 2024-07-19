<template>
    <div>
      <h2>查看用户历史记录</h2>
      <input v-model="userId" placeholder="请输入用户ID"/>
      <button @click="viewHistory">查看</button>
      <div v-if="history">
        <h3>用户历史记录:</h3>
        <ul>
          <li v-for="record in history" :key="record.id">{{ record.action }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userId: '',
        history: null
      }
    },
    methods: {
      viewHistory() {
        // 在这里添加查看用户历史记录的逻辑
        console.log(`查看用户历史记录: ${this.userId}`);
        // 模拟历史记录
        this.history = [
          { id: 1, action: '登录' },
          { id: 2, action: '更新密码' },
          // 其他记录
        ];
      }
    }
  }
  </script>
  