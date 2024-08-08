<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Base styles */
.app-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to the top */
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 1000px; /* Limit the width of the container */
  width: 50%; /* Take half of the screen width */
}

/* Mobile styles */
@media (max-width: 599px) {
  .app-container {
    width: 100%;
    max-width: 100%;
    border: none; /* Remove border on small screens */
  }
}
</style>
