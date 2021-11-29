import assert from 'assert'
import { getOriginalLocsFromRange } from '../src/versification'

describe('getOriginalLocsFromRange', () => {
  
  describe('Bad parameters', () => {

    it('should return empty arrary if two different books', () => {
      const locs = getOriginalLocsFromRange(`03001001`, `02001005`)
      assert.deepEqual(locs, [])
    })

    it('should return empty arrary if not in order', () => {
      const locs = getOriginalLocsFromRange(`02002001`, `02001001`)
      assert.deepEqual(locs, [])
    })

  })

  describe('Valid passages', () => {

    it('Genesis 1:1-5', () => {
      const locs = getOriginalLocsFromRange(`01001001`, `01001005`)
      assert.deepEqual(locs, [
        `01001001`,
        `01001002`,
        `01001003`,
        `01001004`,
        `01001005`,
      ])
    })

    it('Genesis 1:31-3:3 (multiple chapters)', () => {
      const locs = getOriginalLocsFromRange(`01001031`, `01003003`)
      assert.deepEqual(locs, [
        `01001031`,
        `01002001`,
        `01002002`,
        `01002003`,
        `01002004`,
        `01002005`,
        `01002006`,
        `01002007`,
        `01002008`,
        `01002009`,
        `01002010`,
        `01002011`,
        `01002012`,
        `01002013`,
        `01002014`,
        `01002015`,
        `01002016`,
        `01002017`,
        `01002018`,
        `01002019`,
        `01002020`,
        `01002021`,
        `01002022`,
        `01002023`,
        `01002024`,
        `01002025`,
        `01003001`,
        `01003002`,
        `01003003`,
      ])
    })

    it('Genesis 1:1 (single verse)', () => {
      const locs = getOriginalLocsFromRange(`01001001`, `01001001`)
      assert.deepEqual(locs, [
        `01001001`,
      ])
    })

    it('Genesis 1:1b-3 (partial start verse)', () => {
      const locs = getOriginalLocsFromRange(`01001001:4-6`, `01001003`)
      assert.deepEqual(locs, [
        `01001001:4-6`,
        `01001002`,
        `01001003`,
      ])
    })

  })
  
})
