import assert from 'assert'
import { getCorrespondingVerseLocation } from '../src/versification'

describe('getCorrespondingVerseLocation', () => {
  
  describe('Bad parameters', () => {

    // TODO

  })

  describe('No valid verses in the corresponding version (original -> translation)', () => {

    // TODO: do some with partialScope and extraVerseMappings

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
      const correspondingVerseLocations = getCorrespondingVerseLocation({
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
        lookupVersionInfo: {
          versificationModel: 'kjv',
        },
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
      const correspondingVerseLocations = getCorrespondingVerseLocation({
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
        lookupVersionInfo: {
          versificationModel: 'kjv',
        },
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 13,
        }
      ])
    })
  })

  describe('Has verse word ranges', () =>{
    
    it('Matthew 17:14 (original -> KJV)', () => {
      const correspondingVerseLocations = getCorrespondingVerseLocation({
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
        lookupVersionInfo: {
          versificationModel: 'kjv',
        },
      })

      assert.deepEqual(correspondingVerseLocations, [
        {
          bookId:40,
          chapter: 17,
          verse: 14,
          wordRange: [1, 19],
        },
      ])
    })

    it('Matthew 20:4 (original -> KJV)', () => {
     
      const correspondingVerseLocations = getCorrespondingVerseLocation({
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
        lookupVersionInfo: {
          versificationModel: 'kjv',
        },
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
      const correspondingVerseLocations = getCorrespondingVerseLocation({
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
        lookupVersionInfo: {
          versificationModel: 'kjv',
        },
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
      const correspondingVerseLocations = getCorrespondingVerseLocation({
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
        lookupVersionInfo: {
          versificationModel: 'kjv',
        },
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
