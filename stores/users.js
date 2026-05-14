import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/users`)
      this.users = await response.json()
    },
    async addUser(user) {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const newUser = await response.json()
      this.users.push(newUser)
    },
    async updateUser(id, user) {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const updatedUser = await response.json()
      const index = this.users.findIndex(u => u._id === id)
      if (index !== -1) this.users[index] = updatedUser
    },
    async deleteUser(id) {
      const config = useRuntimeConfig()
      await fetch(`${config.public.apiBase}/api/users/${id}`, {
        method: 'DELETE'
      })
      this.users = this.users.filter(u => u._id !== id)
    }
  }
})