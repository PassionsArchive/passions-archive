<script setup></script>

<template>
  <div class="geral">
    <h2>Log-In</h2>
    <p>
      SÓ É POSSIVEL FAZER LOGIN SE VOCÊ TIVER UMA<br />
      CONTA NO TMDB
    </p>
    <form @submit.prevent="handleSubmit">
      <ul>
        <li class="email">
          <label for="email">E-MAIL:</label> <input type="text" id="email" required />
        </li>
        <li><label for="senha">SENHA:</label> <input type="text" id="senha" required /></li>
      </ul>
    </form>
    <button type="submit">ENTRAR</button>
  </div>
</template>

<style scoped>
.geral {
  align-items: center;
  margin: 4vw 0 4vw 0;
}
h2 {
  font-family: 'Tangerine', cursive;
  font-size: 5rem;
  color: #401818;
  margin-left: 45vw;
}
p {
  font-size: 1.3rem;
  text-align: center;
  color: black;
  font-weight: 900;
  margin-bottom: 3vw;
  margin-top: 5px;
  font-family: 'Playfair Display SC', serif;
}
form {
  text-align: center;
  align-items: center;
}
button {
  padding: 0.75rem 1.5rem;
  background-color: #401818;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 47vw;
  margin-block: 3vw;
}
button:hover {
  background-color: #8b3c3c;
  color: #fff;
  transform: scale(1.05);
}

ul li {
  color: black;
  font-weight: 900;
  list-style: none;
}

li.email {
  margin-block: 1vw;
}

input {
  padding: 2px 20px;
  background-color: #ebebeb;
}
</style>
