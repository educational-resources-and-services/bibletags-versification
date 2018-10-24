import kjvVerseMappings from './data/kjvVerseMappings'
import lxxVerseMappings from './data/lxxVerseMappings'
import synodalVerseMappings from './data/synodalVerseMappings'

import getVerseMappingsByVersionInfo from './utils/getVerseMappingsByVersionInfo'
import { getLocFromVersion, getVersionFromLoc, isValidVerseInOriginal} from './utils/misc'

export const getCorrespondingVerseLocation = ({ baseVersion={}, lookupVersionInfo={} }) => {
  // Returns:
    // `version` object with `bookId`, `chapter` and `verse` keys
    // or false if there is not a valid verse in the corresponding version
    // or  null if invalid parameters were passed

  const baseVerseMappingsByVersionInfo = getVerseMappingsByVersionInfo(versionInfo)
  const lookupVerseMappingsByVersionInfo = getVerseMappingsByVersionInfo(lookupVersionInfo)
  const baseLoc = getLocFromVersion(baseVersion)

  if(!baseVerseMappingsByVersionInfo || !lookupVerseMappingsByVersionInfo || !/^[0-9]{8}$/.test(baseLoc)) {
    // bad parameter
    return null
  }

  let originalLoc = baseVerseMappingsByVersionInfo['translationToOriginal'][baseLoc]
  
  if(originalLoc === 'undefined') {
    // baseVersion and original have the same versification for this verse
    originalLoc = baseLoc
  }

  if(!isValidVerseInOriginal(getVersionFromLoc(originalLoc))) {
    // this verse does not have a valid corresponding verse in the original version
    return false
  }

  let lookupVersionLoc = baseVerseMappingsByVersionInfo['originalToTranslation'][originalLoc]

  if(lookupVersionLoc === 'undefined') {
    // original and lookupVersion have the same versification for this verse
    lookupVersionLoc = originalLoc
  }

  if(lookupVersionLoc === 'null') {
    // this verse is skipped in the lookupVersion
    return false
  }

  return getVersionFromLoc(lookupVersionLoc)
}

export const idValidVerse = version => {
  // Returns `true` or `false`, or null if passed an invalid parameter.

  // Note: When a translation has a verse that is not in the original Hebrew, Aramaic or
  // Greek (translated, perhaps, from the LXX, apocryphal book or chapter, etc), it 
  // will simply fail validation. Hence, this function does not validate the presence
  // of a verse in a translation, but rather that a verse in a translation has a
  // corresponding verse in the original.

  const correspondingVerseLocation = getCorrespondingVerseLocation({
    baseVersion: version,
    lookupVersionInfo: {
      versificationModel: 'original',
    },
  })

  return typeof correspondingVerseLocation === 'object' ? true : correspondingVerseLocation
}
