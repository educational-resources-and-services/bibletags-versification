import assert from 'assert'
import { hasCorrespondingVerseInOriginal } from '../src/versification'

describe('hasCorrespondingVerseInOriginal', () => {
  
  describe('Bad parameters', () => {

    it('should return null if missing bookId', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { chapter: 1, verse: 1 },
        info: { versificationModel: 'original', partialScope: 'ot' },
      })
      assert.equal(isValid, null)
    })

    it('should return null if missing chapter', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 1, verse: 1 },
        info: { versificationModel: 'original', partialScope: 'ot' },
      })
      assert.equal(isValid, null)
    })

    it('should return null if missing verse', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 1, chapter: 1 },
        info: { versificationModel: 'original', partialScope: 'ot' },
      })
      assert.equal(isValid, null)
    })

    it('should return null if missing versionInfo', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 1, chapter: 1, verse: 1 },
      })
      assert.equal(isValid, null)
    })

    it('should return null if missing versionInfo.versificationModel', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 1, chapter: 1, verse: 1},
        info: {},
      })
      assert.equal(isValid, null)
    })

    it('should return null if there is a non-integer parameters', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 1, chapter: 1, verse: 'A'},
        info: { versificationModel: 'original', partialScope: 'ot' },
      })
      assert.equal(isValid, null)
    })

  })

  describe('Invalid passages', () => {

    // TODO: fill out, particularly passages which are invalid in a translation, but not the original

    it('Genesis 51:1', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 1, chapter: 51, verse: 1},
        info: { versificationModel: 'original', partialScope: 'ot' },
      })
      assert.equal(isValid, false)
    })

    it('Malachi 4:1 (valid in KJV, but not original)', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 39, chapter: 4, verse: 1},
        info: { versificationModel: 'original', partialScope: 'ot' },
      })
      assert.equal(isValid, false)
    })

    it('Matthew 31:1', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 40, chapter: 31, verse: 1},
        info: { versificationModel: 'original', partialScope: 'nt' },
      })
      assert.equal(isValid, false)
    })

    it('Revelation 20:16', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 66, chapter: 20, verse: 16},
        info: { versificationModel: 'original', partialScope: 'nt' },
      })
      assert.equal(isValid, false)
    })

  })

  describe('Valid passages', () => {

    // TODO: fill out, particularly passages which are valid in a translation, but not the original

    it('Genesis 1:1', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 1, chapter: 1, verse: 1 },
        info: { versificationModel: 'original', partialScope: 'ot' },
      })
      assert.equal(isValid, true)
    })

    it('Malachi 3:24 (valid in original, but not KJV)', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 39, chapter: 3, verse: 24},
        info: { versificationModel: 'original', partialScope: 'ot' },
      })
      assert.equal(isValid, true)
    })

    it('Matthew 17:21 (valid in original, but not KJV)', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 40, chapter: 17, verse: 21},
        info: { versificationModel: 'original', partialScope: 'nt' },
      })
      assert.equal(isValid, true)
    })

    it('Revelation 21:1', () => {
      const isValid = hasCorrespondingVerseInOriginal({
        ref: { bookId: 66, chapter: 21, verse: 1},
        info: { versificationModel: 'original', partialScope: 'nt' },
      })
      assert.equal(isValid, true)
    })

  })
  
})
