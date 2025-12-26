export const bookReviews = [
  {
    id: 1,
    rating: 5,
    text: "This is a well written book with excellent character development. The characters come to life as you read the story and it sucks you in quickly, wanting to know what is going to happen next and it pulls you through the entire gambit of emotions. You will, laugh, get mad, and cry before you get to the end. I am anxiously awaiting the release of book 2 in a couple of weeks to see how the journey continues.",
    reviewer: "Koneko327",
    source: "Amazon",
    book: "Wolzen-Whitaker Academy - Book 1 : Madison's New Beginning"
  },
  {
    id: 2,
    rating: 5,
    text: "Loved this start to the series. Can't wait to read more about all the characters. Keep up the great work and look forward to reading more of your work.",
    reviewer: "Verified Purchase - Anonymous",
    source: "Amazon", 
    book: "Wolzen-Whitaker Academy - Book 1 : Madison's New Beginning"
  },
  {
    id: 3,
    rating: 4,
    text: "This story follows Madison on the beginning of a new adventure after having a horrendous childhood. I can’t wait to read the next chapter of her journey with her men, and her newly discovered talents!",
    reviewer: "Lena F.",
    source: "Amazon",
    book: "Wolzen-Whitaker Academy - Book 1 : Madison's New Beginning"
  },
  {
    id: 4,
    rating: 5,
    text: "You will immediately get drawn into the continuation of Madison's journey as they embark on the start of their trials. The characters face a multitude of challenges, make new friends, and must work together as they work to overcome struggles both as a group and the demons they face in their own lives. I can't wait to see what happens as their journey concludes in book 3.",
    reviewer: "Koneko327",
    source: "Amazon",
    book: "Wolzen-Whitaker Academy - Book 2 : The Trials"
  },
  {
    id: 5,
    rating: 5,
    text: "I can't tell you how I found this story but I'm so glad I did. It was a wonderful story . Multiple POVs , character development. No bad cliffhangers. It was truly a joy to read and I certainly look ing forward to more. I also hope that the fates extended the lives cause Carly is words did make me said. I hope to hear more from Dani and her mates as well as Fionna. Give it a try",
    reviewer: "CMG",
    source: "Amazon",
    book: "Wolzen-Whitaker Academy - Book 3 : The Beginning of the End"
  },
  {
    id: 6,
    rating: 4,
    text: "The journey picks up where it left off as our band of shifters hope to finish the trials. The story has its ups and downs as trials are encountered and the group is tested mentally, physically, and emotionally. Anger, amusement, and sadness are all emotions you'll feel as you reach the compelling conclusion of this saga.",
    reviewer: "Koneko327",
    source: "Amazon",
    book: "Wolzen-Whitaker Academy - Book 3 : The Beginning of the End"
  },
  {
    id: 7,
    rating: 5,
    text: `I am an avid reader and love to explore various genres that different authors choose to explore. When I saw this book by Angi-Lynn Storm that explores BDSM I had to read it. I am so glad I did and if you enjoy compelling stories that deal with love, loss, trust and exploration of new experiences in life you will as well. This is a must read book.

    This book is extremely well-written, tells a compelling story that draws you in, and addresses consensual BDSM in a well thought out and insightful manner. The character development is excellent and gives you insight into each characters life and you feel like you get to know each character as they are introduced. As the story progresses you will explore a full range of emotions - laughing, crying, getting mad and frustrated as various situations arise. The characters deal with real life situations that are easy to relate to as they struggle with situations that we've all had to deal with at some point and in some fashion. As a long time BDSM practitioner I appreciate the attention to detail and care that the author used in their BDSM scenes - addressing core issues like consent, safe words, safety concerns in the various types of play and how consensual BDSM is different from abuse.

    The only somewhat negative point of this book that I can touch on is this - Early on in the book, one of the male characters who has some computer skills develops an interest in Astrid. Before he meets her he starts following her, hacking some of her online social media accounts, etc. in the guise of 'getting to know her' and to help 'protect her'. While he is a 'good guy' in the book the actions are very stalkerish and in the realm of BDSM where consent is everything the actions of this character disturbed me as I read through some of the actions he chose to take and thought were acceptable.

    It is a minor point of the overall story and I still wholly endorse a 5 star rating for this book.`,
    reviewer: "Koneko327",
    source: "Amazon",
    book: "Astrid: Captured Memories Book 1"
  }
]

// Helper function to get reviews for a specific book
export const getReviewsByBook = (bookTitle) => {
  return bookReviews.filter(review => review.book === bookTitle)
}

// Helper function to get reviews by source
export const getReviewsBySource = (source) => {
  return bookReviews.filter(review => review.source === source)
}

// Helper function to get featured reviews (highest rated, limited number)
export const getFeaturedReviews = (limit = 3) => {
  return bookReviews
    .filter(review => review.rating >= 4)
    .slice(0, limit)
}

// Helper function to get all reviews sorted by rating
export const getReviewsByRating = (ascending = false) => {
  return [...bookReviews].sort((a, b) => 
    ascending ? a.rating - b.rating : b.rating - a.rating
  )
}