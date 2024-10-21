<template>
  <div>
    <h1>Product List</h1>

    <!-- Search and Filters -->
    <div class="filters">
      <input type="text" v-model="searchQuery" placeholder="Search products..." />

      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>

      <select v-model="sortBy">
        <option value="price">Sort by Price</option>
        <option value="rating">Sort by Rating</option>
      </select>
    </div>

    <!-- Product List -->
    <ul class="product-list">
      <li v-for="product in filteredAndSortedProducts" :key="product.id">
        <div class="product-card">
          <img :src="product.image" alt="Product Thumbnail" class="product-thumbnail" />
          <div>
            <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
              <h3>{{ product.name }}</h3>
            </router-link>
            <p>Price: ${{ product.price }}</p>
            <p>Rating: {{ product.rating }}/5</p>
            <button @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const products = computed(() => store.state.products);

    // Search and filters
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const sortBy = ref('price');

    // Pagination
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

    // Filter and sort products
    const filteredProducts = computed(() => {
      let filtered = products.value;

      // Filter by category
      if (selectedCategory.value) {
        filtered = filtered.filter(product => product.category === selectedCategory.value);
      }

      // Search by name
      if (searchQuery.value) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      return filtered;
    });

    // Sort products
    const filteredAndSortedProducts = computed(() => {
      let sorted = [...filteredProducts.value];

      if (sortBy.value === 'price') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortBy.value === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      }

      // Paginate results
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return sorted.slice(start, end);
    });

    // Pagination navigation
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    // Add to Cart
    const addToCart = product => {
      store.dispatch('addToCart', product);
    };

    // Example categories
    const categories = ['Laptops', 'Cameras', 'Smartphones', 'Tablets', 'Smartwatches'];

    return {
      products,
      searchQuery,
      selectedCategory,
      sortBy,
      filteredAndSortedProducts,
      addToCart,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      categories,
    };
  },
};
</script>

<style scoped>
/* Example styles for the component */
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
}

.product-thumbnail {
  width: 100px;
  height: 100px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
