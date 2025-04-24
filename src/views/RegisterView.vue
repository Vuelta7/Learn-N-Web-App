<template>
  <div>
    <h2>Register</h2>

    <form @submit.prevent="registerUser">
      <input v-model="petname" placeholder="Pet Name" required />
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button :disabled="loading">
        {{ loading ? 'Loading...' : 'Register' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { db } from '@/firebase'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const petname = ref('')
const errorMessage = ref('')
const loading = ref(false)

const registerUser = async () => {
  if (!username.value || !password.value || !petname.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', username.value.toLowerCase()))
    const existing = await getDocs(q)

    if (!existing.empty) {
      errorMessage.value = 'Username already exists'
      loading.value = false
      return
    }

    const auth = getAuth()
    const userCred = await signInAnonymously(auth)
    const uid = userCred.user.uid

    await setDoc(doc(db, 'users', uid), {
      username: username.value.toLowerCase(),
      password: password.value,
      petName: petname.value,
      currencypoints: 0,
      hints: 0,
      selectedColor: 'f48fb1',
      streakDays: [],
      warningGiven: false,
      donation: 0,
    })

    // Save userId to localStorage
    localStorage.setItem('userId', uid)

    // Go to home
    window.location.href = '/home'
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Something went wrong.'
  }

  loading.value = false
}
</script>
