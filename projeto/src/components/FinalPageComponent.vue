<script setup></script>

<template>
  <div class="geral">
    <img src="/public/texto-2.png" alt="Título" />
    <div class="listas">
      <ul class="div-1">
        <li><button>ROMÂNTICO</button></li>
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
  border-top: 50px solid #401818;
}
.listas {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15vw;
  margin-top: 4vw;
}
.div-1, .div-2 {
  list-style: none;
}

</style>
