<template>
  <div class="page-panel">
    <div class="page-heading">
      <h1>Login</h1>
      <p>Sign in as an administrator or library user. Use admin/admin123 for the admin account.</p>
    </div>

    <section class="card">
      <template v-if="!auth.loggedIn">
        <form @submit.prevent="submitLogin">
          <label>
            Username or email
            <input v-model="credentials.username" placeholder="admin or user email" required />
          </label>
          <label>
            Password
            <input type="password" v-model="credentials.password" placeholder="Password" required />
          </label>
          <button type="submit">Login</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
        <p class="helper-text">
          New here? <NuxtLink to="/register">Create an account</NuxtLink>
        </p>
      </template>

      <template v-else>
        <p>You are already logged in as <strong>{{ auth.user.name }}</strong>.</p>
        <button type="button" @click="logout">Logout</button>
      </template>
    </section>
  </div>
</template>

<script setup>
const auth = useAuthStore()
const router = useRouter()
const credentials = ref({ username: '', password: '' })
const errorMessage = ref('')

const submitLogin = async () => {
  errorMessage.value = ''
  try {
    await auth.login(credentials.value.username, credentials.value.password)
    await router.push('/')
  } catch (err) {
    errorMessage.value = err.message
  }
}

const logout = () => {
  auth.logout()
}
</script>

<style scoped>
.error-message {
  margin-top: 1rem;
  color: #b91c1c;
}
</style>