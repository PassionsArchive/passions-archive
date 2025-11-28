<script setup>
// import LineBubbles from './LineBubbles.vue';

</script>

<template>
  <div class="geral">
    <div class="lado-esquerdo">
      <img class="cena-1" src="/public/thenotebook.png" alt="Cena Diário de uma Paixão" />
    </div>
    <div class="principal">
      <img class="titulo" src="/public/texto-1.png" alt="Título" />
      <p>
       Sabemos que o filme ideal é aquele que se encaixa perfeitamente no seu dia. É por isso que o Passion's Archive torna tudo simples: abaixo, você pode selecionar o humor exato que está sentindo e com base na sua escolha, nosso algoritmo selecionará as histórias de amor que mais combinam com o seu estado de espírito. Podemos sugerir um drama para te fazer chorar ou uma comédia reconfortante para te animar. Encontre o refúgio cinematográfico que você precisa!
      </p>
    </div>
    <div class="lado-direito">
      <img class="cena-2" src="/public/prettywoman.png" alt="Cena Uma Linda Mulher" />
    </div>
  </div>
</template>

<style scoped>
.geral {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4vw;
  margin: 0vw 0 9vw 0;
  border-top: solid 2px black;
  padding-top: 15vh;
}

.lado-esquerdo {
  display: flex;
  flex-direction: column;
  gap: 2vw ;
  align-items: center;
}
.cena-1 {
  margin-left: 7vw;
  margin-right: 3vw;
  width: 350px;
  height: auto;
}
.principal {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.principal p {
  width: 70%;
  text-align: center;
  margin-top: 2vw;
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
}

.lado-direito {
  display: flex;
  flex-direction: column;
  gap: 2vw ;
}

.cena-2 {
  margin-right: 7vw;
  margin-left: 3vw;
  width: 350px;
  height: auto;
}
.titulo {
  margin-bottom: 2vw;
}
</style>
