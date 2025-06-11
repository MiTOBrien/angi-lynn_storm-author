<script setup>
import { ref, nextTick } from 'vue'
import { bookData } from '../data/bookData.js'

const hoveredBook = ref(null)
const modalPosition = ref({ x: 0, y: 0 })
const hoverTimeout = ref(null)
const isMobile = ref(false)

// Detect if device is mobile
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768 || 'ontouchstart' in window
}

// Initialize mobile detection
checkIfMobile()
window.addEventListener('resize', checkIfMobile)

const showModal = (bookId, event) => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
  }

  hoverTimeout.value = setTimeout(() => {
    hoveredBook.value = bookId

    nextTick(() => {
      const modalWidth = 320
      const modalHeight = 200
      const padding = 15

      let x = window.innerWidth / 2 - modalWidth / 2
      let y = window.innerHeight / 2 - modalHeight / 2

      // Prevent clipping near edges
      x = Math.max(padding, Math.min(x, window.innerWidth - modalWidth - padding))
      y = Math.max(padding, Math.min(y, window.innerHeight - modalHeight - padding))

      modalPosition.value = { x, y }
    })
  }, 200)
}

const hideModal = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
  }

  hoverTimeout.value = setTimeout(() => {
    hoveredBook.value = null
  }, 100)
}

const toggleMobileModal = (bookId, event) => {
  if (hoveredBook.value === bookId) {
    hoveredBook.value = null
  } else {
    showModal(bookId, event)
  }
}

// Close modal when clicking outside on mobile
const closeModalOnClickOutside = (event) => {
  if (isMobile.value && hoveredBook.value) {
    const modal = document.querySelector('.book-modal')
    const bookItem = event.target.closest('.book-item')

    if (!modal?.contains(event.target) && !bookItem) {
      hoveredBook.value = null
    }
  }
}

// Add click listener for mobile
if (typeof window !== 'undefined') {
  document.addEventListener('click', closeModalOnClickOutside)
}
</script>

<template>
  <div class="upcoming-container">
    <h2>Upcoming Releases</h2>

    <section class="series-section">
      <h3>Captured Memories Series</h3>
      <h4>Series Information:</h4>
      <p>
        As a new group of friends meets and grows together, they decide to create a scrapbook of
        their memories to share with others. Where they were, how they met, and where they are going
        as they travel through their life journey. But while a scrapbook is a lovely thing, a
        picture only shows one singular frozen moment. The stories behind the photographs are what
        give the pictures life. Join Astrid and her chosen family as they share their private
        moments of love, life, healing, and growth. These are no-spice/low-spice stories that give
        you glimpses into the lives of these characters.<br /><br />
        <strong>Tropes:</strong> reverse harem, BDSM ( Pet-play, impact play) hurt/comfort<br />
        <strong>Trigger warnings:</strong> off-page loss of family, loss of beloved pet, family
        relationships (sibling)
      </p>
      <ul class="book-list">
        <li
          class="book-item"
          @mouseenter="!isMobile && showModal('astrid', $event)"
          @mouseleave="!isMobile && hideModal()"
          @click="isMobile && toggleMobileModal('astrid', $event)"
        >
          <img src="/AstridCover.jpg" alt="Astrid Book Cover" class="book-thumbnail" />
          <span class="book-info">Astrid - Releasing - June 2025</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li
          class="book-item"
          @mouseenter="!isMobile && showModal('kent', $event)"
          @mouseleave="!isMobile && hideModal()"
          @click="isMobile && toggleMobileModal('kent', $event)"
        >
          <img src="/Kent.jpg" alt="Kent Book Cover" class="book-thumbnail" />
          <span class="book-info">Master Kent - Releasing TBD</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li
          class="book-item"
          @mouseenter="!isMobile && showModal('storm', $event)"
          @mouseleave="!isMobile && hideModal()"
          @click="isMobile && toggleMobileModal('storm', $event)"
        >
          <img src="/Storm.jpg" alt="Storm Book Cover" class="book-thumbnail" />
          <span class="book-info">Master Storm - Releasing TBD</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
      </ul>
    </section>

    <section class="series-section">
      <h3>Omega Series</h3>
      <h4>Series Information:</h4>
      <p>
        In a world built for Alphas, there is a group of Omega's and one safe place that is seeking
        to challenge the status quo. Each of our Omegas has a path to follow, a journey they must go
        on to find the golden ring at the end of the climb. Each one has one thing that is their
        rock bottom that in the end becomes their salvation. Together with packs of Alphas who
        believe that Omegas are the strongest of their society, they travel their path, fight the
        fight, and come out on top. <br /><br /><strong>Tropes:</strong> hurt/comfort, mpreg, loss
        of loved one, emotional abuse <br /><strong>Trigger warnings:</strong> Flashback to loss of
        loved one, bullying, emotional abuse
      </p>
      <ul class="book-list">
        <li
          class="book-item"
          @mouseenter="!isMobile && showModal('jordan', $event)"
          @mouseleave="!isMobile && hideModal()"
          @click="isMobile && toggleMobileModal('jordan', $event)"
        >
          <img src="/Jordan.jpg" alt="Jordan Book Cover" class="book-thumbnail" />
          <span class="book-info">Jordan - Releasing August 2025</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li
          class="book-item"
          @mouseenter="!isMobile && showModal('phoenix', $event)"
          @mouseleave="!isMobile && hideModal()"
          @click="isMobile && toggleMobileModal('phoenix', $event)"
        >
          <img src="/Phoenix.jpg" alt="Phoenix Book Cover" class="book-thumbnail" />
          <span class="book-info">Phoenix - Releasing TBD</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li
          class="book-item"
          @mouseenter="!isMobile && showModal('cole', $event)"
          @mouseleave="!isMobile && hideModal()"
          @click="isMobile && toggleMobileModal('cole', $event)"
        >
          <img src="/Cole.jpg" alt="Cole Book Cover" class="book-thumbnail" />
          <span class="book-info">Cole - Releasing TBD</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li
          class="book-item"
          @mouseenter="!isMobile && showModal('micha', $event)"
          @mouseleave="!isMobile && hideModal()"
          @click="isMobile && toggleMobileModal('micha', $event)"
        >
          <img src="/Micha.jpg" alt="Micha Book Cover" class="book-thumbnail" />
          <span class="book-info">Michaa - Releasing TBD</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
      </ul>
    </section>

    <!-- Modal -->
    <Transition name="modal">
      <div
        v-if="hoveredBook"
        class="book-modal"
        :style="{
          left: modalPosition.x + 'px',
          top: modalPosition.y + 'px',
        }"
      >
        <div class="modal-content">
          <h4>{{ bookData[hoveredBook]?.title }}</h4>
          <p>{{ bookData[hoveredBook]?.blurb }}</p>
          <button v-if="isMobile" @click="hoveredBook = null" class="close-btn">×</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.upcoming-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

.series-section {
  margin-bottom: 40px;
}

h3 {
  margin: 20px 0;
  color: #b366ff;
  font-size: 1.5rem;
}

.book-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.book-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.book-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.book-thumbnail {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.placeholder-cover {
  width: 80px;
  height: 120px;
  background: linear-gradient(135deg, #e0e0e0, #f0f0f0);
  border: 2px dashed #ccc;
  border-radius: 4px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #888;
  text-align: center;
}

.book-info {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
  flex-grow: 1;
}

.tap-hint {
  font-size: 0.9rem;
  color: #b366ff;
  font-style: italic;
  margin-left: 10px;
}

/* Modal Styles */
.book-modal {
  position: fixed;
  z-index: 1000;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  width: 320px;
  min-height: 200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  pointer-events: none;
}

.modal-content {
  position: relative;
}

.modal-content h4 {
  margin: 0 0 10px 0;
  color: #b366ff;
  font-size: 1.1rem;
  font-weight: 600;
}

.modal-content p {
  margin: 0;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.4;
}

.close-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #b366ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.close-btn:hover {
  background: #9a4dff;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}

/* Mobile Specific Styles */
@media (max-width: 768px) {
  .book-modal {
    position: fixed;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%);
    max-width: 90vw;
    max-height: 80vh;
    overflow-y: auto;
    pointer-events: auto;
  }

  .tap-hint {
    display: block;
    margin-left: 0;
    margin-top: 5px;
  }
}

/* Responsive design */
@media (max-width: 600px) {
  .upcoming-container {
    padding: 15px;
  }

  .book-item {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .book-thumbnail,
  .placeholder-cover {
    margin-right: 0;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.3rem;
  }
}
</style>
