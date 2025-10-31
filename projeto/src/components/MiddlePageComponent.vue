<script setup></script>

<template>
  <div class="geral">
  <img class="cena-1" src="/public/thenotebook.png" alt="Cena Diário de uma Paixão" />
  <div class="principal">
    <img src="/public/texto-1.png" alt="Título">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </div>
  <img class="cena-2" src="/public/prettywoman.png" alt="Cena Uma Linda Mulher" />
  </div>
</template>

<style scoped>
.geral {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4vw;
  margin: 4vw 0 9vw 0;
  border-top: solid 2px black;
  padding-top: 15vh;

}
.cena-1 {
  margin-left: 4vw;
  width: 350px;
  height: auto;
}
.principal{
  margin: 0 0 0 5vw;
}
.principal img {
 margin-left: 10px;
}
.principal p {
  width: 74%;
  text-align: center;
  margin-top: 2vw;
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
}
.cena-2 {
  margin-right: 5vw;
  width: 350px;
  height: auto;
}
</style>
