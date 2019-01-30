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

const fakeVersionOneInfo = {      //fakeVersion for bad parameter testing: absent/invalid versificationModel
  versificationModel: '',
  skipsUnlikelyOriginals: true,
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

    //bad (null) and high (false) bookIds
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

    it('baseVersion has partialScope but bookId is outside of the scope, + high bookId (original -> SYN)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 70,
            chapter: 1,
            verse: 1,
          },
          info: uhbOriginalInfo,
        },
        lookupVersionInfo: synodalInfo,
      })

      assert.deepEqual(correspondingVerseLocations, null) //null instead of false because the partalScope parameter is being caught first
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

    //bad (null) and high (false) chapters
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

    //bad (null) and high (false) verses
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

    it('versificationModel is absent/invalid (original -> fakeVersionOne)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 47,
            chapter: 6,
            verse: 3,
          },
          info: ugntOriginalInfo,
        },
        lookupVersionInfo: fakeVersionOneInfo,
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

    // TODO: Test no valid verse in corresponding version with partialScope? With Vulgate?
    // TODO: Test no valid verse in corresponding version with extraVerseMappings? How?

  })

  describe('No valid verses in the corresponding version (translation -> original)', () => {

    // TODO: do some with partialScope and extraVerseMappings

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

    it('Matthew 17:13 (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingRefs({
        baseVersion: {
          ref: {
            bookId: 40,
            chapter: 17,
            verse: 13,
          },
          info: ugntOriginalInfo,
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
            bookId: 40,              // TODO: this is almost the same as the test above, change this to OT or different version???
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

    // TODO: try with other partialScope values, etc...

  })  

  describe('Has a valid verse in the corresponding version (translation -> original)', () => {

    // TODO: do some with partialScope and extraVerseMappings

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

    // TODO: do some with partialScope and extraVerseMappings

  })

  describe('Has multiple valid verses in the corresponding version (translation -> original)', () => {

    // TODO: do some with partialScope and extraVerseMappings

  })

})
