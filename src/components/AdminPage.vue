<template>
  <div class="background">
    <div class="container">
      <h1>管理员界面</h1>
      <div class="button-group">
        <router-link to="/delete">
            <button class="function-button">删除用户</button>
          </router-link>
          <router-link to="/reset-password">
            <button class="function-button">修改用户密码</button>
          </router-link>
          <router-link to="/history">
            <button class="function-button">查看用户历史记录</button>
          </router-link>
          <router-link to="/userlist">
            <button class="function-button">查看所有用户</button>
          </router-link>
      </div>
      <router-view></router-view>
    </div>
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
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background-color: #f9f9f9;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ecf5ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  text-align: center;
  background-color: white;
  padding: 40px;
  border-radius: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 50%;
  max-width: 600px; /* 调整最大宽度适应内容 */
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.function-button {
  padding: 12px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.function-button:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}

@media (min-width: 768px) {
  .button-group {
    flex-direction: row;
    justify-content: space-around;
  }

  .function-button {
    flex: 1;
    margin: 0 10px;
  }
}
</style>
