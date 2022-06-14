import numberOfVersesPerChapterPerBook from './data/numberOfVersesPerChapterPerBook'
import hebrewOrderingOfBookIds from './data/hebrewOrderingOfBookIds'
import getVerseMappingsByVersionInfo from './utils/getVerseMappingsByVersionInfo'
import { getLocFromRef, getRefFromLoc, padLocWithLeadingZero } from './utils/locFunctions'

const VALID_PARTIAL_SCOPE_VALUES = [ null, undefined, 'ot', 'nt' ]
const VALID_SKIPS_UNLIKELY_ORIG_VALUES = [ true, false, undefined ]

export const isValidRefInOriginal = ({ bookId, chapter, verse }) => (
  bookId >= 1 && bookId <= 66 && verse >= 1 && verse <= numberOfVersesPerChapterPerBook[bookId-1][chapter-1]
)

export const getPreviousOriginalLoc = loc => {
  let { bookId, chapter, verse } = getRefFromLoc(loc)

  if(verse > 1) {
    verse--
  } else if(chapter > 1) {
    chapter--
    verse = numberOfVersesPerChapterPerBook[bookId-1][chapter-1]
  } else {
    return null
  }
  
  return getLocFromRef({ bookId, chapter, verse })
}

export const getNextOriginalLoc = loc => {
  let { bookId, chapter, verse } = getRefFromLoc(loc)

  if(verse < numberOfVersesPerChapterPerBook[bookId-1][chapter-1]) {
    verse++
  } else if(chapter < numberOfVersesPerChapterPerBook[bookId-1].length) {
    chapter++
    verse = 1
  } else {
    return null
  }
  
  return getLocFromRef({ bookId, chapter, verse })
}

export const getNextTranslationRef = ({ ref, loc, info }) => {
  ref = loc ? getRefFromLoc(loc) : { ...ref }
  ref.verse++

  const isValidLoc = () => !!(
    getCorrespondingRefs({
      baseVersion: {
        info,
        ref,
      },
      lookupVersionInfo: {
        versificationModel: 'original',
      },
    })
  )

  while(ref.bookId <= 66) {
    while(ref.chapter <= 151) {  // assumes no more than 151 chapters
      for(let i=0; i<10; i++) {  // assumes a gab of no more than 10 verses
        if(isValidLoc()) return getLocFromRef(ref)
        ref.verse++
      }
      ref.chapter++
      ref.verse = 0  // for psalms in some versions
    }
    ref.bookId++
    ref.chapter = 1
    ref.verse = 0
  }

  // try Genesis 1:1
  ref.bookId = ref.chapter = ref.verse = 1
  if(isValidLoc()) return getLocFromRef(ref)

  // try Matthew 1:1
  ref.bookId = 40
  if(isValidLoc()) return getLocFromRef(ref)

  return null
}

export const getOriginalLocsFromRange = (fromLoc, toLoc) => {

  const fromRef = getRefFromLoc(fromLoc)
  const toRef = getRefFromLoc(toLoc)

  const refLessThanOrEqualTo = (ref1, ref2) => (
    isValidRefInOriginal(ref1)
    && isValidRefInOriginal(ref2)
    && ref1.bookId === ref2.bookId
    && (
      ref1.chapter < ref2.chapter
      || (
        ref1.chapter === ref2.chapter
        && ref1.verse <= ref2.verse
      )
    )
  )

  if(!refLessThanOrEqualTo(fromRef, toRef)) return []

  const locs = [ fromLoc.replace(/-.*$/, '-') ]
  let { bookId, chapter, verse } = fromRef
  verse++

  do {

    while(refLessThanOrEqualTo({ bookId, chapter, verse }, toRef)) {
      locs.push(getLocFromRef({ bookId, chapter, verse }))
      verse++
    }

    chapter++
    verse = 1

  } while(chapter <= toRef.chapter)

  locs.splice(locs.length - 1, 1, toLoc.replace(/:.*-$/, '').replace(/:.*([0-9]+)$/, ':1-$1'))

  return locs
}

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

    if(!fromOriginal) {
      // Need to discern lookup locs that go nowhere because orig of that loc was mapped elsewhere
      const refs = getCorrespondingRefs({
        baseVersion: {
          info: lookupVersionInfo,
          ref: baseVersionRefWithoutWordRanges,
        },
        lookupVersionInfo: baseVersion.info,
      })
      if(
        refs.length !== 1
        || refs[0].chapter !== baseVersionRefWithoutWordRanges.chapter
        || refs[0].verse !== baseVersionRefWithoutWordRanges.verse
      ) {
        return false
      }
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

  const goGetCorrespondingRefs = chapterAndVerse => (
    getCorrespondingRefs({
      baseVersion: {
        info: {
          versificationModel: 'original',
        },
        ref: {
          bookId,
          ...chapterAndVerse,
        }
      },
      lookupVersionInfo: versionInfo,
    })
  )

  const getLastChapterFromRefs = refs => ((refs || []).pop() || {}).chapter || 0

  while(!correspondingRefs && verse > 0) {
    correspondingRefs = goGetCorrespondingRefs({
      chapter,
      verse,
    })
    verse--
  }

  // The above may be wrong as it assumes the last verse in a book in one version is the last verse in that book in another.
  // But, SYNO has the last verses in Romans two chapters back! (As a result, the above would only show 14 chapters for Romans in SYNO.)
  // Hence I run a check on verse 1 of the last chapter of the book as well below, and take the greater of the two.

  const numChapters = Math.max(
    getLastChapterFromRefs(correspondingRefs),
    getLastChapterFromRefs(
      goGetCorrespondingRefs({
        chapter,
        verse: 1,
      })
    ),
  )

  return numChapters || null
}

export const getStartAndEndVersesByChapter = ({ versionInfo, bookId }) => {

  const numberOfVersesPerChapter = numberOfVersesPerChapterPerBook[bookId-1]
  let startAndEndVersesByChapter = []

  if(
    !numberOfVersesPerChapter
    || (versionInfo.partialScope === 'ot' && bookId >= 40)
    || (versionInfo.partialScope === 'nt' && bookId <= 39)
  ) {
    // this version does not have this testament of the Bible
    return {
      startAndEndVersesByChapter: [],
      skippedVerses: [],
    }
  }

  // for each chapter in the original
  numberOfVersesPerChapter.forEach((numVersesInOrig, idx) => {

    const isValidVerse = verse => (
      hasCorrespondingVerseInOriginal({
        info: versionInfo,
        ref: {
          bookId,
          chapter: idx + 1,
          verse,
        },
      })
    )

    // find the first valid verse in the chapter
    const BEYOND_MAX_VERSE_NUM = 140
    let firstVerseInChapter = 0
    while(
      firstVerseInChapter < BEYOND_MAX_VERSE_NUM
      && !isValidVerse(firstVerseInChapter)
    ) firstVerseInChapter++

    // now find the last valid verse in the chapter
    let lastVerseInChapter = numVersesInOrig

    // start with the last in the original and reduce until we have a valid verse
    while(
      lastVerseInChapter > 0
      && !isValidVerse(lastVerseInChapter)
    ) lastVerseInChapter--

    // now go forward until there is an invalid verse
    while(isValidVerse(lastVerseInChapter)) {
      lastVerseInChapter++
    }

    // finally, back one to the last valid verse
    lastVerseInChapter--

    // mark this the number of verses in this chapter
    startAndEndVersesByChapter[idx] = (
      (
        firstVerseInChapter !== BEYOND_MAX_VERSE_NUM
        && lastVerseInChapter
      )
        ? [
          firstVerseInChapter,
          lastVerseInChapter,
        ]
        : null
    )
  })

  // remove null chapters at the end
  let hitChapterWithVerses = false
  startAndEndVersesByChapter = startAndEndVersesByChapter
    .reverse()
    .filter(startAndEndVerses => {
      if(startAndEndVerses) {
        hitChapterWithVerses = true
        return true
      }
      return hitChapterWithVerses
    })
    .reverse()

  // find skipped verses in each chapter of this book
  const verseMappingsByVersionInfo = getVerseMappingsByVersionInfo(versionInfo)
  const skippedLocs = Object.keys(verseMappingsByVersionInfo.originalToTranslation).filter(loc => (
    parseInt(loc.substr(0,2), 10) === bookId
    && verseMappingsByVersionInfo.originalToTranslation[loc] === null
  ))

  return {
    startAndEndVersesByChapter,
    skippedLocs,
  }
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