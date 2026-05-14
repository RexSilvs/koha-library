<template>
  <div class="page-panel">
    <div class="page-heading">
      <h1>Users Management</h1>
      <p>Register new members and maintain active library accounts with membership details.</p>
    </div>

    <div v-if="!auth.loggedIn" class="card">
      <h2>Login Required</h2>
      <p>You must log in to view user information.</p>
      <NuxtLink to="/login" class="button-link">Go to Login</NuxtLink>
    </div>

    <div v-else class="grid">
      <form v-if="auth.isAdmin" class="card" @submit.prevent="addUser">
        <h2>Add a New User</h2>
        <label>
          Name
          <input v-model="newUser.name" placeholder="Jane Doe" required />
        </label>
        <label>
          Email
          <input v-model="newUser.email" type="email" placeholder="jane@example.com" required />
        </label>
        <label>
          Membership ID
          <input v-model="newUser.membershipId" placeholder="MEM-001" required />
        </label>
        <label>
          Password
          <input v-model="newUser.password" type="password" placeholder="Secret password" required />
        </label>
        <button type="submit">Add User</button>
      </form>

      <section class="card">
        <h2>{{ auth.isAdmin ? 'Members' : 'My Account' }}</h2>
        <table v-if="auth.isAdmin ? users.length : currentUser">
          <thead v-if="auth.isAdmin">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Membership ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="auth.isAdmin" v-for="user in users" :key="user._id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.membershipId }}</td>
              <td>
                <button type="button" @click="deleteUser(user._id)">Delete</button>
              </td>
            </tr>
            <tr v-else>
              <td>{{ currentUser.name }}</td>
              <td>{{ currentUser.email }}</td>
              <td>{{ currentUser.membershipId }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-state">No user data is available.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
const auth = useAuthStore()
const usersStore = useUsersStore()
const users = computed(() => usersStore.users)
const currentUser = computed(() => users.value.find(u => u._id === auth.user?._id))
const newUser = ref({ name: '', email: '', membershipId: '', password: '' })

onMounted(() => {
  if (auth.loggedIn) {
    usersStore.fetchUsers()
  }
})

const addUser = async () => {
  await usersStore.addUser(newUser.value)
  newUser.value = { name: '', email: '', membershipId: '', password: '' }
}

const deleteUser = async (id) => {
  await usersStore.deleteUser(id)
}
</script>