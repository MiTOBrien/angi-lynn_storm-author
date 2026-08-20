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

const closeModalOnClickOutside = (event) => {
  if (hoveredBook.value) {
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
      <h3>Standalone</h3>
      <h4>Related to the Captured Memories series</h4>
      <p>
        While the characters in these books live in the broader Captured Memories world with Astrid and her
        friends from the Captured Memories series these characters share their captured meories in different ways.<br /><br />
        <strong>Tropes:</strong> hurt/comfort, abandonment/estrangement, alpha/beta, emotional abuse
        <br /><strong>Trigger warnings:</strong> Family discord, abandonment/estrangement, BDSM/Power exchange
      </p>
      <ul class="book-list">
        <li class="book-item">
          <img
            src="/comingsoon.jpeg"
            alt="Gavin Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('gavin', $event)"
            @click="isMobile && toggleMobileModal('gavin', $event)"
          />
          <span class="book-info">Gavin: Captured Memories Duet - Work in progress - releasing 2026-2027 </span>
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
        <li class="book-item">
          <img
            src="/comingsoon.jpeg"
            alt="Caelan Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('caelan', $event)"
            @click="isMobile && toggleMobileModal('caelan', $event)"
          />
          <span class="book-info">Caelan: Captured Memories Duet - Work in progress - releasing 2026-2027 </span>
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
        <li class="book-item">
          <img
            src="/comingsoon.jpeg"
            alt="Wren Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('wren', $event)"
            @click="isMobile && toggleMobileModal('wren', $event)"
          />
          <span class="book-info">Wren - Work in progress - releasing 2026-2027 </span>
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
        <li class="book-item">
          <img
            src="/comingsoon.jpeg"
            alt="Xander Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('xander', $event)"
            @click="isMobile && toggleMobileModal('xander', $event)"
          />
          <span class="book-info">Xander - Work in progress - releasing 2026-2027 </span>
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
      </ul>
    </section>

    <section class="series-section">
      <h3>Standalone</h3>
      <h4>Related to the Omega series</h4>
      <p>
        While the characters in these books live in the broader Omegaverse with Jordan and his
        friends from the Omega series these are written as standalone books that do not tie directly
        into the main series.<br /><br />
        <strong>Tropes:</strong> hurt/comfort, abandonment/estrangement, alpha/beta, emotional abuse
        <br /><strong>Trigger warnings:</strong> Family discord, abandonment/estrangement,
        kidnapping, bullying, emotional abuse
      </p>
      <ul class="book-list">
        <li class="book-item">
          <img
            src="/Jess.jpg"
            alt="Jess Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('jess', $event)"
            @click="isMobile && toggleMobileModal('jess', $event)"
          />
          <span class="book-info">Jess - Work in progress - releasing 2026-2027 </span>
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
        <li class="book-item">
          <img
            src="/Lucas.jpg"
            alt="Lucas Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('lucas', $event)"
            @click="isMobile && toggleMobileModal('lucas', $event)"
          />
          <span class="book-info">Lucas - Work in progress - releasing 2026-2027 </span>
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
      </ul>
    </section>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="hoveredBook" class="book-modal">
        <div class="modal-content">
          <h4>{{ bookData[hoveredBook]?.title }}</h4>
          <div v-for="(paragraph, index) in bookData[hoveredBook]?.blurb" :key="index">
            <p>{{ paragraph }}</p>
          </div>
          <button v-if="isMobile" @click="hoveredBook = null" class="close-btn">×</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
