<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  bookReviews,
  getFeaturedReviews,
  getReviewsByBook,
  getReviewsBySource,
} from '../data/bookReviews.js'

const currentSlide = ref(0)
let intervalId = null

const bookCovers = ['AstridCover.jpg', 'Wolzen1.jpg', 'Wolzen2.jpg', 'Wolzen3.jpg']

// Review filtering state
const selectedFilter = ref('featured')
const showAllReviews = ref(false)
const reviewsToShow = ref(3)

// Get unique book titles and sources for filter options
const bookTitles = [...new Set(bookReviews.map((review) => review.book))]
const reviewSources = [...new Set(bookReviews.map((review) => review.source))]

// Computed property for filtered reviews
const filteredReviews = computed(() => {
  let reviews = []

  switch (selectedFilter.value) {
    case 'featured':
      reviews = getFeaturedReviews()
      break
    case 'all':
      reviews = bookReviews
      break
    default:
      // Check if it's a book filter
      if (bookTitles.includes(selectedFilter.value)) {
        reviews = getReviewsByBook(selectedFilter.value)
      }
      // Check if it's a source filter
      else if (reviewSources.includes(selectedFilter.value)) {
        reviews = getReviewsBySource(selectedFilter.value)
      } else {
        reviews = getFeaturedReviews()
      }
  }

  // Limit reviews if not showing all
  return showAllReviews.value ? reviews : reviews.slice(0, reviewsToShow.value)
})

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bookCovers.length
}

// Generate star display for ratings
const getStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

// Handle filter changes
const changeFilter = (filter) => {
  selectedFilter.value = filter
  showAllReviews.value = false
  reviewsToShow.value = 3
}

// Show more reviews
const showMoreReviews = () => {
  if (reviewsToShow.value >= filteredReviews.value.length) {
    showAllReviews.value = true
  } else {
    reviewsToShow.value += 3
  }
}

// Check if there are more reviews to show
const hasMoreReviews = computed(() => {
  const totalReviews =
    selectedFilter.value === 'featured'
      ? getFeaturedReviews().length
      : selectedFilter.value === 'all'
        ? bookReviews.length
        : bookTitles.includes(selectedFilter.value)
          ? getReviewsByBook(selectedFilter.value).length
          : reviewSources.includes(selectedFilter.value)
            ? getReviewsBySource(selectedFilter.value).length
            : getFeaturedReviews().length

  return !showAllReviews.value && reviewsToShow.value < totalReviews
})

onMounted(() => {
  intervalId = setInterval(nextSlide, 2500)
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
        <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(cover, index) in bookCovers" :key="index" class="carousel-slide">
            <img :src="cover" :alt="`Book Cover ${index + 1}`" class="book-cover" />
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

    <!-- Reviews Section -->
    <section class="reviews-section">
      <h3>What Readers Are Saying</h3>

      <!-- Review Filters -->
      <div class="review-filters">
        <button
          :class="['filter-btn', { active: selectedFilter === 'featured' }]"
          @click="changeFilter('featured')"
        >
          Featured Reviews
        </button>
        <button
          :class="['filter-btn', { active: selectedFilter === 'all' }]"
          @click="changeFilter('all')"
        >
          All Reviews
        </button>
        <div class="filter-dropdown">
          <select
            v-model="selectedFilter"
            @change="changeFilter(selectedFilter)"
            class="book-filter"
          >
            <option value="featured">Featured Reviews</option>
            <option value="all">All Reviews</option>
            <optgroup label="By Book">
              <option v-for="book in bookTitles" :key="book" :value="book">{{ book }}</option>
            </optgroup>
            <optgroup label="By Source">
              <option v-for="source in reviewSources" :key="source" :value="source">
                {{ source }}
              </option>
            </optgroup>
          </select>
        </div>
      </div>

      <div class="reviews-grid">
        <div v-for="review in filteredReviews" :key="review.id" class="review-card">
          <div class="review-header">
            <div class="rating">
              <span class="stars">{{ getStars(review.rating) }}</span>
              <span class="rating-number">{{ review.rating }}/5</span>
            </div>
            <div class="review-source">
              <span class="book-title">{{ review.book }}</span>
              <span class="source">{{ review.source }}</span>
            </div>
          </div>
          <p class="review-text">{{ review.text }}</p>
          <div class="reviewer">
            <span class="reviewer-name">— {{ review.reviewer }}</span>
          </div>
        </div>
      </div>

      <!-- Show More Button -->
      <div v-if="hasMoreReviews" class="show-more-container">
        <button @click="showMoreReviews" class="show-more-btn">Show More Reviews</button>
      </div>

      <!-- Reviews Summary -->
      <div class="reviews-summary">
        <p>
          Showing {{ filteredReviews.length }} of
          {{
            selectedFilter === 'featured'
              ? getFeaturedReviews().length
              : selectedFilter === 'all'
                ? bookReviews.length
                : bookTitles.includes(selectedFilter)
                  ? getReviewsByBook(selectedFilter).length
                  : reviewSources.includes(selectedFilter)
                    ? getReviewsBySource(selectedFilter).length
                    : getFeaturedReviews().length
          }}
          reviews
        </p>
      </div>
    </section>

    <p>
      Find all of my current releases as well as works in progress here:
      <a
        href="https://reamstories.com/page/m3bk90e3vp/public"
        alt="Ream Stories page"
        target="_blank"
        >Ream Stories.</a
      >
    </p>
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

  .reviews-section {
    margin: 40px 0 30px 0;
  }

  .reviews-section h3 {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }

  .review-filters {
    flex-direction: column;
    gap: 10px;
  }

  .filter-dropdown {
    margin-left: 0;
  }

  .reviews-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .review-card {
    padding: 20px;
    max-width: 100%;
  }
 
  .review-card {
    box-sizing: border-box;
  }

  .review-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .review-source {
    text-align: left;
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

  .reviews-section h3 {
    font-size: 1.6rem;
  }

  .review-card {
    padding: 18px;
  }

  .stars {
    font-size: 1rem;
  }

  .filter-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
