<script setup>
import router from '@/router';
</script>

<template>
  <div class="geral">
    <img src="/public/texto-2.png" alt="Título" />
    <div class="listas">
      <ul class="div-1">
        <li @click="router.push('/emotions')"><button>ROMÂNTICO</button></li>
        <li><button>TRISTE</button></li>
        <li><button>ESTRESSADO</button></li>
      </ul>
      <ul class="div-2">
        <li><button>PENSATIVO</button></li>
        <li><button>FELIZ</button></li>
        <li><button>ENTEDIADO</button></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.geral {
  border-top: 70px solid #401818;
  text-align: center;
  padding: 4vw 0 8vw 0;
}

.geral img {
  display: block;
  margin: 0 auto;
}

.listas {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
  margin-top: 3vw;
}

.listas ul {
  list-style: none;
  padding: 2vw 4vw 0 4vw;
}

.listas li {
  margin-bottom: 1.5vw;
}

button {
  border: 2px solid black;
  background: transparent;
  font-size: 1.5rem;
  padding: 0.8vw 2.5vw;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 15vw;
  text-align: center;
}

button:hover {
  background-color: #401818;
  color: #fff;
  transform: scale(1.05);
}

</style>
