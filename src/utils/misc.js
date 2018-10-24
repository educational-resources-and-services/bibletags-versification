import numberOfVersesPerChapterPerBook from '../data/numberOfVersesPerChapterPerBook'

export const getLocFromVersion = ({ bookId, chapter, verse }) => (
  `${('0'+bookId).substr(-2)}${('00'+chapter).substr(-3)}${('00'+verse).substr(-3)}`
)

export const getVersionFromLoc = loc => ({
  bookId: parseInt(loc.substr(0,2), 10),
  chapter: parseInt(loc.substr(2,3), 10),
  verse: parseInt(loc.substr(5), 10),
})

export const isValidVerseInOriginal = ({ bookId, chapter, verse }) => (
  verse >= 1 && verse <= numberOfVersesPerChapterPerBook[bookId-1][chapter-1]
)
