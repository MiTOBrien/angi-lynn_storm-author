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
  <div class="current-container">
    <h2>Current Releases</h2>
    <section class="series-section">
      <h3>Wolzen-Whitaker Academy Series</h3>
      <h4>Series Information:</h4>
      <p>
        For eleven years, Madison survived the foster system by counting the days until she could
        finally escape. She never imagined that escape would come through fire—or that it would
        thrust her into a hidden world of supernatural beings, ancient prophecies, and powers
        awakening deep within her soul.
      </p>
      <p>
        At Wolzen-Whitaker Academy, Madison discovers she is at the center of a prophecy older than
        time itself. With an animal voice whispering in her mind, unexpected mates forming
        unbreakable bonds at her side, and the Convergence of Time fast approaching, Madison's fate
        is no longer her own. The choices she makes won't just determine her future—but the survival
        of every realm tied to the river of time.
      </p>
      <p>
        As prophecy unfolds, Madison and her closest ally, Dani, must endure the Seven Trials—each a
        brutal test of strength, wisdom, courage, cunning, compassion, sorrow, and fury. Every trial
        carries them across new lands, introduces powerful allies and dangerous enemies, and forces
        them to confront their deepest fears, long-buried trauma, and the truths they've tried to
        outrun. Bonds deepen, new mates emerge, and loyalties are tested as destiny tightens its
        grip.
      </p>
      <p>
        But fate is never simple. When secrets from Madison's past resurface—especially the mystery
        surrounding her mother's disappearance—the line between truth and illusion begins to blur.
        Lost girls, fractured timelines, hidden agendas, and devastating sacrifices threaten to
        unravel everything they've fought for. As the prophecy twists and time itself bends, Madison
        and her mates must decide how much they're willing to lose to save a world that never gave
        them mercy.
      </p>
      <p>
        With the fate of humanity hanging in the balance and the Convergence of Time looming, the
        final battle is not just against darkness—but against destiny itself.<br /><br /><strong
          >Tropes:</strong
        >
        Reverse harem, paranormal romance, shape-shifters, vampires, magic school, found family<br />
      </p>
      <ul class="book-list">
        <li class="book-item">
          <img
            src="/Wolzen1.jpg"
            alt="Wolzen-Whitaker Academy Book 1 Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('wolzen1', $event)"
            @click="isMobile && toggleMobileModal('wolzen1', $event)"
          />
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
        <li class="book-item">
          <img
            src="/Wolzen2.jpg"
            alt="Wolzen-Whitaker Academy Book 2 Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('wolzen2', $event)"
            @click="isMobile && toggleMobileModal('wolzen2', $event)"
          />
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
        <li class="book-item">
          <img
            src="/Wolzen3.jpg"
            alt="Wolzen-Whitaker Academy Book 3 Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('wolzen3', $event)"
            @click="isMobile && toggleMobileModal('wolzen3', $event)"
          />
          <span v-if="isMobile" class="tap-hint">Tap cover for details</span>
        </li>
      </ul>
    </section>

    <section class="series-section">
      <h3>Captured Memories Series</h3>
      <h4>Series Information:</h4>
      <p>
        When friends who are closer than family gather for Thanksgiving, their conversation
        naturally circles back to the first meal many of them ever shared—setting off a wave of
        memories and laughter. As they reminisce, they begin revisiting the moments that shaped
        their individual journeys and ultimately drew them together.
      </p>
      <p>
        One thought lingers among them: every picture represents a moment in time, but the real
        meaning lives in the story behind it. A single snapshot never captures the choices, the
        struggles, or the quiet victories that led to that moment.
      </p>
      <p>
        Follow Astrid and her found family as they reflect on the “pictures” of their lives—both the
        ones hanging on their walls and the ones they carry only in memory—and share the experiences
        that brought them from where they started to where they stand now. At its heart, this series
        explores how people from different backgrounds—and sometimes very different worlds—can find
        themselves woven into the same chosen family.
      </p>
      This why-choose, low-spice, slice-of-life series unfolds through personal reflections,
      heartfelt conversations, and shared memories, offering an intimate look at each character's
      growth and the bonds that hold them together.
      <p>
        <strong>Tropes:</strong> reverse harem, BDSM ( Pet-play, impact play - floggers, whips, fire
        play, Domainance/submission) hurt/comfort<br />
        <strong>Trigger warnings:</strong> off-page loss of family, loss of beloved pet, family
        relationships (sibling),
      </p>
      <ul class="book-list">
        <li class="book-item">
          <img
            src="/AstridCover.jpg"
            alt="Astrid Book Cover"
            class="book-thumbnail"
            @mouseenter="!isMobile && showModal('astrid', $event)"
            @click="isMobile && toggleMobileModal('astrid', $event)"
          />
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
