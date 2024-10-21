<!-- src/components/ProductDetails.vue -->
<template>
  <div v-if="product">
    <!-- Breadcrumbs -->
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        <li>{{ product.name }}</li>
      </ul>
    </nav>

    <!-- Product details -->
    <h1>{{ product.name }}</h1>
    <div class="product-gallery">
      <img :src="product.images[0]" alt="Product Image" />
      <!-- Image thumbnails -->
      <div class="thumbnails">
        <img v-for="(img, index) in product.images" :src="img" :key="index" @click="setMainImage(img)" />
      </div>
    </div>

    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    
    <!-- Specifications -->
    <div v-if="product.specifications">
      <h3>Specifications:</h3>
      <ul>
        <li v-for="(spec, key) in product.specifications" :key="key">
          {{ key }}: {{ spec }}
        </li>
      </ul>
    </div>

    <!-- Selectable product options -->
    <div class="product-options">
      <label for="color">Color:</label>
      <select v-model="selectedColor">
        <option v-for="color in product.colors" :key="color" :value="color">{{ color }}</option>
      </select>

      <label for="size">Size:</label>
      <select v-model="selectedSize">
        <option v-for="size in product.sizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>

    <!-- Quantity Selector -->
    <label for="quantity">Quantity:</label>
    <input type="number" v-model="quantity" min="1" />

    <!-- Add to Cart Button -->
    <button @click="addToCart(product)">Add to Cart</button>

    <!-- Product Reviews -->
    <div class="reviews" v-if="product.reviews && product.reviews.length">
      <h3>Reviews:</h3>
      <ul>
        <li v-for="review in product.reviews" :key="review.id">
          <strong>{{ review.author }}</strong>: {{ review.rating }}/5
          <p>{{ review.comment }}</p>
        </li>
      </ul>
    </div>

    <!-- Related Products -->
    <div class="related-products" v-if="relatedProducts.length">
      <h3>Related Products:</h3>
      <ul>
        <li v-for="related in relatedProducts" :key="related.id">
          <router-link :to="`/products/${related.id}`">{{ related.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    
    const product = computed(() =>
      store.getters.getProductById(parseInt(route.params.id))
    );

    // Default selected options
    const selectedColor = ref(product.value.colors[0]);
    const selectedSize = ref(product.value.sizes[0]);
    const quantity = ref(1);

    // Related products based on category or similarity
    const relatedProducts = computed(() => {
      return store.getters.getRelatedProducts(product.value.category);
    });

    const addToCart = (product) => {
      const cartProduct = {
        ...product,
        color: selectedColor.value,
        size: selectedSize.value,
        quantity: quantity.value
      };
      store.dispatch('addToCart', cartProduct);
    };

    const setMainImage = (img) => {
      product.value.images[0] = img; // Update main image
    };

    return { product, selectedColor, selectedSize, quantity, relatedProducts, addToCart, setMainImage };
  },
};
</script>

<style scoped>
/* Example styles for the component */

.product-gallery {
  display: flex;
  flex-direction: column;
}

.thumbnails img {
  width: 50px;
  margin: 5px;
  cursor: pointer;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-right: 10px;
}

.product-options {
  margin: 10px 0;
}

.related-products ul {
  list-style: none;
}

.related-products ul li {
  margin: 5px 0;
}

.reviews ul {
  list-style: none;
}
</style>
