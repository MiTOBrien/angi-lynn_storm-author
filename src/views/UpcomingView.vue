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
      <h3>Captured Memories Series</h3>
      <h4>Series Information:</h4>
      <p>
        When friends who are closer than family gather for Thanksgiving, their conversation
        naturally circles back to the first meal many of them ever shared—setting off a wave of
        memories and laughter. As they reminisce, they begin revisiting the moments that shaped
        their individual journeys and ultimately drew them together. One thought lingers among them:
        every picture represents a moment in time, but the real meaning lives in the story behind
        it. A single snapshot never captures the choices, the struggles, or the quiet victories that
        led to that moment. Follow Astrid and her found family as they reflect on the “pictures” of
        their lives—both the ones hanging on their walls and the ones they carry only in memory—and
        share the experiences that brought them from where they started to where they stand now. At
        its heart, this series explores how people from different backgrounds—and sometimes very
        different worlds—can find themselves woven into the same chosen family. This why-choose,
        low-spice, slice-of-life series unfolds through personal reflections, heartfelt
        conversations, and shared memories, offering an intimate look at each character's growth and
        the bonds that hold them together.<br /><br />
        <strong>Tropes:</strong> reverse harem, BDSM ( Pet-play, impact play - floggers, whips, fire
        play, Domainance/submission) hurt/comfort<br />
        <strong>Trigger warnings:</strong> off-page loss of family, loss of beloved pet, family
        relationships (sibling),
      </p>
      <ul class="book-list">
        <li class="book-item">
          <img
            src="/Kent.jpg"
            alt="Kent Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('kent', $event)"
            @click="isMobile && toggleMobileModal('kent', $event)"
          />
          <span class="book-info"
            >Master Kent - Preorder on
            <a
              href="https://www.amazon.com/gp/product/B0G75HV2KV?ref_=dbs_m_mng_rwt_calw_tkin_1&storeType=ebooks&qid=1765889944&sr=8-2"
              target="_blank"
              alt="Clink link to preorder book"
              >Amazon</a
            >
            - release date Jan. 15th, 2026</span
          >
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li class="book-item">
          <img
            src="/Storm.jpg"
            alt="Storm Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('storm', $event)"
            @click="isMobile && toggleMobileModal('storm', $event)"
          />
          <span class="book-info">Master Storm - release date Feb. 15th, 2026</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li class="book-item">
          <img
            src="/Mayson.jpg"
            alt="Mayson Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('mayson', $event)"
            @click="isMobile && toggleMobileModal('mayson', $event)"
          />
          <span class="book-info">Mayson - release date Mar. 15th, 2026</span>
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
        <li class="book-item">
          <img
            src="/Jordan.jpg"
            alt="Jordan Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('jordan', $event)"
            @click="isMobile && toggleMobileModal('jordan', $event)"
          />
          <span class="book-info">Jordan - releasing 2nd quarter 2026</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li class="book-item">
          <img
            src="/Phoenix.jpg"
            alt="Phoenix Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('phoenix', $event)"
            @click="isMobile && toggleMobileModal('phoenix', $event)"
          />
          <span class="book-info">Phoenix - releasing 2nd quarter 2026</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li class="book-item">
          <img
            src="/Cole.jpg"
            alt="Cole Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('cole', $event)"
            @click="isMobile && toggleMobileModal('cole', $event)"
          />
          <span class="book-info">Cole - releasing 2nd quarter 2026</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
        </li>
        <li class="book-item">
          <img
            src="/Micha.jpg"
            alt="Micha Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('micha', $event)"
            @click="isMobile && toggleMobileModal('micha', $event)"
          />
          <span class="book-info">Micha - releasing 3rd quarter 2026</span>
          <span v-if="isMobile" class="tap-hint">Tap for details</span>
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
