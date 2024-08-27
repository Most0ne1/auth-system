<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6">Register</h2>
      <form @submit.prevent="register">
        <!-- Image Upload Trigger -->
        <div class="mb-4 text-center">
          <input
            type="file"
            ref="fileInput"
            @change="handleImageUpload"
            class="hidden"
            accept="image/*"
          />
          <img
            :src="imgPreview"
            alt="Profile Image Preview"
            class="w-32 h-32 object-cover rounded-full mx-auto mb-4 cursor-pointer"
            @click="triggerFileInput"
          />
        </div>
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-gray-700">Last Name</label>
          <input
            v-model="lastName"
            type="text"
            id="lastName"
            class="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
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
        <div class="mb-4">
          <label for="nationality" class="block text-gray-700">Nationality</label>
          <input
            v-model="nationality"
            type="text"
            id="nationality"
            class="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-gray-700">Gender</label>
          <select
            v-model="gender"
            id="gender"
            class="w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useAuthStore } from '~/stores/auth';

const name = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const nationality = ref('');
const gender = ref('');
const imgPreview = ref('https://via.placeholder.com/150'); // Default image URL

const authStore = useAuthStore();
const router = useRouter(); // Get router instance
const fileInput = ref<HTMLInputElement | null>(null);

const register = async () => {
  try {
    await authStore.register(name.value, lastName.value, email.value, password.value, imgPreview.value, nationality.value, gender.value);
    alert('Registration successful!');
    router.push('/dashboard'); // Redirect after successful registration
  } catch (error) {
    console.error('Registration error:', error);
    alert('Registration failed. Please check your input and try again.');
  }
};

// Handle image upload and preview
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click();
};
</script>


<style scoped>

</style>
