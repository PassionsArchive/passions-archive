<script setup>
import { defineProps, onMounted } from 'vue'
import { useMovieStore } from '@/stores/movie'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const movieStore = useMovieStore()

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
})

const modules = [Navigation]

onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId)
})
</script>

<template>
  <div class="geral">
    <div class="content">
      <div class="poster-and-buttons">
        <img
          class="movie-poster"
          :src="`https://image.tmdb.org/t/p/w342${movieStore.currentMovie.poster_path}`"
          :alt="movieStore.currentMovie.title"
        />
        <button :class="{ active: visto }" @click="toggleVisto">JÁ VISTO</button>

        <button :class="{ active: salvo }" @click="toggleSalvo">SALVAR</button>
      </div>

      <div class="details">
        <h1>{{ movieStore.currentMovie.title }}</h1>

        <div class="info-row">
          <span class="info-item">
            <strong>ANO:</strong> {{ movieStore.currentMovie.release_date?.slice(0, 4) }}
          </span>

          <span class="info-item">
            <strong>AVALIAÇÃO:</strong> {{ movieStore.currentMovie.vote_average?.toFixed(1) }}/5
          </span>
        </div>

        <p class="tagline">{{ movieStore.currentMovie.tagline }}</p>
        <p class="overview">{{ movieStore.currentMovie.overview }}</p>

        <div class="info-row">
          <span class="info-item">
            <strong>DURAÇÃO:</strong> {{ movieStore.currentMovie.runtime }}min
          </span>

          <span class="info-item genres">
            {{ movieStore.currentMovie.genres?.map((g) => g.name.toUpperCase()).join(', ') }}
          </span>
        </div>

        <div v-if="movieStore.currentMovie.credits?.cast" class="cast-section">
          <Swiper
            :modules="modules"
            :slides-per-view="5"
            :space-between="20"
            :slides-per-group="1"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }"
            :breakpoints="{
              320: { slidesPerView: 2, spaceBetween: 16 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 24 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }"
            class="actors-swiper"
          >
            <SwiperSlide
              v-for="actor in movieStore.currentMovie.credits.cast.slice(0, 12)"
              :key="actor.id"
            >
              <div class="actor-card">
                <div class="actor-image">
                  <img
                    v-if="actor.profile_path"
                    :src="`https://image.tmdb.org/t/p/w185${actor.profile_path}`"
                    :alt="actor.name"
                  />
                  <div v-else class="no-image">
                    <span>?</span>
                  </div>
                </div>
                <p class="actor-name">{{ actor.name }}</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.geral {
  padding: 5vw 5vw 5vw 5vw;
}

.content {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.movie-poster {
  width: 280px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.details {
  flex: 1;
  color: black;
}

.details h1 {
  display: inline-block;
  padding: 8px 12px;
  margin-bottom: 15px;
  font-size: 1.3rem;
  text-transform: uppercase;
  background-color: #401818;
  color: white;
  font-weight: bold;
  border-radius: 10px;
}

.info-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.info-item strong {
  font-weight: 600;
}

.tagline {
  font-style: italic;
  color: black;
  font-weight: bold;
  margin: 1rem 0;
}

.overview {
  line-height: 1.6;
  margin: 1rem 0;
}

.genres {
  text-transform: uppercase;
  font-weight: bold;
}

.cast-section {
  margin-top: 2rem;
  padding: 0 50px;
}

.actors-swiper {
  max-width: 850px;
  position: relative;
  padding: 0;
}

.actors-swiper :deep(.swiper-wrapper) {
  align-items: center;
  padding: 0 10px;
}

.actor-card {
  text-align: center;
}

.actor-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem;
}

.actor-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  background-color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}

.actor-name {
  font-size: 0.85rem;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
}
.poster-and-buttons {
  align-items: center;
  gap: 10px;
  margin-right: 3vw;
}

button {
  margin: 10px 10px 10px 20px;
  padding: 10px 20px;
  background-color: #401818;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

</style>
