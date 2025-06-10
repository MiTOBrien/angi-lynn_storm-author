<script setup></script>

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
        <li class="book-item">
          <img src="/AstridCover.jpg" alt="Astrid Book Cover" class="book-thumbnail" />
          <span class="book-info">Astrid - Releasing - June 2025</span>
        </li>
        <li class="book-item">
          <img src="/Kent.jpg" alt="Kent Book Cover" class="book-thumbnail" />
          <span class="book-info">Master Kent - Releasing TBD</span>
        </li>
        <li class="book-item">
          <img src="/Storm.jpg" alt="Storm Book Cover" class="book-thumbnail" />
          <span class="book-info">Master Storm - Releasing TBD</span>
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
          <img src="/Jordan.jpg" alt="Jordan Book Cover" class="book-thumbnail" />
          <span class="book-info">Jordan - Releasing August 2025</span>
        </li>
        <li class="book-item">
          <img src="/Phoenix.jpg" alt="Phoenix Book Cover" class="book-thumbnail" />
          <span class="book-info">Phoenix - Releasing TBD</span>
        </li>
        <li class="book-item">
          <img src="/Cole.jpg" alt="Cole Book Cover" class="book-thumbnail" />
          <span class="book-info">Cole - Releasing TBD</span>
        </li>
        <li class="book-item">
          <img src="/Micha.jpg" alt="Micha Book Cover" class="book-thumbnail" />
          <span class="book-info">Michaa - Releasing TBD</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.upcoming-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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
