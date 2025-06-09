<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const currentSlide = ref(0)
let intervalId = null

// Replace these with your actual book cover image paths
const bookCovers = ['Wolzen1.jpg', 'Wolzen2.jpg', 'Wolzen3.jpg']

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bookCovers.length
}

onMounted(() => {
  // Auto-advance carousel every 2 seconds
  intervalId = setInterval(nextSlide, 3000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <main>
    <h2>Welcome to my author page</h2>

    <div class="carousel-container">
      <div class="carousel">
        <div 
          class="carousel-track" 
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div 
            v-for="(cover, index) in bookCovers" 
            :key="index"
            class="carousel-slide"
          >
            <img 
              :src="cover" 
              :alt="`Book Cover ${index + 1}`"
              class="book-cover"
            />
          </div>
        </div>
      </div>
      
      <!-- Carousel indicators -->
      <div class="carousel-indicators">
        <button
          v-for="(cover, index) in bookCovers"
          :key="index"
          :class="['indicator', { active: currentSlide === index }]"
          @click="currentSlide = index"
        ></button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 80vh;
}

h2 {
  margin-bottom: 40px;
  color: #333;
  font-size: 2.5rem;
  text-align: center;
}

.carousel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 100%;
}

.carousel {
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.carousel-track {
  display: flex;
  transition: transform 0.8s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  width: 100%;
  flex-shrink: 0;
}

.book-cover {
  width: 100%;
  height: 500px;
  object-fit: contain;
  display: block;
}

.carousel-indicators {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #b366ff;
}

.indicator:hover {
  background-color: #999;
}

/* Responsive design */
@media (max-width: 768px) {
  .carousel-container {
    max-width: 300px;
  }
  
  .book-cover {
    height: 400px;
  }
  
  h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    max-width: 250px;
  }
  
  .book-cover {
    height: 350px;
  }
  
  h2 {
    font-size: 1.8rem;
  }
}
</style>