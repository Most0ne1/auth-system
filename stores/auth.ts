
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'nuxt/app';
import type { User } from '~/types';


export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const router = useRouter();

  const isClient = typeof window !== 'undefined'; // Check if running in the browser

  const register = async (
    name: string,
    lastName: string,
    email: string,
    password: string,
    img: string,
    nationality: string,
    gender: string
  ) => {
    try {
      const { user: registeredUser, token: authToken } = await $fetch<{
        user: User;
        token: string;
      }>('/api/register', {
        method: 'POST',
        body: { name, lastName, email, password, img, nationality, gender },
      });

      user.value = registeredUser;
      token.value = authToken;

      if (isClient && token.value) {
        localStorage.setItem('token', token.value);
      }

      navigateTo('/')
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user: loggedInUser, token: authToken } = await $fetch<{
        user: User;
        token: string;
      }>('/api/login', {
        method: 'POST',
        body: { email, password },
      });

      user.value = loggedInUser;
      token.value = authToken;

      if (isClient && token.value) {
        localStorage.setItem('token', token.value);
      }

    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    if (isClient) {
      localStorage.removeItem('token');
    }

    router.push('/login');
  };

  const fetchUser = async () => {
    if (isClient) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const { user: fetchedUser } = await $fetch<{
            user: User;
          }>('/api/user', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          user.value = fetchedUser;
          token.value = storedToken;
        } catch (error) {
          console.error('Failed to fetch user:', error);
          logout();
        }
      }
    }
  };

  return {
    user,
    token,
    register,
    login,
    logout,
    fetchUser,
  };
});
