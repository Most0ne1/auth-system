
<template>
  <div class="p-8 px-auto">
    <h1 class="text-4xl font-bold ">Welcome to HomePage</h1>
    <p v-if="authStore.user">Hello, {{ authStore.user.name }}!</p>
    <p v-else>Please <NuxtLink to="/login">Login</NuxtLink> or <NuxtLink to="/register">Register</NuxtLink>.</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
</script>
