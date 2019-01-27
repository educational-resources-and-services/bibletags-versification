import assert from 'assert'
import { getCorrespondingRefs } from '../src/versification'

const uhbOriginalInfo = {
  versificationModel: 'original',
  partialScope: 'ot',
}

const ugntOriginalInfo = {
  versificationModel: 'kjv',
  partialScope: 'nt',
}

const kjvInfo = {
  versificationModel: 'kjv',
  extraVerseMappings: {             
    // jsdlfkjsfd
  },
}

const synodalInfo = {
  versificationModel: 'synodal',
  extraVerseMappings: {
    // jsdlfkjsfd
  },
}

const lxxInfo = {
  versificationModel: 'lxx',
  extraVerseMappings: {
    // jsdlfkjsfd
  },
}

const nivInfo = {
  versificationModel: 'kjv',
  extraVerseMappings: {
    "40017014": "40017014",
    "40017015": "40017015",
  },
}

const esvInfo = {
  versificationModel: 'kjv',
  extraVerseMappings: {
    // jsdlfkjsfd
  },
  skipsUnlikelyOriginals: true,
}

describe('getCorrespondingRefs', () => {
  
  describe('Bad parameters', () => {
    //NOTE: functions should return false (not null) when there are bad parameters, no matter which part of the parameter was bad
    //TODO: error msgs in place for bad parameters? if not, where should they be?

    //bad bookId
    it('Bad bookId [book 68] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 68,
            chapter: 1,
            verse: 1,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'nt',
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    //bad bookId + wrong partialScope
    it('Bad bookId [book 70] (original -> SYN)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 70,
            chapter: 1,
            verse: 1,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'ot',
          }
        },
        lookupVersionInfo: synodalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    //bad chapter
    it('bad chapter [Gen 55] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 55,
            verse: 1,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'ot',
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    //bad verse
    it('bad verse [Gen 1:33] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 33,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'ot',
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    //bad wordRanges
    it('wordRanges given (will be ignored) (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 1,
            wordRanges: ["5-9"],
          },
          info: {
            versificationModel: 'original',
            partialScope: 'ot',
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
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 24,
            chapter: 46,
            verse: 1,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'ot',
          }
        },
        lookupVersionInfo: lxxInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [])
    })

  })

  describe('No valid verses in the corresponding version (translation -> original)', () => {

    // TODO: do some with partialScope and extraVerseMappings

  })

  describe('Has a valid verse in the corresponding version (original -> translation)', () => {

    // TODO: do some with partialScope and extraVerseMappings

    it('Genesis 1:1 (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 1,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'ot',
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 1,
          chapter: 1,
          verse: 1,
        }
      ])
    })

    it('Matthew 17:13 (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 13,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'nt',
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
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 14,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'nt',
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
     
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 4,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'nt',
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 20,
          verse: 4,
          wordRanges: ["1-18"],
        },
      ])
    })
  })  

  describe('Has open-ended end of verse', () => {

    it('Matthew 17:15 (original -> KJV)', () => {       // "40017015:1-2": "40017014:20-", "40017015:3-": "40017015",
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 15,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'nt',
          }
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 14,
          wordRanges: ["20-"], //wordRanges: ["20-21"]
        },
        {
          bookId:40,
          chapter: 17,
          verse: 15
        },
      ])
    })

    it('Matthew 20:5 (original -> KJV)', () => {                //"40020005:1-3": "40020004:19-", "40020005:4-": "40020005",
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 5,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'nt',
          },
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 20,
          verse: 4,
          wordRanges: ["19-"], //wordRanges: ["19-23"]
        },
        {
          bookId:40,
          chapter: 20,
          verse: 5,
        },
      ])
    })

    it('SkipsUnlikelyOriginals Matthew 20:5 (original -> ESV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 5,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'nt',
          }
        },
        lookupVersionInfo: esvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 20,
          verse: 4,
          wordRanges: ["19-"], //wordRanges: ["19-23"]
        },
        {
          bookId:40,
          chapter: 20,
          verse: 5,
        },
      ])
    })

    it('SkipsUnlikelyOriginals Matthew 12:47 (original -> ESV) "40012047": null,', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 12,
            verse: 47,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'nt',
          }
        },
        lookupVersionInfo: esvInfo,
      })
      assert.deepEqual(correspondingVerseLocations, [])
    })

  })

  describe('Has a valid verse in the corresponding version (translation -> original)', () => {

    // TODO: do some with partialScope and extraVerseMappings

    it('Exodus 25:5 (fakeversion -> original) *null* partialScope', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 2,
            chapter: 25,
            verse: 5,
          },
          info: {
            versificationModel: 'original',
            partialScope: null,
          }
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:2,
          chapter: 25,
          verse: 5,
        },
      ])
    })

    it('Exodus 25:5 (original -> fakeversion) *null* partialScope', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 2,
            chapter: 25,
            verse: 5,
          },
          info: {
            versificationModel: 'original',
            partialScope: 'ot',
          }
        },
        lookupVersionInfo: {
          versificationModel: 'original',
          partialScope: null,
        },
      })

      //assert.deepEqual(correspondingVerseLocations, null)
      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:2,
          chapter: 25,
          verse: 5,
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

})
