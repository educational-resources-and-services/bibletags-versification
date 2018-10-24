// Assuming a one-way mapping set takes up ~3k, 200 two-way mapping sets would be 1.2 MB of memory
const MAX_NUMBER_OF_MAPPING_SETS = 200
const VALID_VERSIFICATION_MODELS = [ 'original', 'kjv', 'lxx', 'synadol' ]
const VALID_PARTIAL_SCOPE_VALUES = [ undefined, 'ot', 'nt' ]

const extraVerseMappingsKeys = {}
let extraVerseMappingsIndex = 0
const verseMappingsByVersionInfo = {}

export default const getVerseMappingsByVersionInfo = ({ partialScope, versificationModel, extraVerseMappings }) => {

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
  
  if(!verseMappingsByVersionInfo[versificationModel][extraVerseMappingsKey]) {
    
    // Create object of versification mappings without abbreviations

    verseMappingsByVersionInfo[versificationModel][extraVerseMappingsKey]['originalToTranslation'] = 1
    verseMappingsByVersionInfo[versificationModel][extraVerseMappingsKey]['translationToOriginal'] = 2
    verseMappingsByVersionInfo[versificationModel][extraVerseMappingsKey]['createdAt'] = Date.now()


    // Prevent exhausting memory by not caching too many mappings

    let numMappingSets = 0
    const oldestMappingSetInfo = {}

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

  return verseMappingsByVersionInfo[versificationModel][extraVerseMappingsKey]
}
