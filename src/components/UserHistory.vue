<template>
  <div>
    <h2>查看用户历史记录</h2>
    <div class="input-group">
      <label for="userId">用户ID:</label>
      <input v-model="userId" id="userId" placeholder="请输入用户ID" />
    </div>
    <button @click="viewHistory" :disabled="!userId">查看</button>
    <div v-if="history">
      <h3>用户历史记录:</h3>
      <ul>
        <li v-for="record in history" :key="record.timestamp">
          {{ record.action }} - {{ record.timestamp }}
        </li>
      </ul>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      history: null,
      error: null
    };
  },
  methods: {
    async viewHistory() {
      this.history = null;
      this.error = null;
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/admin/user_activity', {
          params: {
            username: this.userId
          }
        });
        this.history = response.data.activity || [];
      } catch (error) {
        this.error = error.response?.data?.error || '无法获取用户历史记录';
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

.error {
  color: red;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}
</style>
