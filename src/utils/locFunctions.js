export const padLocWithLeadingZero = loc => ('0'+loc).substr(-8)

/*
  Example locs and refs

    01001001
    {
      bookId: 1,
      chapter: 1,
      verse: 1,
    }

    01001001:1-3
    {
      bookId: 1,
      chapter: 1,
      verse: 1,
      wordRanges: ["1-3"],
    }

    01001001:4-
    {
      bookId: 1,
      chapter: 1,
      verse: 1,
      wordRanges: ["4-"],
    }

    01001001:1-3,7-9
    {
      bookId: 1,
      chapter: 1,
      verse: 1,
      wordRanges: ["1-3","7-9"],
    }
*/

export const getLocFromRef = ({ bookId, chapter, verse, wordRanges }) => (
  `${('0'+bookId).substr(-2)}${('00'+chapter).substr(-3)}${('00'+verse).substr(-3)}`
  + `${wordRanges ? `:${wordRanges.join(",")}` : ''}`
)

export const getRefFromLoc = loc => ({
  bookId: parseInt(loc.substr(0,2), 10),
  chapter: parseInt(loc.substr(2,3), 10),
  verse: parseInt(loc.substr(5,3), 10),
  ...(
    loc.substr(8,1) === ':'
      ? { wordRanges: loc.substr(9).split(",") }
      : ''
  ),
})
