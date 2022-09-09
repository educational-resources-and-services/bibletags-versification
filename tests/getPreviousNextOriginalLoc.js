import assert from 'assert'
import { getPreviousOriginalLoc, getNextOriginalLoc } from '../src/versification'

describe('getPreviousNextOriginalLoc', () => {
  
  describe('getPreviousOriginalLoc', () => {

    it('Genesis 1:1', () => {
      const loc = getPreviousOriginalLoc(`01001001`)
      assert.equal(loc, null)
    })

    it('Genesis 1:31', () => {
      const loc = getPreviousOriginalLoc(`01001031`)
      assert.equal(loc, `01001030`)
    })

    it('Genesis 2:1', () => {
      const loc = getPreviousOriginalLoc(`01002001`)
      assert.equal(loc, `01001031`)
    })

    it('Genesis 50:26', () => {
      const loc = getPreviousOriginalLoc(`01050026`)
      assert.equal(loc, `01050025`)
    })

    it('Exodus 1:1', () => {
      const loc = getPreviousOriginalLoc(`02001001`)
      assert.equal(loc, `01050026`)
    })
  })
  
  describe('getNextOriginalLoc', () => {

    it('Genesis 1:1', () => {
      const loc = getNextOriginalLoc(`01001001`)
      assert.equal(loc, `01001002`)
    })

    it('Genesis 1:31', () => {
      const loc = getNextOriginalLoc(`01001031`)
      assert.equal(loc, `01002001`)
    })

    it('Genesis 2:1', () => {
      const loc = getNextOriginalLoc(`01002001`)
      assert.equal(loc, `01002002`)
    })

    it('Genesis 50:26', () => {
      const loc = getNextOriginalLoc(`01050026`)
      assert.equal(loc, `02001001`)
    })

    it('Revelation 22:21', () => {
      const loc = getNextOriginalLoc(`66022021`)
      assert.equal(loc, null)
    })

  })
  
})
