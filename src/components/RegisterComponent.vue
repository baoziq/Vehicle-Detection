<template>
  <div class="register-container">
    <div class="register-card">
      <h1>注册</h1>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="username">用户名：</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">密码：</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="register-button">注册</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="login-link">
        <span>Already have an account?<router-link to="/">登录</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://192.168.137.154:5001/api/register', {
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
          console.log('Registration successful:', data)
          // Redirect to login page after successful registration
          this.$router.push('/')  // Assuming '/' is your login route
        } else {
          this.error = data.message || 'Registration failed'
        }
      } catch (error) {
        this.error = 'An error occurred'
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 400px;
  transition: transform 0.2s;
}

.register-card:hover {
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

.register-button {
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

.register-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.login-link {
  margin-top: 20px;
  text-align: center;
}

.login-link span {
  color: #007bff;
  cursor: pointer;
}
</style>
