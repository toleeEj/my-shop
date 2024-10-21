<template>
  <div>
    <h1>Shopping Cart</h1>

    <!-- Cart Items -->
    <ul>
      <li v-for="item in cart" :key="item.id">
        <div class="cart-item">
          <span>{{ item.name }} - ${{ item.price }}</span>
          <input 
            type="number" 
            v-model.number="item.quantity" 
            min="1" 
            @change="updateQuantity(item.id, item.quantity)" 
          />
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
      </li>
    </ul>

    <!-- Cart Summary -->
    <div class="cart-summary">
      <p>Subtotal: ${{ subtotal }}</p>
      <p>Shipping Fees: ${{ shippingFee }}</p>
      <p>Taxes (10%): ${{ taxes }}</p>
      <h3>Total: ${{ totalPrice }}</h3>
    </div>

    <!-- Cart Actions -->
    <div class="cart-actions">
      <button @click="proceedToCheckout">Proceed to Checkout</button>
      <button @click="saveCartForLater">Save Cart for Later</button>
      <button @click="clearCart">Clear Cart</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const cart = computed(() => store.state.cart);

    // Calculate subtotal (total of product prices in the cart)
    const subtotal = computed(() => {
      return cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
    });

    // Shipping fee (fixed or dynamic, example: $5 for demo purposes)
    const shippingFee = computed(() => (subtotal.value > 0 ? 5 : 0));

    // Taxes (example: 10% of subtotal)
    const taxes = computed(() => subtotal.value * 0.1);

    // Calculate total price
    const totalPrice = computed(() => subtotal.value + shippingFee.value + taxes.value);

    // Remove item from cart
    const removeFromCart = (productId) => {
      store.dispatch('removeFromCart', productId);
    };

    // Update product quantity in the cart
    const updateQuantity = (productId, quantity) => {
      store.dispatch('updateCartQuantity', { productId, quantity });
    };

    // Proceed to checkout (dummy handler for now)
    const proceedToCheckout = () => {
      alert('Proceeding to checkout...');
    };

    // Save cart for later (dummy handler for now)
    const saveCartForLater = () => {
      alert('Cart saved for later!');
    };

    // Clear the cart
    const clearCart = () => {
      store.dispatch('clearCart');
    };

    return {
      cart,
      subtotal,
      shippingFee,
      taxes,
      totalPrice,
      removeFromCart,
      updateQuantity,
      proceedToCheckout,
      saveCartForLater,
      clearCart,
    };
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.cart-summary {
  margin-top: 20px;
}

.cart-actions {
  margin-top: 20px;
}

button {
  margin-right: 10px;
}
</style>
