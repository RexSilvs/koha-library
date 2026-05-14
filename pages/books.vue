<template>
  <div class="page-panel">
    <div class="page-heading">
      <h1>Books Management</h1>
      <p>Maintain your library collection and keep track of availability for each title.</p>
    </div>

    <div v-if="!auth.loggedIn" class="card">
      <h2>Login Required</h2>
      <p>You must log in to view and manage books.</p>
      <NuxtLink to="/login" class="button-link">Go to Login</NuxtLink>
    </div>

    <div v-else class="grid">
      <form v-if="auth.isAdmin" class="card" @submit.prevent="addBook">
        <h2>Add a New Book</h2>
        <label>
          Title
          <input v-model="newBook.title" placeholder="The Great Gatsby" required />
        </label>
        <label>
          Author
          <input v-model="newBook.author" placeholder="F. Scott Fitzgerald" required />
        </label>
        <label>
          ISBN
          <input v-model="newBook.isbn" placeholder="9780743273565" required />
        </label>
        <button type="submit">Add Book</button>
      </form>

      <section class="card">
        <h2>Book Inventory</h2>
        <table v-if="books.length">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th v-if="auth.isAdmin">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book._id">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>
                <span :class="['status-pill', book.available ? 'status-available' : 'status-borrowed']">
                  {{ book.available ? 'Available' : 'Borrowed' }}
                </span>
              </td>
              <td v-if="auth.isAdmin">
                <button type="button" @click="deleteBook(book._id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-state">No books yet. Add a title to start managing your collection.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
const auth = useAuthStore()
const booksStore = useBooksStore()
const books = computed(() => booksStore.books)
const newBook = ref({ title: '', author: '', isbn: '' })

onMounted(() => {
  if (auth.loggedIn) {
    booksStore.fetchBooks()
  }
})

const addBook = async () => {
  await booksStore.addBook(newBook.value)
  newBook.value = { title: '', author: '', isbn: '' }
}

const deleteBook = async (id) => {
  await booksStore.deleteBook(id)
}
</script>