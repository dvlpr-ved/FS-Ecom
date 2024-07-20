// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('middleware/auth');
  console.log('to', to);
  console.log('from', from);

  // Add your authentication logic here
  // For example:
  // const user = useUser();
  // if (!user.isLoggedIn) {
  //   return navigateTo('/login');
  // }
});
