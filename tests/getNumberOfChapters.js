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
  
})
