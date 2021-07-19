import numberOfVersesPerChapterPerBook from './data/numberOfVersesPerChapterPerBook'
import hebrewOrderingOfBookIds from './data/hebrewOrderingOfBookIds'
import getVerseMappingsByVersionInfo from './utils/getVerseMappingsByVersionInfo'
import { getLocFromRef, getRefFromLoc, padLocWithLeadingZero } from './utils/locFunctions'

const VALID_PARTIAL_SCOPE_VALUES = [ null, undefined, 'ot', 'nt' ]
const VALID_SKIPS_UNLIKELY_ORIG_VALUES = [ true, false, undefined ]

export const isValidRefInOriginal = ({ bookId, chapter, verse }) => (
  bookId >= 1 && bookId <= 66 && verse >= 1 && verse <= numberOfVersesPerChapterPerBook[bookId-1][chapter-1]
)

export const getCorrespondingRefs = ({ baseVersion={}, lookupVersionInfo={} }) => {
  // Returns one of the following:
    // an array of `ref` objects with keys `bookId`, `chapter`, `verse` and possibly `wordRanges`
    // `false` if there is not a valid verse in the corresponding version
    // `null` if invalid parameters were passed

  // Must go from an original text to a translation, or vice versa.

  if(
    typeof baseVersion !== 'object'
    || typeof baseVersion.info !== 'object'
    || typeof lookupVersionInfo !== 'object'
  ) {
    return null
  }

  if(!VALID_PARTIAL_SCOPE_VALUES.includes(baseVersion.info.partialScope)) {
    return null
  }

  if(!VALID_PARTIAL_SCOPE_VALUES.includes(lookupVersionInfo.partialScope)) {
    return null
  }

  if(!VALID_SKIPS_UNLIKELY_ORIG_VALUES.includes(baseVersion.info.skipsUnlikelyOriginals)) {
    return null
  }

  if(!VALID_SKIPS_UNLIKELY_ORIG_VALUES.includes(lookupVersionInfo.skipsUnlikelyOriginals)) {
    return null
  }

  if(
    !Number.isInteger(baseVersion.ref.bookId)
    || !Number.isInteger(baseVersion.ref.chapter)
    || !Number.isInteger(baseVersion.ref.verse)
    || baseVersion.ref.bookId < 1
    || baseVersion.ref.chapter < 1
    || baseVersion.ref.verse < 0
  ) {
    return null
  }

  const isOriginal = info => !!(
    info.versificationModel === 'original'
    && !info.skipsUnlikelyOriginals
    && !info.extraVerseMappings
  )

  const fromOriginal = isOriginal(baseVersion.info)

  if(!fromOriginal && !isOriginal(lookupVersionInfo)) {  // must be one original text and one non-original
    return null
  }

  const verseMappingsByVersionInfo = getVerseMappingsByVersionInfo(fromOriginal ? lookupVersionInfo : baseVersion.info)
  const baseVersionRefWithoutWordRanges = { ...baseVersion.ref }
  delete baseVersionRefWithoutWordRanges.wordRanges
  const baseLoc = getLocFromRef(baseVersionRefWithoutWordRanges)

  if(!verseMappingsByVersionInfo || !/^[0-9]{8}$/.test(baseLoc)) {
    // bad parameter
    return null
  }

  if(
    (baseVersion.info.partialScope === 'ot' && baseVersion.ref.bookId >= 40)
    || (baseVersion.info.partialScope === 'nt' && baseVersion.ref.bookId <= 39)
  ) {
    // invalid verse in base version
    return null
  }

  if(
    (lookupVersionInfo.partialScope === 'ot' && baseVersion.ref.bookId >= 40)
    || (lookupVersionInfo.partialScope === 'nt' && baseVersion.ref.bookId <= 39)
  ) {
    // the corresponding version does not have this testament of the Bible
    return false
  }

  let lookupLocs = verseMappingsByVersionInfo[fromOriginal ? 'originalToTranslation' : 'translationToOriginal'][baseLoc]

  if(typeof lookupLocs === 'undefined') {
    if(!isValidRefInOriginal(getRefFromLoc(baseLoc))) {
      // this verse does not have a valid corresponding verse in the original version
      return false
    }

    // baseVersion and original have the same versification for this verse
    lookupLocs = [ baseLoc ]

  } else if(lookupLocs === null) {
    // there are no corresponding verses in the original version
    return []

  } else if(typeof lookupLocs === 'object') {
    // we want all the locations that the baseVersion mapped to, regardless of wordRanges
    lookupLocs = Object.values(lookupLocs)

  } else {
    // always make it an array, since it may be mapped to more than one location in the original
    lookupLocs = [ lookupLocs ]
  }

  // condense wordRanges together so there is only one range per verse

  const locsWithWordRanges = {}

  lookupLocs.forEach(lookupVersionLoc => {
    const [ lookupVersionLocWithoutWordRange, wordRangeStr ] = lookupVersionLoc.split(/:/)
    if(wordRangeStr) {
      if(!locsWithWordRanges[lookupVersionLocWithoutWordRange]) {
        locsWithWordRanges[lookupVersionLocWithoutWordRange] = []
      }
      locsWithWordRanges[lookupVersionLocWithoutWordRange].push(wordRangeStr)
    }
  })

  const removeLookupVersionLocsStartingWith = str => {
    lookupLocs = lookupLocs.filter(lookupVersionLoc => lookupVersionLoc.indexOf(str) !== 0)
  }

  for(let loc in locsWithWordRanges) {
    if(locsWithWordRanges[loc].length === Object.keys(verseMappingsByVersionInfo[fromOriginal ? 'translationToOriginal' : 'originalToTranslation'][loc]).length) {
      // wordRanges cover the entire verse, so no need to indicate wordRanges
      lookupLocs.push(loc)
      removeLookupVersionLocsStartingWith(`${loc}:`)

    } else if(locsWithWordRanges[loc].length > 1) {
      // wordRanges do not cover the entire verse, so we want to combine them into
      // a single loc with as few pieces as possible

      // put them in order
      locsWithWordRanges[loc].sort((range1, range2) => (
        parseInt(range1.split('-')[0], 10) > parseInt(range2.split('-')[0], 10)
          ? 1
          : -1
      ))

      // reduce
      locsWithWordRanges[loc].reduce((ranges, thisRange) => {
        if(typeof ranges !== 'object') {
          ranges = [ ranges ]
        }

        const partsOfLastRange = ranges[ranges.length - 1].split('-')
        const partsOfNewRange = thisRange.split('-')

        if((parseInt(partsOfLastRange[1], 10) || 0) + 1 === parseInt(partsOfNewRange[0], 10)) {
          ranges[ranges.length - 1] = `${partsOfLastRange[0]}-${partsOfNewRange[1]}`
        } else {
          ranges.push(thisRange)
        }

        return ranges
      })

      // push on new loc with 1+ word ranges
      removeLookupVersionLocsStartingWith(`${loc}:`)
      lookupLocs.push(`${loc}:${lowEndOfTotalWordRange}-${highEndOfTotalWordRange}`)
    }
  }

  return lookupLocs.map(lookupVersionLoc => getRefFromLoc(lookupVersionLoc))
}

export const hasCorrespondingVerseInOriginal = version => {
  // Returns `true` or `false`, or null if passed an invalid parameter. Assumes version parameter to represent a valid passage.

  // Note: When a translation has a verse that is not in the original Hebrew, Aramaic or
  // Greek (translated, perhaps, from the LXX, apocryphal book or chapter, etc), it 
  // will simply fail validation. Hence, this function does not validate the presence
  // of a verse in a translation, but rather that a verse in a translation has a
  // corresponding verse in the original.

  const correspondingRefs = getCorrespondingRefs({
    baseVersion: version,
    lookupVersionInfo: {
      versificationModel: 'original',
    },
  })

  return correspondingRefs ? true : correspondingRefs
}

export const getNumberOfChapters = ({ versionInfo, bookId }) => {

  const numberOfVersesPerChapter = numberOfVersesPerChapterPerBook[bookId-1]

  if(!numberOfVersesPerChapter) return null

  const chapter = numberOfVersesPerChapter.length
  let verse = numberOfVersesPerChapter[chapter-1]
  let correspondingRefs

  // This approach is wrong as it assumes the last verse in a book in one version is the last verse in that book in another.
  // But, SYNO has the last verses in Romans two chapters back! (As a result, the SYNO is now showing only 14 chapters for Romans in the apps.)
  // So I should run a check on verse 1 of the last chapter of the book as well and take the greater of the two.

  while(!correspondingRefs && verse > 0) {
    correspondingRefs = getCorrespondingRefs({
      baseVersion: {
        info: {
          versificationModel: 'original',
        },
        ref: {
          bookId,
          chapter,
          verse,
        }
      },
      lookupVersionInfo: versionInfo,
    })
    verse--
  }

  return correspondingRefs ? correspondingRefs.pop().chapter : null
}

export const getBookIdListWithCorrectOrdering = ({ versionInfo: { hebrewOrdering, partialScope } }) => {

  const books = (
    hebrewOrdering
      ? [
        ...hebrewOrderingOfBookIds,
        ...Array(27).fill(0).map((x, idx) => idx+40),
      ]
      : Array(66).fill(0).map((x, idx) => idx+1)
  )

  if(partialScope === 'ot') {
    books.splice(39, 27)
  }

  if(partialScope === 'nt') {
    books.splice(0, 39)
  }

  return books
}

export { getLocFromRef, getRefFromLoc, padLocWithLeadingZero }