import assert from 'assert'
import { isValidVerseInOriginal } from '../src/versification'

describe('Versification', () => {

  describe('isValidVerseInOriginal', () => {
  
    describe('Bad parameters', () => {

      it('should return false if missing bookId', () => {
        var isValidVerse = isValidVerseInOriginal({ chapter: 1, verse: 1 })
        assert.equal(isValidVerse, false)
      })

      it('should return false if missing chapter', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 1, verse: 1 })
        assert.equal(isValidVerse, false)
      })

      it('should return false if missing verse', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 1, chapter: 1 })
        assert.equal(isValidVerse, false)
      })

      it('should return false if there is a non-integer parameters', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 1, chapter: 1, verse: 'A' })
        assert.equal(isValidVerse, false)
      })

      it('should return false if there is a bookId out-of-range (too high)', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 67, chapter: 1, verse: 1 })
        assert.equal(isValidVerse, false)
      })

      it('should return false if there is a bookId out-of-range (too low)', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 0, chapter: 1, verse: 1 })
        assert.equal(isValidVerse, false)
      })

      it('should return false if there is a negative chapter', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 66, chapter: -1, verse: 1 })
        assert.equal(isValidVerse, false)
      })

      it('should return false if there is a 0 verse', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 19, chapter: 5, verse: 0 })
        assert.equal(isValidVerse, false)
      })

    })

    describe('Valid passages', () => {

      it('Genesis 1:1', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 1, chapter: 1, verse: 1 })
        assert.equal(isValidVerse, true)
      })

      it('Malachi 3:24 (valid in original, but not KJV)', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 39, chapter: 3, verse: 24 })
        assert.equal(isValidVerse, true)
      })

      it('Matthew 17:21 (valid in original, but not KJV)', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 40, chapter: 17, verse: 21 })
        assert.equal(isValidVerse, true)
      })

      it('Revelation 21:1', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 66, chapter: 21, verse: 1 })
        assert.equal(isValidVerse, true)
      })

    })

    describe('Invalid passages', () => {

      it('Genesis 51:1', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 1, chapter: 51, verse: 1 })
        assert.equal(isValidVerse, false)
      })

      it('Malachi 4:1 (valid in KJV, but not original)', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 39, chapter: 4, verse: 1 })
        assert.equal(isValidVerse, false)
      })

      it('Matthew 31:1', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 40, chapter: 31, verse: 1 })
        assert.equal(isValidVerse, false)
      })

      it('Revelation 20:16', () => {
        var isValidVerse = isValidVerseInOriginal({ bookId: 66, chapter: 20, verse: 16 })
        assert.equal(isValidVerse, false)
      })

    })

  })

})