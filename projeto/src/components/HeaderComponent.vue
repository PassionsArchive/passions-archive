<script setup>
import router from '@/router'
</script>

<template>
  <img src="/public/logo-preta.png" alt="Logo Passion's Archive" @click="router.push('/')" />
  <nav>
    <ul>
      <ul>
        <li><router-link to="/">INÍCIO</router-link></li>
        <li><router-link to="/salvos">SALVOS</router-link></li>
        <li><router-link to="/final">COMO ESTÁ SEU HUMOR?</router-link></li>
        <li><router-link to="/assistidos">ASSISTIDOS</router-link></li>
        <li><router-link to="/perfil">PERFIL</router-link></li>
      </ul>
    </ul>
  </nav>
</template>

<style scoped>
img {
  display: block;
  margin: 0 auto;
  width: 350px;
  height: auto;
  margin-top: 1vw;
}

nav {
  margin-top: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 0;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  height: 10vh;
}

ul {
  list-style: none;
  display: flex;
  gap: 40px;
  padding: 0;
  margin: 0;
}

li a,
li router-link {
  text-decoration: none;
  font-size: 1rem;
  color: black;
  padding: 4px 10px;
  border: 1.5px solid transparent;
  transition: all 0.3s ease;
  border-radius: 2px;
}

li a.active,
li router-link.active {
  border: 1.5px solid black;
}

li a:hover,
li router-link:hover {
  border: 1.5px solid black;
}

</style>
