import kjvLikeVerseMappings from '../data/kjvLikeVerseMappings'
import lxxVerseMappings from '../data/lxxVerseMappings'
import synodalVerseMappings from '../data/synodalVerseMappings'

import { padLocWithLeadingZero } from './locFunctions'

// Assuming a one-way mapping set takes up ~3k, 200 two-way mapping sets would be 1.2 MB of memory
const MAX_NUMBER_OF_MAPPING_SETS = 200
const VALID_VERSIFICATION_MODELS = [ 'original', 'kjv', 'lxx', 'synodal' ]
const VALID_PARTIAL_SCOPE_VALUES = [ null, undefined, 'ot', 'nt' ]

const verseMappings = {
  original: {},
  kjv: kjvLikeVerseMappings,
  lxx: lxxVerseMappings,
  synodal: synodalVerseMappings,
}

const unlikelyOriginals = {
  "40012047": null,
  "40017021": null,
  "40018011": null,
  "40023014": null,
  "41007016": null,
  "41009044": null,
  "41009046": null,
  "41011026": null,
  "41015028": null,
  "42017036": null,
  "42023017": null,
  "43005004": null,
  "44008037": null,
  "44015034": null,
  "44024007": null,
  "44028029": null,
  "45016024": null,
}

const extraVerseMappingsKeys = {}
let extraVerseMappingsIndex = 0
const verseMappingsByVersionInfo = {}
Object.keys(verseMappings).forEach(versificationModel => verseMappingsByVersionInfo[versificationModel] = {})

const getVerseMappingsByVersionInfo = ({ partialScope, versificationModel, skipsUnlikelyOriginals, extraVerseMappings }={}) => {

  // validate parameters

  if(!VALID_PARTIAL_SCOPE_VALUES.includes(partialScope)) {
    return null
  }

  if(!VALID_VERSIFICATION_MODELS.includes(versificationModel)) {
    return null
  }

  if(!(!extraVerseMappings || typeof extraVerseMappings === 'object')) {
    return null
  }


  // Look to see if a versification mapping for these parameters is already compiled

  const extraVerseMappingsJSON = JSON.stringify(extraVerseMappings || {})

  let extraVerseMappingsKey = extraVerseMappingsKeys[extraVerseMappingsJSON]

  if(!extraVerseMappingsKey) {
    extraVerseMappingsKey = extraVerseMappingsKeys[extraVerseMappingsJSON] = extraVerseMappingsIndex++
  }

  if(!verseMappingsByVersionInfo[versificationModel][`${extraVerseMappingsKey}-${!!skipsUnlikelyOriginals}`]) {
    // Create object of versification mappings without abbreviations

    const getOverrideMappings = ({ baseMappings, overrideMappings }) => {

      // find baseMapping keys by bareLocs
      const baseMappingsKeysByBareOriginalLoc = {}
      const baseMappingsKeysByBareTranslationLoc = {}
      Object.keys(baseMappings).forEach(locWithWordRange => {

        const [ bareOriginalLoc ] = locWithWordRange.split(':')
        baseMappingsKeysByBareOriginalLoc[bareOriginalLoc] = baseMappingsKeysByBareOriginalLoc[bareOriginalLoc] || []
        baseMappingsKeysByBareOriginalLoc[bareOriginalLoc].push(locWithWordRange)

        if(baseMappings[locWithWordRange]) {
          const [ bareTranslationLoc ] = baseMappings[locWithWordRange].split(':')
          baseMappingsKeysByBareTranslationLoc[bareTranslationLoc] = baseMappingsKeysByBareTranslationLoc[bareTranslationLoc] || []
          baseMappingsKeysByBareTranslationLoc[bareTranslationLoc].push(locWithWordRange)
        }

      })

      // delete from baseMappings where base loc used in overrideMappings (both original and translation sides)
      const baseMappingsCleaned = { ...baseMappings }
      for(let locWithWordRange in overrideMappings) {

        const [ bareOriginalLoc ] = locWithWordRange.split(':')
        ;(baseMappingsKeysByBareOriginalLoc[bareOriginalLoc] || []).forEach(baseMappingsKey => {
          delete baseMappingsCleaned[baseMappingsKey]
        })
        delete baseMappingsKeysByBareOriginalLoc[bareOriginalLoc]

        if(overrideMappings[locWithWordRange]) {
          const [ bareTranslationLoc ] = overrideMappings[locWithWordRange].split(':')
          ;(baseMappingsKeysByBareTranslationLoc[bareTranslationLoc] || []).forEach(baseMappingsKey => {
            delete baseMappingsCleaned[baseMappingsKey]
          })
          delete baseMappingsKeysByBareTranslationLoc[bareTranslationLoc]
        }

      }

      // return merged overrideMappings onto baseMappings
      return { ...baseMappingsCleaned, ...overrideMappings }
    
    }

    const parseOutRanges = mappings => {
      mappings = { ...mappings }
      for(let key in mappings) {
        const keyParts = key.match(/^([0-9]{8})-([0-9]{3})$/)
        if(keyParts) {
          const startingLoc = parseInt(keyParts[1], 10)
          const endingLoc = parseInt(keyParts[1].substr(0,5) + keyParts[2], 10)
          if(endingLoc >= startingLoc) {
            for(let loc=startingLoc; loc<=endingLoc; loc++) {
              mappings[padLocWithLeadingZero(loc)] = mappings[key] === null ? null : padLocWithLeadingZero(loc + mappings[key])
            }
          }
          delete mappings[key]
        }
      }
      return mappings
    }

    // parse out ranges
    let originalToTranslation = parseOutRanges(verseMappings[versificationModel])
    const overrideMappings1 = (skipsUnlikelyOriginals ? unlikelyOriginals : {})
    const overrideMappings2 = (extraVerseMappings || {})

    // apply overrides
    originalToTranslation = getOverrideMappings({
      baseMappings: originalToTranslation,
      overrideMappings: overrideMappings1,
    })
    originalToTranslation = getOverrideMappings({
      baseMappings: originalToTranslation,
      overrideMappings: overrideMappings2,
    })

    // switch it around, ignoring nulls
    const translationToOriginal = {}
    for(let key in originalToTranslation) {
      if(originalToTranslation[key] === null) continue
      translationToOriginal[originalToTranslation[key]] = key
    }

    const normalizeWordRanges = mapping => (
      !mapping
        ? mapping
        : mapping.replace(/([0-9]+)-([0-9]+)/g, (match, a, b) => (
          a === b
            ? a
            : match
        ))
    )

    // make multi-level so that all keys are simple locs
    const convertMappingsToMultiLevel = mappings => {
      for(let key in mappings) {
        const keyParts = key.match(/^([0-9]{8}):([0-9]+(?:-[0-9]*)?(?:,[0-9]+(?:-[0-9]*)?)*)$/)
        if(keyParts) {
          const loc = keyParts[1]
          const wordRangesStr = normalizeWordRanges(keyParts[2])
          if(!mappings[loc]) mappings[loc] = {}
          mappings[loc][wordRangesStr] = normalizeWordRanges(mappings[key])
          delete mappings[key]
        } else {
          mappings[key] = normalizeWordRanges(mappings[key])
        }
      }
    }

    convertMappingsToMultiLevel(originalToTranslation)
    convertMappingsToMultiLevel(translationToOriginal)

    verseMappingsByVersionInfo[versificationModel][`${extraVerseMappingsKey}-${!!skipsUnlikelyOriginals}`] = {
      originalToTranslation,
      translationToOriginal,
      createdAt: Date.now(),
    }


    // Prevent exhausting memory by not caching too many mappings

    let numMappingSets = 0
    let oldestMappingSetInfo

    for(let vModel in verseMappingsByVersionInfo) {
      for(let evmKey in verseMappingsByVersionInfo[vModel]) {

        numMappingSets++

        const createdAt = verseMappingsByVersionInfo[vModel][evmKey]['createdAt']
        if(!oldestMappingSetInfo || createdAt < oldestMappingSetInfo.createdAt) {
          oldestMappingSetInfo = {
            vModel,
            evmKey,
            createdAt,
          }
        }
      }
    }

    if(numMappingSets > MAX_NUMBER_OF_MAPPING_SETS) {
      const { vModel, evmKey, createdAt } = oldestMappingSetInfo
      delete verseMappingsByVersionInfo[vModel][evmKey]
    }
  }

  return verseMappingsByVersionInfo[versificationModel][`${extraVerseMappingsKey}-${!!skipsUnlikelyOriginals}`]
}

export default getVerseMappingsByVersionInfo
