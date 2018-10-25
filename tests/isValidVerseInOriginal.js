import assert from 'assert'
import { isValidVerseInOriginal } from '../src/versification'

describe('isValidVerseInOriginal', () => {
  
  describe('Bad parameters', () => {

    it('should return false if missing bookId', () => {
      const isValid = isValidVerseInOriginal({ chapter: 1, verse: 1 })
      assert.equal(isValid, false)
    })

    it('should return false if missing chapter', () => {
      const isValid = isValidVerseInOriginal({ bookId: 1, verse: 1 })
      assert.equal(isValid, false)
    })

    it('should return false if missing verse', () => {
      const isValid = isValidVerseInOriginal({ bookId: 1, chapter: 1 })
      assert.equal(isValid, false)
    })

    it('should return false if there is a non-integer parameters', () => {
      const isValid = isValidVerseInOriginal({ bookId: 1, chapter: 1, verse: 'A' })
      assert.equal(isValid, false)
    })

    it('should return false if there is a bookId out-of-range (too high)', () => {
      const isValid = isValidVerseInOriginal({ bookId: 67, chapter: 1, verse: 1 })
      assert.equal(isValid, false)
    })

    it('should return false if there is a bookId out-of-range (too low)', () => {
      const isValid = isValidVerseInOriginal({ bookId: 0, chapter: 1, verse: 1 })
      assert.equal(isValid, false)
    })

    it('should return false if there is a negative chapter', () => {
      const isValid = isValidVerseInOriginal({ bookId: 66, chapter: -1, verse: 1 })
      assert.equal(isValid, false)
    })

    it('should return false if there is a 0 verse', () => {
      const isValid = isValidVerseInOriginal({ bookId: 19, chapter: 5, verse: 0 })
      assert.equal(isValid, false)
    })

  })

  describe('Invalid passages', () => {

    it('Genesis 51:1', () => {
      const isValid = isValidVerseInOriginal({ bookId: 1, chapter: 51, verse: 1 })
      assert.equal(isValid, false)
    })

    it('Malachi 4:1 (valid in KJV, but not original)', () => {
      const isValid = isValidVerseInOriginal({ bookId: 39, chapter: 4, verse: 1 })
      assert.equal(isValid, false)
    })

    it('Matthew 31:1', () => {
      const isValid = isValidVerseInOriginal({ bookId: 40, chapter: 31, verse: 1 })
      assert.equal(isValid, false)
    })

    it('Revelation 20:16', () => {
      const isValid = isValidVerseInOriginal({ bookId: 66, chapter: 20, verse: 16 })
      assert.equal(isValid, false)
    })

  })

  describe('Valid passages', () => {

    it('Genesis 1:1', () => {
      const isValid = isValidVerseInOriginal({ bookId: 1, chapter: 1, verse: 1 })
      assert.equal(isValid, true)
    })

    it('Malachi 3:24 (valid in original, but not KJV)', () => {
      const isValid = isValidVerseInOriginal({ bookId: 39, chapter: 3, verse: 24 })
      assert.equal(isValid, true)
    })

    it('Matthew 17:21 (valid in original, but not KJV)', () => {
      const isValid = isValidVerseInOriginal({ bookId: 40, chapter: 17, verse: 21 })
      assert.equal(isValid, true)
    })

    it('Revelation 21:1', () => {
      const isValid = isValidVerseInOriginal({ bookId: 66, chapter: 21, verse: 1 })
      assert.equal(isValid, true)
    })

  })
  
})
