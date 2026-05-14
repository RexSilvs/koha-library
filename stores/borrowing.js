import { defineStore } from 'pinia'

export const useBorrowingStore = defineStore('borrowing', {
  state: () => ({
    borrowings: []
  }),
  actions: {
    async fetchBorrowings() {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/borrowing`)
      this.borrowings = await response.json()
    },
    async borrowBook(bookId, userId) {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/borrowing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, userId })
      })
      const newBorrowing = await response.json()
      this.borrowings.push(newBorrowing)
    },
    async returnBook(id) {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/borrowing/${id}/return`, {
        method: 'PUT'
      })
      const updatedBorrowing = await response.json()
      const index = this.borrowings.findIndex(b => b._id === id)
      if (index !== -1) this.borrowings[index] = updatedBorrowing
    }
  }
})