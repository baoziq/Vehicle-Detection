<template>
    <div class="background">
      <div class="container">
        <h1>请选择功能</h1>
        <div class="button-group">
          <router-link to="/traffic">
            <button class="function-button">车流量检测</button>
          </router-link>
          <router-link to="/detect">
            <button class="function-button">车型检测</button>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SelectFunction',
    methods: {
      redirectTo(path) {
        this.$router.push({ path });
      }
    }
  };
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
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
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
    padding: 15px;
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
  