<script setup></script>

<template>
  <div class="geral">
    <div class="texto">
      <h1>Descubra a <span>história de amor</span> perfeita para você!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris.
      </p>
      <button>LOG-IN</button>
    </div>
    <div class="imagem">
      <img src="/public/prideandprejudice.png" alt="Orgulho e Preconceito" />
    </div>
  </div>
</template>

<style scoped>
.geral {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 4vw 0 4vw 0;
}
.texto {
  width: 35%;
  color: black;
  margin-right: 7vw;
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
  width: 88%;
  margin-bottom: 2vw;
}
.texto button {
  padding: 0.75rem 1.5rem;
  background-color: #401818;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin: 0 10vw 0 10vw;
}
</style>
