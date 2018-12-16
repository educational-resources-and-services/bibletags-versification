import assert from 'assert'
import { getCorrespondingRef } from '../src/versification'

const kjvInfo = {
  versificationModel: 'kjv',
  extraVerseMappings: {
    // jsdlfkjsfd
  },
}

const nivInfo = {
  versificationModel: 'kjv',
  extraVerseMappings: {
    "40017014": "40017014",
    "40017015": "40017015",
    }
}
describe('getCorrespondingRef', () => {
  
  describe('Bad parameters', () => {
    //NOTE: functions should return false (not null) when there are bad parameters, no matter which part of the parameter was bad
    //TODO: error msgs in place for bad parameters? if not, where should they be?

    //bad bookId
    it('Bad bookId [book 68] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 68,
            chapter: 1,
            verse: 1,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    //bad chapter
    it('bad chapter [Gen 55] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 55,
            verse: 1,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    //bad verse
    it('bad verse [Gen 1:33] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 33,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    //bad wordRange
    it('wordRange given (will be ignored) (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 1,
            wordRange: [5, 9],
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:1,
          chapter: 1,
          verse: 1,
        }
      ])
    })

  })

  describe('No valid verses in the corresponding version (original -> translation)', () => {

    // TODO: do some with partialScope, extraVerseMappings, skipsUnlikelyOriginals

    it('Isaiah 46:1 = null (original -> LXX)', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 24,
            chapter: 46,
            verse: 1,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: {
          versificationModel: 'lxx',
        },
      })

      assert.deepEqual(correspondingVerseLocations, [])
    })

  })

  describe('No valid verses in the corresponding version (translation -> original)', () => {

    // TODO: do some with partialScope and extraVerseMappings

  })

  describe('No valid verses in the corresponding version (translation -> translation)', () => {

    // TODO: do some with partialScope and extraVerseMappings

  })

  describe('Has a valid verse in the corresponding version (original -> translation)', () => {

    // TODO: do some with partialScope and extraVerseMappings

    it('Genesis 1:1 (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 1,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:1,
          chapter: 1,
          verse: 1,
        }
      ])
    })

    it('Matthew 17:13 (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 13,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 13,
        }
      ])
    })
  

    it('Extra Verse Mappings orig NIV', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 14,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: nivInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 14,
        },
      ])
    })

    it('Matthew 20:4 (original -> KJV)', () => {
     
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 4,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 20,
          verse: 4,
          wordRange: [1, 18],
        },
      ])
    })
  })  

  describe('Has open-ended end of verse', () => {

    it('Matthew 17:15 (original -> KJV)', () => {       // "40017015:1-2": "40017014:20-", "40017015:3-": "40017015",
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 15,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 14,
          wordRange: [20, null], //wordRange: [20, 21]
        },
        {
          bookId:40,
          chapter: 17,
          verse: 15
        },
      ])
    })

    it('Matthew 20:5 (original -> KJV)', () => {                //"40020005:1-3": "40020004:19-", "40020005:4-": "40020005",
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 5,
          },
          info: {
            versificationModel: 'original'
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 20,
          verse: 4,
          wordRange: [19, null], //wordRange: [19, 23]
        },
        {
          bookId:40,
          chapter: 20,
          verse: 5,
        },
      ])
    })

  })

  describe('Has a valid verse in the corresponding version (translation -> original)', () => {

    // TODO: do some with partialScope and extraVerseMappings

  })

  describe('Has a valid verse in the corresponding version (translation -> translation)', () => {

    // TODO: do some with partialScope and extraVerseMappings

    it('extraVerseMappings open ended Mat 17:14 (KJV -> NIV)', () => {
      const correspondingVerseLocations = getCorrespondingRef({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 14,
          },
          info: kjvInfo,
        },
        lookupVersionInfo: nivInfo,
      })
  
      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 14,
        },
        {
          bookId:40,
          chapter: 17,
          verse: 15,
          wordRange: [1, 2],
        },
      ])
    })

  })

  describe('Has multiple valid verses in the corresponding version (original -> translation)', () => {

    // TODO: do some with partialScope and extraVerseMappings

  })

  describe('Has multiple valid verses in the corresponding version (translation -> original)', () => {

    // TODO: do some with partialScope and extraVerseMappings

  })

  describe('Has multiple valid verses in the corresponding version (translation -> translation)', () => {

    // TODO: do some with partialScope and extraVerseMappings

  })

})
