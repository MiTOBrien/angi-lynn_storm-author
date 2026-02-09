export const bookReviews = [
  {
    id: 1,
    rating: 5,
    text: [
      'This is a well written book with excellent character development. The characters come to life as you read the story and it sucks you in quickly, wanting to know what is going to happen next.',
      'You will laugh, get mad, and cry before you get to the end. I am anxiously awaiting the release of book 2 in a couple of weeks to see how the journey continues.',
    ],
    reviewer: 'Koneko327',
    source: 'Amazon',
    bookId: 'wwa1',
  },
  {
    id: 2,
    rating: 5,
    text: [
      "Loved this start to the series. Can't wait to read more about all the characters.",
      'Keep up the great work and look forward to reading more of your work.',
    ],
    reviewer: 'Verified Purchase - Anonymous',
    source: 'Amazon',
    bookId: 'wwa1',
  },
  {
    id: 3,
    rating: 4,
    text: [
      'This story follows Madison on the beginning of a new adventure after having a horrendous childhood.',
      "I can't wait to read the next chapter of her journey with her men, and her newly discovered talents!",
    ],
    reviewer: 'Lena F.',
    source: 'Amazon',
    bookId: 'wwa1',
  },
  {
    id: 4,
    rating: 5,
    text: [
      "You will immediately get drawn into the continuation of Madison's journey as they embark on the start of their trials.",
      'The characters face a multitude of challenges, make new friends, and must work together as they work to overcome struggles both as a group and the demons they face in their own lives.',
      "I can't wait to see what happens as their journey concludes in book 3.",
    ],
    reviewer: 'Koneko327',
    source: 'Amazon',
    bookId: 'wwa2',
  },
  {
    id: 5,
    rating: 5,
    text: [
      "I can't tell you how I found this story but I'm so glad I did. It was a wonderful story with multiple POVs and strong character development.",
      'No bad cliffhangers. It was truly a joy to read and I certainly look forward to more.',
      'I also hope that the fates extended the lives because Carly’s words did make me sad. I hope to hear more from Dani and her mates as well as Fionna. Give it a try.',
    ],
    reviewer: 'CMG',
    source: 'Amazon',
    bookId: 'wwa3',
  },
  {
    id: 6,
    rating: 4,
    text: [
      'The journey picks up where it left off as our band of shifters hope to finish the trials.',
      'The story has its ups and downs as trials are encountered and the group is tested mentally, physically, and emotionally.',
      "Anger, amusement, and sadness are all emotions you'll feel as you reach the compelling conclusion of this saga.",
    ],
    reviewer: 'Koneko327',
    source: 'Amazon',
    bookId: 'wwa3',
  },
  {
    id: 7,
    rating: 5,
    text: [
      'I am an avid reader and love to explore various genres that different authors choose to explore. When I saw this book by Angi-Lynn Storm that explores BDSM I had to read it. I am so glad I did.',
      'This book is extremely well-written, tells a compelling story that draws you in, and addresses consensual BDSM in a well thought out and insightful manner.',
      'The character development is excellent and gives you insight into each character’s life. As the story progresses you will explore a full range of emotions — laughing, crying, getting mad and frustrated as various situations arise.',
      'As a long-time BDSM practitioner I appreciate the attention to detail and care that the author used in their BDSM scenes — addressing core issues like consent, safe words, safety concerns, and how consensual BDSM is different from abuse.',
      "The only somewhat negative point is this: early on, one of the male characters with computer skills develops an interest in Astrid and begins following her online, hacking some of her social media accounts in the guise of 'getting to know her' and 'protecting her'. While he is a 'good guy', the actions are very stalkerish and contrast with the book’s strong emphasis on consent.",
      'It is a minor point of the overall story and I still wholly endorse a 5 star rating for this book.',
    ],
    reviewer: 'Koneko327',
    source: 'Amazon',
    bookId: 'cm1',
  },
    {
    id: 8,
    rating: 5,
    text: [
      'This story is a beautifully written continuation of Astrid that allows Master Kent and his submissive that were introduced in book 1 to tell their stories and give us a look at their lives. Once more the author is able to weave a story that is emotionally compelling, quickly drawing you in, and making you want to read more, anxious to know what is coming next.',
      'If you\'re someone who actively participates in BDSM you will appreciate the way the BDSM scenes are presented and things are handled in the scenes. If you are new to BDSM they are written expertly in a way that it is easy to understand what is going on and you\'ll finish the book with a clear understanding of what consensual BDSM is, how it is different from non-consensual activities under the guise of "BDSM", and the importance of the differences.',
      'The character growth is something we can all understand and something that most people strive for in their lives and you will feel yourself easily relating to the struggles that the characters experience. I felt myself fully invested, getting mad with the character, crying at what they endured, and laughing or smiling at the humor.',
      'This is a book you will remember and find yourself wanting to go back and read again.',
    ],
    reviewer: 'Koneko327',
    source: 'Amazon',
    bookId: 'cm2',
  },
]

// Helper function to get reviews for a specific book
export const getReviewsByBook = (bookId) => {
  return bookReviews.filter((review) => review.bookId === bookId)
}

// Helper function to get reviews by source
export const getReviewsBySource = (source) => {
  return bookReviews.filter((review) => review.source === source)
}

// Helper function to get featured reviews (highest rated, limited number)
export const getFeaturedReviews = (limit = 3) => {
  return bookReviews.filter((review) => review.rating >= 4).slice(0, limit)
}

// Helper function to get all reviews sorted by rating
export const getReviewsByRating = (ascending = false) => {
  return [...bookReviews].sort((a, b) => (ascending ? a.rating - b.rating : b.rating - a.rating))
}
