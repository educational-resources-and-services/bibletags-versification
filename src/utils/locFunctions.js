export const padLocWithLeadingZero = loc => ('0'+loc).substr(-8)

export const getLocFromRef = ({ bookId, chapter, verse, wordRange }) => (
  `${('0'+bookId).substr(-2)}${('00'+chapter).substr(-3)}${('00'+verse).substr(-3)}${wordRange ? `:${wordRange}` : ''}`
)

export const getRefFromLoc = loc => ({
  bookId: parseInt(loc.substr(0,2), 10),
  chapter: parseInt(loc.substr(2,3), 10),
  verse: parseInt(loc.substr(5,3), 10),
  ...(
    loc.substr(8,1) === ':'
      ? { wordRange: loc.substr(9).split('-') }
      : ''
  ),
})
