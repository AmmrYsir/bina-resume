<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- Navigation -->
    <nav class="glass-panel navbar">
      <div class="logo">ResumeAI</div>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link" active-class="active">Editor</RouterLink>
        <RouterLink to="/catalogue" class="nav-link" active-class="active">Catalogue</RouterLink>
        <RouterLink to="/profile" class="nav-link" active-class="active">Profile</RouterLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  margin: 1rem 2rem 0;
  height: var(--header-height);
  z-index: 10;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent double scrollbars */
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .navbar {
    margin: 0;
    border-radius: 0;
    padding: 1rem;
  }

  .nav-links {
    gap: 1rem;
    font-size: 0.9rem;
  }
}
</style>
