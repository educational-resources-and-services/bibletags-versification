import assert from 'assert'
import { isValidVerseInOriginal } from '../src/versification'

describe('Versification', () => {

  describe('isValidVerseInOriginal', () => {
  
    describe('Bad parameters', () => {

      it('should return false if missing parameters', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 1, chapter: 1 })
        assert.equal(isValidVerse, false)
      })

      it('should return false if there is a non-integer parameters', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 1, chapter: 1, verse: 'A' })
        assert.equal(isValidVerse, false)
      })

    })

  })

})