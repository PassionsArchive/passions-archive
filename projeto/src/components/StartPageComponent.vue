<script setup>
import router from '@/router'
</script>

<template>
  <div class="geral">
    <div class="texto">
      <LineBubbles />
      <div>
        <h1>Descubra a <span>história de amor</span> perfeita para você!</h1>
        <p>
          Sabemos que um bom filme pode ser o remédio para um dia cansativo. Encontrar uma história
          que se harmonize com o seu estado de espírito é essencial para relaxar, descontrair e
          espairecer. Descubra o que a sua alma está pedindo hoje!
        </p>
        <button @click="router.push('/login')">LOG-IN</button>
      </div>
      <LineBubbles bottom="true"/>
    </div>
    <div class="imagem">
      <img src="/public/prideandprejudice.png" alt="Orgulho e Preconceito" />
    </div>
  </div>
  <MiddlePageComponent />
</template>

<style scoped>
.geral {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 2rem;
  margin: 4vw 0 4vw 0;
  padding-bottom: 15vh;
  border-bottom: 2px solid black;
}
.texto {
  width: 38%;
  color: black;
  margin-right: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.texto h1 {
  font-size: 2.5rem;
  font-family: 'Playfair Display SC', serif;
  line-height: 0.8;
  margin-bottom: 2vw;
}
.texto h1 span {
  color: #401818;
  font-family: 'Tangerine', cursive;
  font-size: 5rem;
}
.texto p {
  font-weight: bold;
  width: 92%;
  font-size: 1rem;
  margin-bottom: 2vw;
}
.texto button {
  padding: 0.75rem 1.5rem;
  background-color: #401818;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: bold;
  margin: 0 10vw 0 10vw;
}

button:hover {
  background-color: #8b3c3c;
  color: #fff;
  transform: scale(1.05);
}
</style>
