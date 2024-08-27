export default defineNuxtPlugin(async(nuxtApp) => {
const userStore  = useAuthStore();
if(!userStore.user){
  await userStore.fetchUser();

}


})
