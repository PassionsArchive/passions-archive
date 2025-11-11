<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'

const route = useRoute()
const router = useRouter()
const emotion = ref(route.query.emotion || 'ROMÂNTICO')
const movies = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const fetchMovies = async (page = 1) => {
  try {
    if (page === 1) {
      loading.value = true
    } else {
      loadingMore.value = true
    }
    error.value = null

    const response = await api.get('discover/movie', {
      params: {
        with_genres: '10749',
        'vote_count.gte': 100,
        language: 'pt-BR',
        page: page,
      },
    })

    if (page === 1) {
      movies.value = response.data.results
    } else {
      movies.value = [...movies.value, ...response.data.results]
    }

    currentPage.value = page
    totalPages.value = response.data.total_pages
  } catch (error) {
    error.value = 'Erro ao carregar filmes. Tente novamente.'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  if (currentPage.value < totalPages.value && !loadingMore.value) {
    fetchMovies(currentPage.value + 1)
  }
}

const getImageUrl = (path) => {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : '/public/placeholder.png'
}

const toggleFavorite = (movie) => {
  console.log('Toggle favorite:', movie.title)
}

const toggleWatched = (movie) => {
  console.log('Toggle watched:', movie.title)
}

onMounted(() => {
  fetchMovies()
})
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Estou me sentindo</h1>
      <h2>{{ emotion }}</h2>
    </div>

    <div v-if="loading" class="loading">Carregando filmes...</div>

    <div v-else-if="error" class="error">
      {{ error }}
      <button @click="fetchMovies(1)">Tentar novamente</button>
    </div>

    <div v-else class="movies-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <div class="movie-poster">
          <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
          <div class="movie-overlay">
            <div class="icon-buttons">
              <button class="icon-btn favorite" @click="toggleFavorite(movie)" title="Salvar">
                <i class="fa-solid fa-heart" style="color: #401818"></i>
              </button>
              <button
                class="icon-btn watched"
                @click="toggleWatched(movie)"
                title="Marcar como assistido"
              >
                <i class="fa-solid fa-circle-check" style="color: #401818"></i>
              </button>
            </div>
            <button class="see-more-btn" @click="router.push(`/movie/${movie.id}`)">
              Ver mais
            </button>
          </div>
        </div>
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <div class="movie-meta">
            <span class="rating">★ {{ movie.vote_average.toFixed(1) }}</span>
            <span class="year">{{ movie.release_date?.split('-')[0] }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && !error && currentPage < totalPages" class="load-more-container">
      <button class="load-more-btn" @click="loadMore" :disabled="loadingMore">
        {{ loadingMore ? 'Carregando...' : 'Carregar mais filmes' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 3vw 8vw 8vw 8vw;
}

.header {
  text-align: center;
  margin-bottom: 3vw;
}

.header h1 {
  font-family: 'Tangerine', cursive;
  font-size: 5.5rem;
  color: black;
  margin-bottom: 0;
  margin-bottom: 0;
  line-height: 1;
}

.header h2 {
  font-family: 'Playfair Display SC', serif;
  font-size: 2.3rem;
  color: #401818;
  margin: 0;
  margin-top: -1.5rem;
  font-weight: 570;
}

.loading,
.error {
  text-align: center;
  padding: 4vw;
  font-size: 1.2rem;
  font-weight: bold;
}

.error button {
  margin-top: 2vw;
  padding: 0.75rem 1.5rem;
  background-color: #401818;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.error button:hover {
  background-color: #8b3c3c;
  transform: scale(1.05);
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2vw;
  margin-top: 2vw;
  max-width: 1400px;
  margin: 0 auto;
}

.movie-card {
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-8px);
}

.movie-poster {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  aspect-ratio: 2 / 3;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .movie-overlay {
  opacity: 1;
}

.icon-buttons {
  display: flex;
  gap: 1rem;
}

.icon-btn {
  background: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.icon-btn:hover {
  transform: scale(1.15);
  background-color: #f8f8f8;
}

.icon-btn i {
  font-size: 1.5rem;
}

.see-more-btn {
  background-color: white;
  color: #401818;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.see-more-btn:hover {
  transform: scale(1.15);
  background-color: #f8f8f8;
}

.movie-info {
  padding: 0.8vw 0.3vw 0 0.3vw;
}

.movie-info h3 {
  font-size: 0.95rem;
  margin: 0 0 0.4vw 0;
  color: black;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
}

.rating {
  color: #f5c518;
  font-weight: bold;
}

.year {
  color: #999;
}

.load-more-container {
  text-align: center;
  margin-top: 3vw;
  padding-bottom: 2vw;
}

.load-more-btn {
  padding: 1rem 2.5rem;
  background-color: #401818;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(64, 24, 24, 0.3);
}

.load-more-btn:hover:not(:disabled) {
  background-color: #8b3c3c;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 24, 24, 0.4);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
