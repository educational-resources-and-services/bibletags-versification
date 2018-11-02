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
            bookId:1,
            chapter: 1,
            verse: 1,
          },
          info: {
            versificationModel:'original'
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
