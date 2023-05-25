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

const mhntInfo = {
  versificationModel: 'kjv',
  partialScope: 'nt',
}

describe('getCorrespondingRefs', () => {
  
  describe('Bad parameters', () => {
    /*
      Return null if there is a bad parameter. I.e.: 
        neither base nor lookup is original language version
        invalid info
          versificationModel is absent or not valid
          partialScope is invalid
          extraVerseMappings is present but not an object
          skipsUnlikelyOriginals is present but not a boolean
        bookId, chapter or verse are not integers
        bookId or chapter < 1
        verse is < 0
        baseVersion has partialScope and bookId is outside that scope (ie. ot must have bookId between 1-39, nt must have bookId between 40-66)
      Return false if parameters are valid, but there is no corresponding passage in the lookup version
    */
        

    //TODO: error msgs in place for bad parameters? if not, where should they be?

    //bad (null) bookIds

    it('baseVersion has partialScope but bookId is outside of the scope (original -> SYN)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 58,
            chapter: 1,
            verse: 1,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: synodalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

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

    //bad (null) chapters

    it('chapter < 1 [1Sam 0] (original -> NIV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 9,
            chapter: 0,
            verse: 1,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: nivInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    it('chapter is not an integer (ESV -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 28,
            chapter: 'nine',
            verse: 2,
          },
          info: esvInfo,
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    //bad (null) verses

    it('verse < 0 [Rom 5:-3] (original -> SYN)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 45,
            chapter: 5,
            verse: -3,
          },
          info: ugntOriginalInfo,
        },
        lookupVersionInfo: synodalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    it('verse is not an integer (NIV -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 50,
            chapter: 5,
            verse: 'five',
          },
          info: nivInfo,
        },
        lookupVersionInfo: ugntOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    //wordRanges: wordRanges given will be ignored
    it('user gives wordRange (will be ignored) (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 1,
            wordRanges: ["5-9"],
          },
          info: uhbOriginalInfo,
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

    //other bad parameters
    it('neither baseVersion nor LookupVersion is original (KJV -> ESV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 47,
            chapter: 6,
            verse: 3,
          },
          info: kjvInfo,
        },
        lookupVersionInfo: esvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    it('versificationModel is absent/invalid (original -> fakeversion)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 47,
            chapter: 6,
            verse: 3,
          },
          info: ugntOriginalInfo,
        },
        lookupVersionInfo: {
          versificationModel: '',
          skipsUnlikelyOriginals: true,
        },
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    it('extraVerseMappings is present but not an object (original -> fakeversion', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 16,
            chapter: 2,
            verse: 3,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: {
          versificationModel: 'original',
          extraVerseMappings: "40017014",
        },  
      })

      assert.deepEqual(correspondingVerseLocations, null)
    })

    it('skipsUnlikelyOriginals is present but not boolean (original -> fakeversion', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 16,
            chapter: 2,
            verse: 3,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: {
          versificationModel: 'original',
          skipsUnlikelyOriginals: 86,
        },  
      })
      
      assert.deepEqual(correspondingVerseLocations, null)
    })

  })

  describe('No valid verses in the corresponding version (original -> translation)', () => {

    it('Isaiah 46:1 = no valid verse in corresponding version (original -> LXX)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 24,
            chapter: 46,
            verse: 1,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: lxxInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [])
    })

    it('Matthew 12:47 = no valid verse in corresponding version b/c SkipsUnlikelyOriginals (original -> ESV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 12,
            verse: 47,
          },
          info: ugntOriginalInfo,
        },
        lookupVersionInfo: esvInfo,
      })
      assert.deepEqual(correspondingVerseLocations, [])
    })

    it('Matthew 12:47 + directionToTryIfSkipped:`next` (original -> ESV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 12,
            verse: 47,
          },
          info: ugntOriginalInfo,
        },
        lookupVersionInfo: esvInfo,
        directionToTryIfSkipped: `next`,
      })
      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 40,
          chapter: 12,
          verse: 48,
        },
      ])
    })

    it('Matthew 12:47 + directionToTryIfSkipped:`previous` (original -> ESV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 12,
            verse: 47,
          },
          info: ugntOriginalInfo,
        },
        lookupVersionInfo: esvInfo,
        directionToTryIfSkipped: `previous`,
      })
      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 40,
          chapter: 12,
          verse: 46,
        },
      ])
    })

    it('1Chron 6:8 = no valid verse in corresponding version b/c partialScope (original -> MHNT)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 13,
            chapter: 6,
            verse: 8,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: mhntInfo,
      })
      assert.deepEqual(correspondingVerseLocations, false)
    })

    it('high verse [Gen 1:33] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 33,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    it('high chapter [Gen 55] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 55,
            verse: 1,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    it('high bookId [book 68] (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 68,
            chapter: 1,
            verse: 1,
          },
          info: ugntOriginalInfo,
        },
        lookupVersionInfo: kjvInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

  })

  describe('No valid verses in the corresponding version (translation -> original)', () => {

    it('Esther 10:4 (LXX -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 17,
            chapter: 10,
            verse: 4,
          },
          info: lxxInfo,
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

    it('high bookId [book 67] (NIV -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 67,
            chapter: 5,
            verse: 2,
          },
          info: nivInfo,
        },
        lookupVersionInfo: ugntOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, false)
    })

  })

  describe('Has a valid verse in the corresponding version (original -> translation)', () => {

    it('Genesis 1:1 (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 1,
          },
          info: uhbOriginalInfo,
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

    it('Psalm 11:6 (original -> SYN)', () => {        //SYN "19011001-007": -1000,
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 19,
            chapter: 11,
            verse: 6,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: synodalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:19,
          chapter: 10,
          verse: 6,
        }
      ])
    })
  
    it('Matthew 17:14 testing extraVerseMappings (original -> NIV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 14,
          },
          info: ugntOriginalInfo,
        },
        lookupVersionInfo: nivInfo,
        directionToTryIfSkipped: `previous`,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 14,
        },
      ])
    })

    it('Matthew 20:4 testing wordRanges (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 4,
          },
          info: ugntOriginalInfo,
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

    it('Exodus 25:5 testing input of null partialScope (original -> fakeversion)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 2,
            chapter: 25,
            verse: 5,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: {
          versificationModel: 'original',
          partialScope: null,
        },
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:2,
          chapter: 25,
          verse: 5,
        },
      ])
    })

  })  

  describe('Has a valid verse in the corresponding version (translation -> original)', () => {

    it('Genesis 1:1 (KJV -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 1,
            chapter: 1,
            verse: 1,
          },
          info: kjvInfo,
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 1,
          chapter: 1,
          verse: 1,
        }
      ])
    })

    it('Psalm 11:6 (SYN -> original)', () => {        //SYN "19011001-007": -1000,
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 19,
            chapter: 10,
            verse: 6,
          },
          info: synodalInfo,
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:19,
          chapter: 11,
          verse: 6,
        }
      ])
    })
  
    it('Matthew 17:14 testing extraVerseMappings (NIV -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 14,
          },
          info: nivInfo,
        },
        lookupVersionInfo: ugntOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 14,
        },
      ])
    })

    it('Matthew 17:15 testing open-ended wordRanges (KJV -> original)', () => {    // "40017015:1-2": "40017014:20-", "40017015:3-": "40017015",
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 15,
          },
          info: kjvInfo,
        },
        lookupVersionInfo: ugntOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 15,
          wordRanges: ["3-"],
        },
      ])
    })

    it('Exodus 25:5 testing input of null partialScope (fakeversion -> original)', () => {
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

  })

  describe('Has multiple valid verses in the corresponding version (original -> translation)', () => {

    it('Matthew 17:15 testing open-ended wordRanges (original -> KJV)', () => {    // "40017015:1-2": "40017014:20-", "40017015:3-": "40017015",
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 15,
          },
          info: ugntOriginalInfo,
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

    it('Matthew 20:5 testing open-ended wordRanges (original -> KJV)', () => {    //"40020005:1-3": "40020004:19-", "40020005:4-": "40020005",
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 5,
          },
          info: ugntOriginalInfo,
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

    it('Matthew 20:5 testing skipsUnlikelyOriginals AND open-ended wordRanges  (original -> ESV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 5,
          },
          info: ugntOriginalInfo,
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

  })

  describe('Has multiple valid verses in the corresponding version (translation -> original)', () => {

    it('Matthew 20:4 testing wordRanges (KJV -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 20,
            verse: 4,
          },
          info: kjvInfo,
        },
        lookupVersionInfo: ugntOriginalInfo,
      })
      
      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 20,
          verse: 4,
        },
        {
          bookId:40,
          chapter: 20,
          verse: 5,
          wordRanges: ["1-3"],
        },
      ])
    })
  })

  describe('Complex word ranges', () => {

    it('Numbers 25:19 (original -> FAKE)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 4,
            chapter: 25,
            verse: 19,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: {
          versificationModel: 'kjv',
          extraVerseMappings: {
            '04025019:1-2,4': '04026001:1-5',
            '04025019:3': '04026001:8-10,6',
            '04026001': '04026001:7,11-',
          },
          skipsUnlikelyOriginals: true,
        },
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 4,
          chapter: 26,
          verse: 1,
          wordRanges: [
            "1-6",
            "8-10",
          ],
        },
      ])
    })

    it('Numbers 26:1 (FAKE -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 4,
            chapter: 26,
            verse: 1,
          },
          info: {
            versificationModel: 'kjv',
            extraVerseMappings: {
              '04025019:1-2,4-': '04026001:1-5',
              '04025019:3': '04026001:6,8-10',
              '04026001': '04026001:7,11-',
            },
            skipsUnlikelyOriginals: true,
          },
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 4,
          chapter: 25,
          verse: 19,
        },
        {
          bookId: 4,
          chapter: 26,
          verse: 1,
        },
      ])
    })

    it('Numbers 26:1 (FAKE -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 4,
            chapter: 26,
            verse: 1,
          },
          info: {
            versificationModel: 'kjv',
            extraVerseMappings: {
              '04025019:1-2,4': '04026001:1-5',
              '04025019:3': '04026002:1',
              '04026001': '04026001:7,11-',
            },
            skipsUnlikelyOriginals: true,
          },
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 4,
          chapter: 25,
          verse: 19,
          wordRanges: [
            "1-2",
            "4",
          ],
        },
        {
          bookId: 4,
          chapter: 26,
          verse: 1,
        },
      ])
    })

    it('Psalm 18:0 (FAKE -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 19,
            chapter: 18,
            verse: 0,
          },
          info: {
            versificationModel: 'kjv',
            extraVerseMappings: {
              "19018002:1-1": "19018000:44-45",
            },
          },
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 19,
          chapter: 18,
          verse: 2,
          wordRanges: [
            "1",
          ],
        },
      ])
    })

    it('Psalm 18:1 (FAKE -> original)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 19,
            chapter: 18,
            verse: 1,
          },
          info: {
            versificationModel: 'kjv',
            extraVerseMappings: {
              "19018002:1-2": "19018000:44-45",
              "19018002:3-": "19018001:1-3",
              "19018003:2": "19018001:4-10",
            },
          },
        },
        lookupVersionInfo: uhbOriginalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 19,
          chapter: 18,
          verse: 2,
          wordRanges: [
            "3-",
          ],
        },
        {
          bookId: 19,
          chapter: 18,
          verse: 3,
          wordRanges: [
            "2",
          ],
        },
      ])
    })

    it('Psalm 18:2 (original -> FAKE)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 19,
            chapter: 18,
            verse: 2,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: {
          versificationModel: 'kjv',
          extraVerseMappings: {
            "19018002:1-": "19018000:44-45",
          },
        },
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId: 19,
          chapter: 18,
          verse: 0,
          wordRanges: [
            "44-45",
          ],
        },
      ])
    })

  })

})
