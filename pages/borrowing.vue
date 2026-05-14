<template>
  <div class="page-panel">
    <div class="page-heading">
      <h1>Borrowing Records</h1>
      <p>Issue books to members, return titles, and monitor your current loans.</p>
    </div>

    <div v-if="!auth.loggedIn" class="card">
      <h2>Login Required</h2>
      <p>You must log in to borrow books and view loan records.</p>
      <NuxtLink to="/login" class="button-link">Go to Login</NuxtLink>
    </div>

    <div v-else class="grid">
      <form class="card" @submit.prevent="borrowBook">
        <h2>Loan a Book</h2>
        <label>
          Book
          <select v-model="selectedBook" required>
            <option value="">Select available book</option>
            <option v-for="book in availableBooks" :key="book._id" :value="book._id">{{ book.title }}</option>
          </select>
        </label>
        <label>
          User
          <template v-if="auth.isAdmin">
            <select v-model="selectedUser" required>
              <option value="">Select user</option>
              <option v-for="user in users" :key="user._id" :value="user._id">{{ user.name }}</option>
            </select>
          </template>
          <template v-else>
            <input type="text" :value="auth.user.name" disabled />
          </template>
        </label>
        <button type="submit">Borrow Book</button>
      </form>

      <section class="card">
        <h2>Current Loans</h2>
        <table v-if="displayedBorrowings.length">
          <thead>
            <tr>
              <th>Book</th>
              <th>Borrower</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in displayedBorrowings" :key="record._id">
              <td>{{ record.book.title }}</td>
              <td>{{ record.user.name }}</td>
              <td>{{ new Date(record.borrowDate).toLocaleDateString() }}</td>
              <td>
                <span :class="['status-pill', record.returned ? 'status-available' : 'status-borrowed']">
                  {{ record.returned ? 'Returned' : 'Borrowed' }}
                </span>
              </td>
              <td>
                <button v-if="!record.returned" type="button" @click="returnBook(record._id)">Return</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-state">No borrowing records available.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
const auth = useAuthStore()
const borrowingStore = useBorrowingStore()
const booksStore = useBooksStore()
const usersStore = useUsersStore()

const borrowings = computed(() => borrowingStore.borrowings)
const availableBooks = computed(() => booksStore.books.filter(b => b.available))
const users = computed(() => usersStore.users)
const selectedBook = ref('')
const selectedUser = ref('')

const displayedBorrowings = computed(() => {
  if (auth.isAdmin) {
    return borrowings.value
  }
  return borrowings.value.filter(record => record.user._id === auth.user?._id)
})

onMounted(async () => {
  if (auth.loggedIn) {
    await booksStore.fetchBooks()
    await usersStore.fetchUsers()
    await borrowingStore.fetchBorrowings()
    if (!auth.isAdmin) {
      selectedUser.value = auth.user._id
    }
  }
})

const borrowBook = async () => {
  const userId = auth.isAdmin ? selectedUser.value : auth.user._id
  await borrowingStore.borrowBook(selectedBook.value, userId)
  selectedBook.value = ''
  if (auth.isAdmin) {
    selectedUser.value = ''
  }
  await booksStore.fetchBooks()
}

const returnBook = async (id) => {
  await borrowingStore.returnBook(id)
  await booksStore.fetchBooks()
}
</script>