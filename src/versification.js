import numberOfVersesPerChapterPerBook from './data/numberOfVersesPerChapterPerBook'
import getVerseMappingsByVersionInfo from './utils/getVerseMappingsByVersionInfo'
import { getLocFromRef, getRefFromLoc, padLocWithLeadingZero } from './utils/locFunctions'

const VALID_PARTIAL_SCOPE_VALUES = [ null, undefined, 'ot', 'nt' ]

export const isValidRefInOriginal = ({ bookId, chapter, verse }) => (
  bookId >= 1 && bookId <= 66 && verse >= 1 && verse <= numberOfVersesPerChapterPerBook[bookId-1][chapter-1]
)

export const getCorrespondingVerseLocation = ({ baseVersion={}, lookupVersionInfo={} }) => {
  // Returns one of the following:
    // an array of `version` objects with keys `bookId`, `chapter`, `verse` and possibly `wordRange`
    // `false` if there is not a valid verse in the corresponding version
    // `null` if invalid parameters were passed

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

  const baseVerseMappingsByVersionInfo = getVerseMappingsByVersionInfo(baseVersion.info)
  const lookupVerseMappingsByVersionInfo = getVerseMappingsByVersionInfo(lookupVersionInfo)
  const baseVersionRefWithoutWordRange = { ...baseVersion.ref }
  delete baseVersionRefWithoutWordRange.wordRange
  const baseLoc = getLocFromRef(baseVersionRefWithoutWordRange)

  if(!baseVerseMappingsByVersionInfo || !lookupVerseMappingsByVersionInfo || !/^[0-9]{8}$/.test(baseLoc)) {
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

  let originalLocs = baseVerseMappingsByVersionInfo['translationToOriginal'][baseLoc]

  if(typeof originalLocs === 'undefined') {
    // baseVersion and original have the same versification for this verse
    originalLocs = baseLoc
  }

  if(typeof originalLocs === 'object') {
    // we want all the locations that the baseVersion mapped to, regardless of wordRange
    originalLocs = Object.values(originalLocs)

  } else {
    // always make it an array, since it may be mapped to more than one location in the original
    originalLocs = [ originalLocs ]
  }

  let lookupVersionLocs = []
  
  originalLocs.forEach(originalLoc => {

    if(!isValidRefInOriginal(getRefFromLoc(originalLoc))) {
      // this verse does not have a valid corresponding verse in the original version
      return
    }

    const [ originalLocWithoutWordRange, wordRangeStr ] = originalLoc.split(/:/)
  
    let lookupVersionLoc = lookupVerseMappingsByVersionInfo['originalToTranslation'][originalLocWithoutWordRange]
  
    if(typeof lookupVersionLoc === 'undefined') {
      // original and lookupVersion have the same versification for this verse
      lookupVersionLoc = originalLoc
    }
  
    if(lookupVersionLoc === null) {
      // this verse is skipped in the lookupVersion
      return
    }

    if(lookupVersionLoc && typeof lookupVersionLoc === 'object') {
      if(wordRangeStr) {
        // get the pieces from lookupVersionLoc that will cover the wordRange

        const wordRangeParts = wordRangeStr.split(/-/)
        const lowEndOfWordRange = parseInt(wordRangeParts[0], 10) || 0
        const highEndOfWordRange = parseInt(wordRangeParts[1], 10) || 1000

        for(let lookupVersionLocWordRange in lookupVersionLoc) {
          const lookupVersionLocWordRangeParts = lookupVersionLocWordRange.split(/-/)
          const lowEndOfWordRangeInLookupVersionLoc = parseInt(lookupVersionLocWordRangeParts[0], 10) || 0
          const highEndOfWordRangeInLookupVersionLoc = parseInt(lookupVersionLocWordRangeParts[1], 10) || 1000
  
          if(
            lowEndOfWordRange <= highEndOfWordRangeInLookupVersionLoc
            || highEndOfWordRange >= lowEndOfWordRangeInLookupVersionLoc
          ) {
            lookupVersionLocs.push(lookupVersionLoc[lookupVersionLocWordRange])
          }
        }

      } else {
        // get all pieces from lookupVersionLoc
        lookupVersionLocs = [
          ...lookupVersionLocs,
          ...Object.values(lookupVersionLoc),
        ]
      }

    } else {
      lookupVersionLocs.push(lookupVersionLoc)
    }
  })

  if(lookupVersionLocs.length === 0) {
    // there are no corresponding verses in the original version
    return false
  }


  // condense wordRanges together so there is only one range per verse

  const locsWithWordRanges = {}

  lookupVersionLocs.forEach(lookupVersionLoc => {
    const [ lookupVersionLocWithoutWordRange, wordRangeStr ] = lookupVersionLoc.split(/:/)
    if(wordRangeStr) {
      if(!locsWithWordRanges[lookupVersionLocWithoutWordRange]) {
        locsWithWordRanges[lookupVersionLocWithoutWordRange] = []
      }
      locsWithWordRanges[lookupVersionLocWithoutWordRange].push(wordRangeStr)
    }
  })

  const removeLookupVersionLocsStartingWith = str => {
    lookupVersionLocs = lookupVersionLocs.filter(lookupVersionLoc => lookupVersionLoc.indexOf(str) !== 0)
  }

  for(let loc in locsWithWordRanges) {
    if(locsWithWordRanges[loc].length === Object.keys(lookupVerseMappingsByVersionInfo['translationToOriginal'][loc]).length) {
      // wordRanges cover the entire verse, so no need to indicate a wordRange
      lookupVersionLocs.push(loc)
      removeLookupVersionLocsStartingWith(`${loc}:`)

    } else if(locsWithWordRanges[loc].length > 1) {
      // wordRanges do not cover the entire verse, but we want to combine the wordRanges if possible
      // we can safely assume here that there are no skipped verses between the word ranges

      let lowEndOfTotalWordRange = 1000
      let highEndOfTotalWordRange = 0

      locsWithWordRanges[loc].forEach(wordRangeStr => {
        const wordRangeParts = wordRangeStr.split(/-/)
        const lowEndOfWordRange = parseInt(wordRangeParts[0], 10) || 0
        const highEndOfWordRange = parseInt(wordRangeParts[1], 10) || 1000

        lowEndOfTotalWordRange = Math.min(lowEndOfTotalWordRange, lowEndOfWordRange)
        highEndOfTotalWordRange = Math.max(highEndOfWordRange, highEndOfWordRange)
      })

      removeLookupVersionLocsStartingWith(`${loc}:`)
      lookupVersionLocs.push(`${loc}:${lowEndOfTotalWordRange}-${highEndOfTotalWordRange}`)
    }
  }

  return lookupVersionLocs.map(lookupVersionLoc => getRefFromLoc(lookupVersionLoc))
}

export const isValidVerse = version => {
  // Returns `true` or `false`, or null if passed an invalid parameter.

  // Note: When a translation has a verse that is not in the original Hebrew, Aramaic or
  // Greek (translated, perhaps, from the LXX, apocryphal book or chapter, etc), it 
  // will simply fail validation. Hence, this function does not validate the presence
  // of a verse in a translation, but rather that a verse in a translation has a
  // corresponding verse in the original.

  const correspondingVerseLocations = getCorrespondingVerseLocation({
    baseVersion: version,
    lookupVersionInfo: {
      versificationModel: 'original',
    },
  })

  return typeof correspondingVerseLocations === 'object' ? true : correspondingVerseLocations
}

export { getLocFromRef, getRefFromLoc, padLocWithLeadingZero }