<script setup></script>

<template>
  <div class="geral">
    <h1>Perfil</h1>
    <div class="listas">
      <ul class="perfil-info">
        <li>NOME DE USUÁRIO: {{ usuario }}</li>
        <li>E-MAIL: {{ email }}</li>
        <li class="sair"><button>SAIR</button></li>
      </ul>
      <ul class="contagens">
        <li><button>SALVOS (contador)</button></li>
        <li><button>ASSISTIDOS (contador)</button></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.geral {
  align-items: center;
  margin: 4vw 0 4vw 0;
}

h1 {
  text-align: center;
  font-size: 4rem;
  color: #401818;
  font-family: 'Tangerine', cursive;
  font-weight: 700;
}

.listas {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20vw;
  margin: 4vw 0 4vw 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.perfil-info {
  text-align: left;
}

.perfil-info li {
  margin-bottom: 8px;
  font-size: 1.2rem;
  color: black;
  font-weight: bold;
}

.sair button {
  background-color: #401818;
  color: #fff;
  border: none;
  padding: 0.8vw 2vw;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 3vw;
}

.sair button:hover {
  background-color: #8b3c3c;
  transform: scale(1.05);
}

.contagens {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
}

.contagens button {
  border: 2px solid black;
  background: transparent;
  padding: 1vw 2.5vw;
  font-weight: 600;
  border-radius: 10px;
  width: 12vw;
}
</style>
