<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import axios from 'axios'
import { ref } from 'vue'

const { logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0()
const profile = ref(null)

const getProfile = async () => {
  try {
    const token = await getAccessTokenSilently({
      detailedResponse: true,
    })

    const res = await axios.get('http://localhost:3000/profile', {
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
    profile.value = res.data
  } catch (error) {
    console.log(error);

    console.log('token invalid')
  }
}
</script>

<template>
  <div>
    <!-- <button v-if="!isAuthenticated">Login</button> -->
    <button v-if="isAuthenticated" @click="() => logout()">Logout</button>
    <div v-if="isAuthenticated">
      <p>Welcome, {{ user?.name }}</p>
      <button @click="getProfile">Get Profile</button>
      <p v-if="profile">{{ profile }}</p>
    </div>
    <button class="mt-10" @click="getProfile">Get Profile</button>
  </div>
</template>
