<!-- src/components/HomePage.vue -->
<template>
  <div class="landing-page">
    <header>
      <div class="logo">My Store</div>
    </header>

    <nav class="nav-links">
      <router-link class="nav-link" to="/products">Product List</router-link>
      <router-link class="nav-link" to="/MyCart">My Cart</router-link>
    </nav>

    <main>
      <h1>Welcome to My Store</h1>
      <p>Your one-stop shop for all the best products!</p>
      <router-link to="/" class="explore-button">Explore Products</router-link>
    </main>

    <footer>
      <p>&copy; 2024 My Store. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.landing-page {
  background-image: url('@/assets/Tablets3.jpg'); /* Replace with your image path */
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

header {
  padding: 20px;
}

.logo {
  font-size: 2em;
  font-weight: bold;
  color: #fff;
}

.nav-links {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.nav-link {
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
  font-size: 1.2em;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #42b983;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.explore-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s;
}

.explore-button:hover {
  background-color: #2c9d64;
}

footer {
  padding: 10px 0;
}
</style>
