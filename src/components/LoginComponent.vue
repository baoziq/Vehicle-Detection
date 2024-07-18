<template>
  <div class="login-container">
    <div class="login-card">
      <h1>登录</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">用户名:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">密码:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">登录</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="register-link">
        <span>Don't have an account? <router-link to="/Register">注册</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
  async login() {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      const data = await response.json()
      if (response.ok) {
        console.log('Login successful:', data)
        localStorage.setItem('isAuthenticated', 'true')  // 存储身份验证状态
        this.$router.push('/choose')  // 重定向到受保护的页面
      } else {
        this.error = data.message || 'Login failed'
      }
    } catch (error) {
      this.error = 'An error occurred'
    }
  }
}

}
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(to right, #f9f9f9, #e3e3e3);
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 400px;
  transition: transform 0.2s;
}

.login-card:hover {
  transform: translateY(-5px);
}

h1 {
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
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

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.register-link {
  margin-top: 20px;
  text-align: center;
}

.register-link span {
  color: #007bff;
  cursor: pointer;
}
</style>
