import { createStore } from 'vuex';

export default createStore({
  state: {
    // List of products (sample products)
    products: [
      { id: 1, name: 'Product A', description: 'Description of Product A', price: 100, options: { color: ['Red', 'Blue'], size: ['S', 'M', 'L'] } },
      { id: 2, name: 'Product B', description: 'Description of Product B', price: 150, options: { color: ['Green', 'Black'], size: ['M', 'L'] } },
      // Add more products as needed
    ],

    // Shopping cart, initialized as an empty array
    cart: [],

    // Cart persistence (for saving the cart)
    savedCart: [],
  },

  getters: {
    // Get product by ID
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },

    // Calculate the total price of the cart
    cartTotalPrice: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    // Get cart subtotal (total price of all items in the cart)
    cartSubtotal: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    // Get cart item by ID
    getCartItemById: (state) => (id) => {
      return state.cart.find((item) => item.id === id);
    },

    // Get saved cart for later
    savedCart: (state) => {
      return state.savedCart;
    },

    // Get related products (based on simple logic, e.g., price similarity)
    getRelatedProducts: (state) => (product) => {
      return state.products.filter((p) => p.id !== product.id && p.price <= product.price + 50 && p.price >= product.price - 50);
    },
  },

  mutations: {
    // Add a product to the cart
    addToCart(state, product) {
      const cartItem = state.cart.find((item) => item.id === product.id);
      if (cartItem) {
        // If the item is already in the cart, increase its quantity
        cartItem.quantity++;
      } else {
        // Otherwise, add the item to the cart with an initial quantity of 1
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    // Remove a product from the cart
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },

    // Update product quantity in the cart
    updateCartQuantity(state, { productId, quantity }) {
      const cartItem = state.cart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },

    // Clear the entire cart
    clearCart(state) {
      state.cart = [];
    },

    // Save the cart for later
    saveCart(state) {
      state.savedCart = [...state.cart];
    },

    // Restore the saved cart
    restoreCart(state) {
      state.cart = [...state.savedCart];
    },
  },

  actions: {
    // Action to add a product to the cart
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },

    // Action to remove a product from the cart
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },

    // Action to update cart quantity
    updateCartQuantity({ commit }, payload) {
      commit('updateCartQuantity', payload);
    },

    // Action to clear the cart
    clearCart({ commit }) {
      commit('clearCart');
    },

    // Action to save the cart for later
    saveCart({ commit }) {
      commit('saveCart');
    },

    // Action to restore the saved cart
    restoreCart({ commit }) {
      commit('restoreCart');
    },
  },

  modules: {},
});
