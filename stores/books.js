import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: []
  }),
  actions: {
    async fetchBooks() {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/books`)
      this.books = await response.json()
    },
    async addBook(book) {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      })
      const newBook = await response.json()
      this.books.push(newBook)
    },
    async updateBook(id, book) {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      })
      const updatedBook = await response.json()
      const index = this.books.findIndex(b => b._id === id)
      if (index !== -1) this.books[index] = updatedBook
    },
    async deleteBook(id) {
      const config = useRuntimeConfig()
      await fetch(`${config.public.apiBase}/api/books/${id}`, {
        method: 'DELETE'
      })
      this.books = this.books.filter(b => b._id !== id)
    }
  }
})