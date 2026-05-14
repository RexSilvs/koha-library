<template>
  <div class="page-panel">
    <div class="page-heading">
      <h1>Dashboard</h1>
      <p>Use the navigation above to manage books, users, and borrowing records for your library.</p>
    </div>

    <div class="grid">
      <section class="card">
        <h2>Books</h2>
        <p>Track inventory, add new titles, and mark books as available or borrowed.</p>
        <NuxtLink to="/books" class="button-link">Open Books</NuxtLink>
      </section>

      <section class="card">
        <h2>Users</h2>
        <p>Manage members and their library accounts, including email and membership IDs.</p>
        <NuxtLink to="/users" class="button-link">Open Users</NuxtLink>
      </section>

      <section class="card">
        <h2>Borrowing</h2>
        <p>Record loans, return books, and review borrowing history.</p>
        <NuxtLink to="/borrowing" class="button-link">Open Borrowing</NuxtLink>
      </section>
    </div>
  </div>
</template>

<style scoped>
.button-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  width: fit-content;
  padding: 0.85rem 1.2rem;
  border-radius: 0.75rem;
  background: #2563eb;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
}

.card h2 {
  margin-top: 0;
}
</style>