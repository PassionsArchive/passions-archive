<script setup>
</script>

<template>
  <div>
    <img class="cenas" src="/public/Group 6.png" alt="Cenas de Filmes" />

    <div class="logo-container">
      <img class="logo" src="/public/logo-vermelha.png" alt="Logo Passion's Archive" @click="router.push('/')"/>
    </div>
    <nav>
      <ul>
        <li @click="router.push('/')"><a href="#">INÍCIO</a></li>
        <li><a href="#">SALVOS</a></li>
        <li><a href="#">COMO ESTÁ SEU HUMOR?</a></li>
        <li><a href="#">ASSISTIDOS</a></li>
        <li><a href="#">PERFIL</a></li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
div {
  background-color: #401818;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 80px;
  color: white;
  gap: 40px;
}
nav {
  width: 100%;
  text-align: center;
  margin-left: 10vw;
  margin-top: 13px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: 400;
}

nav ul li a:active {
  font-weight: bold;
}
.cenas {
  margin-left: 4vw;
  width: 180px;
  height: auto;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 0 0 15vw;
}

</style>
