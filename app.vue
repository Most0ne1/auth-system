<!-- app.vue -->
<template>
  <div>
    <nav class="bg-gray-800 p-4">
      <ul class="flex space-x-4">
        <li><NuxtLink to="/" class="text-white">Home</NuxtLink></li>
        <li v-if="!authStore.user"><NuxtLink to="/login" class="text-white">Login</NuxtLink></li>
        <li v-if="!authStore.user"><NuxtLink to="/register" class="text-white">Register</NuxtLink></li>
        <li v-if="authStore.user">
          <a @click="authStore.logout" class="text-white cursor-pointer">Logout</a>
        </li>
      </ul>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
</script>
