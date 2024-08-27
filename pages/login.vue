<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
 
import { useAuthStore } from '~/stores/auth';

const email = ref('');
const password = ref('');

const authStore = useAuthStore();
const router = useRouter(); // Create router instance

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    // Redirect to the desired page after successful login
    router.push('/dashboard'); // Change '/dashboard' to your desired route
  } catch (error) {
    alert('Login failed. Please try again.');
  }
};
</script>
