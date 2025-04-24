<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button :disabled="loading">{{ loading ? 'Loading...' : 'Login' }}</button>
      <p v-if="error" style="color: red">{{ error }}</p>
    </form>
  </div>

  <router-link to="/home">
    <button>Go to home</button>
  </router-link>
  <router-link to="/login">
    <button>Go to login</button>
  </router-link>
  <router-link to="/register">
    <button>Go to register</button>
  </router-link>
  <router-link to="/start">
    <button>Go to start</button>
  </router-link>
  <router-link to="/">
    <button>Go to splash</button>
  </router-link>
</template>

<script setup>
import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function loginUser() {
  loading.value = true
  error.value = ''

  const usersRef = collection(db, 'users')
  const q = query(
    usersRef,
    where('username', '==', username.value.toLowerCase()),
    where('password', '==', password.value),
  )
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    const user = snapshot.docs[0]
    localStorage.setItem('userId', user.id)
    // Optional: redirect to home
    window.location.href = '/home'
  } else {
    error.value = 'Invalid username or password.'
  }

  loading.value = false
}
</script>
