<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, logout } = useAuth0()
const login = () => loginWithRedirect()
</script>

<template>
  <nav>
    <RouterLink to="/" class="p-5 border-1">Home</RouterLink>
    <RouterLink to="/about" class="p-5 border-1">About</RouterLink>
    <RouterLink to="/login" class="p-5 border-1" @click="login">Login</RouterLink>
    <RouterLink to="/logout" class="p-5 border-1" @click="logout">Logout</RouterLink>
  </nav>
  <div class="text-center">
    <RouterView />
  </div>
</template>

<style scoped></style>
