import assert from 'assert'
import { getNumberOfChapters } from '../src/versification'

describe('getNumberOfChapters', () => {
  
  describe('Romans', () => {

    it('KJV', () => {
      const numChapters = getNumberOfChapters({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 45,
      })
      assert.equal(numChapters, 16)
    })

    it('SYNO', () => {
      const numChapters = getNumberOfChapters({
        versionInfo: { versificationModel: 'synodal' },
        bookId: 45,
      })
      assert.equal(numChapters, 16)
    })

  })

  describe('Malachi', () => {

    it('KJV', () => {
      const numChapters = getNumberOfChapters({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 39,
      })
      assert.equal(numChapters, 4)
    })

    it('Original', () => {
      const numChapters = getNumberOfChapters({
        versionInfo: { versificationModel: 'original' },
        bookId: 39,
      })
      assert.equal(numChapters, 3)
    })

  })

  describe('Joel', () => {

    it('KJV', () => {
      const numChapters = getNumberOfChapters({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 29,
      })
      assert.equal(numChapters, 3)
    })

    it('Original', () => {
      const numChapters = getNumberOfChapters({
        versionInfo: { versificationModel: 'original' },
        bookId: 29,
      })
      assert.equal(numChapters, 4)
    })

  })
  
})
