import assert from 'assert'
import { getCorrespondingRefs } from '../src/versification'

const uhbOriginalInfo = {
  versificationModel: 'original',
  partialScope: 'ot',
}
 
const ugntOriginalInfo = {
  versificationModel: 'original',
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
  skipsUnlikelyOriginals: true,
}

const esvInfo = {
  versificationModel: 'kjv',
  extraVerseMappings: {
    // jsdlfkjsfd
  },
  skipsUnlikelyOriginals: true,
}

describe('getCorrespondingRefs', () => {
  
  describe('Bad and "bad" parameters (both truly bad parameters, and those which we just dont know)', () => {
    //NOTE: functions should return NULL for a true bad parameter (not false). Functions should return FALSE if no corresponding verse.
    //TODO: error msgs in place for bad parameters? if not, where should they be?

    //bad (null) and high (false) bookIds
    // it('high bookId [book 68] (original -> KJV)', () => {
    //   const correspondingVerseLocations = getCorrespondingRefs({
    //     baseVersion: {
    //       ref: {
    //         bookId: 68,
    //         chapter: 1,
    //         verse: 1,
    //       },
    //       info: ugntOriginalInfo,
    //     },
    //     lookupVersionInfo: kjvInfo,
    //   })

    //   assert.deepEqual(correspondingVerseLocations, false)
    // })

    // it('high bookId [book 70] + bad partial scope (original -> SYN)', () => {
    //   const correspondingVerseLocations = getCorrespondingRefs({
    //     baseVersion: {
    //       ref: {
    //         bookId: 70,
    //         chapter: 1,
    //         verse: 1,
    //       },
    //       info: uhbOriginalInfo,
    //     },
    //     lookupVersionInfo: synodalInfo,
    //   })

    //   assert.deepEqual(correspondingVerseLocations, null) //null instead of false because the bad partalScope parameter is being caught first
    // })

    it('bad bookId [book Macabees] (ESV -> orig)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 'Macabees',
            chapter: 1,
            verse: 1,
          },
          info: esvInfo,
        },
        lookupVersionInfo: ugntOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    // //bad (null) and high (false) chapters
    // it('high chapter [Gen 55] (original -> KJV)', () => {
    //   const correspondingVerseLocations = getCorrespondingRefs({
    //     baseVersion: {
    //       ref: {
    //         bookId: 1,
    //         chapter: 55,
    //         verse: 1,
    //       },
    //       info: uhbOriginalInfo,
    //     },
    //     lookupVersionInfo: kjvInfo,
    //   })

    //   assert.deepEqual(correspondingVerseLocations, false)
    // })

    // it('bad chapter [1Sam 0] (original -> NIV)', () => {
    //   const correspondingVerseLocations = getCorrespondingRefs({
    //     baseVersion: {
    //       ref: {
    //         bookId: 9,
    //         chapter: 0,
    //         verse: 1,
    //       },
    //       info: uhbOriginalInfo,
    //     },
    //     lookupVersionInfo: nivInfo,
    //   })

    //   assert.deepEqual(correspondingVerseLocations, null)
    // })

    // //bad (null) and high (false) verses
    // it('high verse [Gen 1:33] (original -> KJV)', () => {
    //   const correspondingVerseLocations = getCorrespondingRefs({
    //     baseVersion: {
    //       ref: {
    //         bookId: 1,
    //         chapter: 1,
    //         verse: 33,
    //       },
    //       info: uhbOriginalInfo,
    //     },
    //     lookupVersionInfo: kjvInfo,
    //   })

    //   assert.deepEqual(correspondingVerseLocations, false)
    // })

    // it('bad verse [Rom 5:-3] (original -> SYN)', () => {
    //   const correspondingVerseLocations = getCorrespondingRefs({
    //     baseVersion: {
    //       ref: {
    //         bookId: 45,
    //         chapter: 5,
    //         verse: -3,
    //       },
    //       info: ugntOriginalInfo,
    //     },
    //     lookupVersionInfo: synodalInfo,
    //   })

    //   assert.deepEqual(correspondingVerseLocations, null)
    // })

    // //wordRanges: wordRanges given will be ignored
    // it('user gives wordRange (will be ignored) (original -> KJV)', () => {
    //   const correspondingVerseLocations = getCorrespondingRefs({
    //     baseVersion: {
    //       ref: {
    //         bookId: 1,
    //         chapter: 1,
    //         verse: 1,
    //         wordRanges: ["5-9"],
    //       },
    //       info: uhbOriginalInfo,
    //     },
    //     lookupVersionInfo: kjvInfo,
    //   })

    //   assert.deepEqual(correspondingVerseLocations, [
    //     {
    //       bookId:1,
    //       chapter: 1,
    //       verse: 1,
    //     }
    //   ])
    // })

  })

  // describe('No valid verses in the corresponding version (original -> translation)', () => {

  //   it('Isaiah 46:1 = no valid verse in corresponding version (original -> LXX)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 24,
  //           chapter: 46,
  //           verse: 1,
  //         },
  //         info: uhbOriginalInfo,
  //       },
  //       lookupVersionInfo: lxxInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [])
  //   })

  //   it('Matthew 12:47 = no valid verse in corresponding version b/c SkipsUnlikelyOriginals (original -> ESV)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 40,
  //           chapter: 12,
  //           verse: 47,
  //         },
  //         info: ugntOriginalInfo,
  //       },
  //       lookupVersionInfo: esvInfo,
  //     })
  //     assert.deepEqual(correspondingVerseLocations, [])
  //   })

  //   // TODO: Test no valid verse in corresponding version with partialScope? With Vulgate?
  //   // TODO: Test no valid verse in corresponding version with extraVerseMappings? How?

  // })

  // describe('No valid verses in the corresponding version (translation -> original)', () => {

  //   // TODO: do some with partialScope and extraVerseMappings
  //   // TODO: write test for Esther 10:4 LXX (not in the original)
  // })

  // describe('Has a valid verse in the corresponding version (original -> translation)', () => {

  //   it('Genesis 1:1 (original -> KJV)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 1,
  //           chapter: 1,
  //           verse: 1,
  //         },
  //         info: uhbOriginalInfo,
  //       },
  //       lookupVersionInfo: kjvInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId: 1,
  //         chapter: 1,
  //         verse: 1,
  //       }
  //     ])
  //   })

  //   it('Matthew 17:13 (original -> KJV)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 40,
  //           chapter: 17,
  //           verse: 13,
  //         },
  //         info: ugntOriginalInfo,
  //       },
  //       lookupVersionInfo: kjvInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId:40,
  //         chapter: 17,
  //         verse: 13,
  //       }
  //     ])
  //   })
  
  //   it('Matthew 17:14 testing extraVerseMappings (original -> NIV)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 40,
  //           chapter: 17,
  //           verse: 14,
  //         },
  //         info: ugntOriginalInfo,
  //       },
  //       lookupVersionInfo: nivInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId:40,
  //         chapter: 17,
  //         verse: 14,
  //       },
  //     ])
  //   })

  //   it('Matthew 20:4 testing wordRanges (original -> KJV)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 40,
  //           chapter: 20,
  //           verse: 4,
  //         },
  //         info: ugntOriginalInfo,
  //       },
  //       lookupVersionInfo: kjvInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId:40,
  //         chapter: 20,
  //         verse: 4,
  //         wordRanges: ["1-18"],
  //       },
  //     ])
  //   })

  //   it('Matthew 17:15 testing open-ended wordRanges (original -> KJV)', () => {    // "40017015:1-2": "40017014:20-", "40017015:3-": "40017015",
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 40,
  //           chapter: 17,
  //           verse: 15,
  //         },
  //         info: ugntOriginalInfo,
  //       },
  //       lookupVersionInfo: kjvInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId:40,
  //         chapter: 17,
  //         verse: 14,
  //         wordRanges: ["20-"], //wordRanges: ["20-21"]
  //       },
  //       {
  //         bookId:40,
  //         chapter: 17,
  //         verse: 15
  //       },
  //     ])
  //   })

  //   it('Matthew 20:5 testing open-ended wordRanges (original -> KJV)', () => {    //"40020005:1-3": "40020004:19-", "40020005:4-": "40020005",
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 40,              // TODO: this is almost the same as the test above, change this to OT or different version???
  //           chapter: 20,
  //           verse: 5,
  //         },
  //         info: ugntOriginalInfo,
  //       },
  //       lookupVersionInfo: kjvInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId:40,
  //         chapter: 20,
  //         verse: 4,
  //         wordRanges: ["19-"], //wordRanges: ["19-23"]
  //       },
  //       {
  //         bookId:40,
  //         chapter: 20,
  //         verse: 5,
  //       },
  //     ])
  //   })

  //   it('Matthew 20:5 testing skipsUnlikelyOriginals AND open-ended wordRanges  (original -> ESV)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 40,
  //           chapter: 20,
  //           verse: 5,
  //         },
  //         info: ugntOriginalInfo,
  //       },
  //       lookupVersionInfo: esvInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId:40,
  //         chapter: 20,
  //         verse: 4,
  //         wordRanges: ["19-"], //wordRanges: ["19-23"]
  //       },
  //       {
  //         bookId:40,
  //         chapter: 20,
  //         verse: 5,
  //       },
  //     ])
  //   })

  //   it('Exodus 25:5 testing input of null partialScope (original -> fakeversion)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 2,
  //           chapter: 25,
  //           verse: 5,
  //         },
  //         info: uhbOriginalInfo,
  //       },
  //       lookupVersionInfo: {
  //         versificationModel: 'original',
  //         partialScope: null,
  //       },
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId:2,
  //         chapter: 25,
  //         verse: 5,
  //       },
  //     ])
  //   })

  //   // TODO: try with other partialScope values, etc...

  // })  

  // describe('Has a valid verse in the corresponding version (translation -> original)', () => {

  //   // TODO: do some with partialScope and extraVerseMappings

  //   it('Exodus 25:5 testing input of null partialScope (fakeversion -> original)', () => {
  //     const correspondingVerseLocations = getCorrespondingRefs({
  //       baseVersion: {
  //         ref: {
  //           bookId: 2,
  //           chapter: 25,
  //           verse: 5,
  //         },
  //         info: {
  //           versificationModel: 'original',
  //           partialScope: null,
  //         }
  //       },
  //       lookupVersionInfo: uhbOriginalInfo,
  //     })

  //     assert.deepEqual(correspondingVerseLocations, [
  //       {
  //         bookId:2,
  //         chapter: 25,
  //         verse: 5,
  //       },
  //     ])
  //   })

  // })

  // describe('Has multiple valid verses in the corresponding version (original -> translation)', () => {

  //   // TODO: do some with partialScope and extraVerseMappings

  // })

  // describe('Has multiple valid verses in the corresponding version (translation -> original)', () => {

  //   // TODO: do some with partialScope and extraVerseMappings

  // })

})
