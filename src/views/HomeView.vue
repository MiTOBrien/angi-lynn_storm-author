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

const bookCovers = ['Wolzen1.jpg', 'Wolzen2.jpg', 'Wolzen3.jpg']

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

/* Reviews Section Styles */
.reviews-section {
  width: 100%;
  max-width: 1200px;
  margin: 60px 0 40px 0;
  padding: 0 20px;
}

.reviews-section h3 {
  text-align: center;
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}

/* Review Filters */
.review-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  border: 2px solid #b366ff;
  background: white;
  color: #b366ff;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  background: #b366ff;
  color: white;
}

.filter-btn.active {
  background: #b366ff;
  color: white;
}

.filter-dropdown {
  margin-left: 10px;
}

.book-filter {
  padding: 8px 15px;
  border: 2px solid #b366ff;
  border-radius: 20px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 0.9rem;
}

.book-filter:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(179, 102, 255, 0.3);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  justify-items: center;
  margin-bottom: 30px;
}

.review-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  max-width: 400px;
  width: 100%;
  border-left: 4px solid #b366ff;
}

.review-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #b366ff;
  font-size: 1.2rem;
  letter-spacing: 2px;
}

.rating-number {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.review-source {
  text-align: right;
  font-size: 0.85rem;
}

.book-title {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.source {
  color: #666;
  font-style: italic;
}

.review-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 15px;
  font-style: italic;
}

.reviewer {
  text-align: right;
}

.reviewer-name {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

/* Show More Button */
.show-more-container {
  text-align: center;
  margin: 30px 0;
}

.show-more-btn {
  padding: 12px 30px;
  background: #b366ff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.show-more-btn:hover {
  background: #9a4eeb;
  transform: translateY(-1px);
}

/* Reviews Summary */
.reviews-summary {
  text-align: center;
  margin-top: 20px;
}

.reviews-summary p {
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
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
