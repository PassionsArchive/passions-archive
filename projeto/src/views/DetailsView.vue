<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';

const movieStore = useMovieStore();

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId);
});
</script>

<template>
  <div class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
      />
      <div class="details">
        <h1>{{ movieStore.currentMovie.title }}</h1>
        <p>Ano: {{ movieStore.currentMovie.release_date?.slice(0, 4) }}</p>
        <p>Avaliação: {{ movieStore.currentMovie.vote_average?.toFixed(1) }}</p>
        <p>{{ movieStore.currentMovie.tagline }}</p>
        <p>{{ movieStore.currentMovie.overview }}</p>
        <p>Duração: {{ movieStore.currentMovie.runtime }} min</p>
        <p>
          {{ movieStore.currentMovie.genres?.map(g => g.name).join(', ') }}
        </p>
        <div v-if="movieStore.currentMovie.credits">
          <h3>Elenco principal:</h3>
          <ul>
            <li v-for="actor in movieStore.currentMovie.credits.cast.slice(0, 5)" :key="actor.id">
              {{ actor.name }} — {{ actor.character }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details {
  color: black;
}
</style>
