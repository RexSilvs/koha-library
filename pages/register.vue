<template>
  <div class="page-panel">
    <div class="page-heading">
      <h1>Register</h1>
      <p>Create a library user account to borrow books and access your profile.</p>
    </div>

    <section class="card">
      <template v-if="!auth.loggedIn">
        <form @submit.prevent="submitRegistration">
          <label>
            Full Name
            <input v-model="form.name" placeholder="Jane Doe" required />
          </label>
          <label>
            Email
            <input type="email" v-model="form.email" placeholder="jane@example.com" required />
          </label>
          <label>
            Membership ID
            <input v-model="form.membershipId" placeholder="MEM-001" required />
          </label>
          <label>
            Password
            <input type="password" v-model="form.password" placeholder="Choose a password" required />
          </label>
          <button type="submit">Register</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
        <p class="helper-text">
          Already have an account? <NuxtLink to="/login">Login here</NuxtLink>
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
const form = ref({ name: '', email: '', membershipId: '', password: '' })
const errorMessage = ref('')

const submitRegistration = async () => {
  errorMessage.value = ''
  try {
    await auth.register(form.value.name, form.value.email, form.value.membershipId, form.value.password)
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

.helper-text {
  margin-top: 1rem;
  color: #6b7280;
}
</style>