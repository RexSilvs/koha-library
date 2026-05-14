<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <p class="eyebrow">Library Portal</p>
        <h1>Koha-inspired Library Management</h1>
        <p class="subtitle">Manage books, users, and borrowing records with a clean Nuxt 3 interface.</p>
      </div>
      <div class="header-actions">
        <nav class="site-nav">
          <NuxtLink to="/" class="nav-link">Dashboard</NuxtLink>
          <NuxtLink to="/books" class="nav-link">Books</NuxtLink>
          <NuxtLink to="/users" class="nav-link">Users</NuxtLink>
          <NuxtLink to="/borrowing" class="nav-link">Borrowing</NuxtLink>
        </nav>
        <div class="user-status">
          <template v-if="auth.loggedIn">
            <span>{{ auth.user.role === 'admin' ? 'Admin' : 'User' }}: {{ auth.user.name }}</span>
            <button type="button" class="logout-button" @click="logout">Logout</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
          </template>
        </div>
      </div>
    </header>

    <main class="app-content">
      <NuxtPage />
    </main>

    <footer class="app-footer">
      <p>Built with Nuxt 3, Pinia, Express, and MongoDB.</p>
    </footer>
  </div>
</template>

<script setup>
const auth = useAuthStore()

onMounted(() => {
  auth.loadSession()
})

const logout = () => {
  auth.logout()
}
</script>

<style>
:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #111827;
  background: #f8fafc;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
}

body {
  background: #f8fafc;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1.5rem;
  background: #1f2937;
  color: #f9fafb;
}

.eyebrow {
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #93c5fd;
  font-size: 0.75rem;
}

.subtitle {
  margin: 0.75rem 0 0;
  max-width: 42rem;
  color: #d1d5db;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.nav-link {
  color: #f8fafc;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 9999px;
  background: rgba(255,255,255,0.08);
  transition: background 0.2s ease;
}

.nav-link:hover {
  background: rgba(255,255,255,0.18);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #d1d5db;
}

.logout-button {
  border: 1px solid rgba(255,255,255,0.18);
  background: transparent;
  color: #f8fafc;
  padding: 0.65rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.logout-button:hover {
  background: rgba(255,255,255,0.12);
}

.app-content {
  flex: 1;
  width: min(1200px, calc(100% - 4rem));
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.app-footer {
  padding: 1.5rem 2rem;
  background: #111827;
  color: #d1d5db;
  text-align: center;
}

.page-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-heading {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.page-heading h1 {
  margin: 0;
  font-size: clamp(2rem, 2.25vw, 2.5rem);
}

.page-heading p {
  margin: 0;
  color: #4b5563;
  max-width: 40rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 10px 30px -20px rgba(15, 23, 42, 0.25);
}

form {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.95rem;
  color: #374151;
}

input,
select,
button {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  padding: 0.9rem 1rem;
  font: inherit;
}

input:focus,
select:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
}

button {
  background: #2563eb;
  color: #ffffff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background: #1d4ed8;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 0.95rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

th {
  color: #374151;
  font-weight: 700;
}

tr:nth-child(even) {
  background: #f8fafc;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-available {
  background: #d1fae5;
  color: #166534;
}

.status-borrowed {
  background: #fee2e2;
  color: #991b1b;
}

.empty-state {
  color: #6b7280;
  padding: 1rem 0;
}

@media (max-width: 640px) {
  .app-header {
    padding: 1.5rem 1rem 1rem;
  }

  .app-content {
    width: min(100%, calc(100% - 2rem));
  }
}
</style>
