<template>
  <div class="main-container">
    <div class="header">
      <h1>欢迎来到车辆检测系统</h1>
    </div>
    <div class="button-container">
      <router-link to="/login">
        <button class="main-button">登录</button>
      </router-link>
      <router-link to="/register">
        <button class="main-button">注册</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #f0f4f8, #e1e9ef);
  text-align: center;
}

.header {
  margin-bottom: 40px;
}

h1 {
  font-size: 36px;
  color: #333;
}

p {
  font-size: 18px;
  color: #555;
}

.button-container {
  display: flex;
  gap: 20px;
}

.main-button {
  padding: 15px 30px;
  font-size: 18px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.main-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>