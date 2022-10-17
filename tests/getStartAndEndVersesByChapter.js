import assert from 'assert'
import { getStartAndEndVersesByChapter } from '../src/versification'

describe('getStartAndEndVersesByChapter', () => {

  describe('Romans', () => {

    it('KJV', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 45,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [ [1,32], [1,29], [1,31], [1,25], [1,21], [1,23], [1,25], [1,39], [1,33], [1,21], [1,36], [1,21], [1,14], [1,23], [1,33], [1,27] ],
          skippedLocs: [],
        }
      )
    })

    it('ESV', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'kjv', skipsUnlikelyOriginals: true },
        bookId: 45,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [ [1,32], [1,29], [1,31], [1,25], [1,21], [1,23], [1,25], [1,39], [1,33], [1,21], [1,36], [1,21], [1,14], [1,23], [1,33], [1,27] ],
          skippedLocs: [ '45016024' ],
        }
      )
    })

    it('SYNO', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'synodal' },
        bookId: 45,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [ [1,32], [1,29], [1,31], [1,25], [1,21], [1,23], [1,25], [1,39], [1,33], [1,21], [1,36], [1,21], [1,14], [1,26], [1,33], [1,24] ],
          skippedLocs: [],
        }
      )
    })

  })

  describe('Psalms', () => {

    it('KJV', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 19,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter:  [ [1,6], [1,12], [0,8], [0,8], [0,12], [0,10], [0,17], [0,9], [0,20], [1,18], [0,7], [0,8], [0,6], [0,7], [0,5], [0,11], [0,15], [0,50], [0,14], [0,9], [0,13], [0,31], [0,6], [0,10], [0,22], [0,12], [0,14], [0,9], [0,11], [0,12], [0,24], [0,11], [1,22], [0,22], [0,28], [0,12], [0,40], [0,22], [0,13], [0,17], [0,13], [0,11], [1,5], [0,26], [0,17], [0,11], [0,9], [0,14], [0,20], [0,23], [0,19], [0,9], [0,6], [0,7], [0,23], [0,13], [0,11], [0,11], [0,17], [0,12], [0,8], [0,12], [0,11], [0,10], [0,13], [0,20], [0,7], [0,35], [0,36], [0,5], [1,24], [0,20], [0,28], [0,23], [0,10], [0,12], [0,20], [0,72], [0,13], [0,19], [0,16], [0,8], [0,18], [0,12], [0,13], [0,17], [0,7], [0,18], [0,52], [0,17], [1,16], [0,15], [1,5], [1,23], [1,11], [1,13], [1,12], [0,9], [1,9], [0,5], [0,8], [0,28], [0,22], [1,35], [1,45], [1,48], [1,43], [0,13], [0,31], [0,7], [1,10], [1,10], [1,9], [1,8], [1,18], [1,19], [1,2], [1,29], [1,176], [0,7], [0,8], [0,9], [0,4], [0,8], [0,5], [0,6], [0,5], [0,6], [0,8], [0,8], [0,3], [0,18], [0,3], [0,3], [1,21], [1,26], [1,9], [0,8], [0,24], [0,13], [0,10], [0,7], [0,12], [0,15], [0,21], [1,10], [1,20], [1,14], [1,9], [1,6] ],
          skippedLocs: [],
        }
      )
    })

  })

  describe('Joel', () => {

    it('KJV', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 29,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [ [1,20], [1,32], [1,21] ],
          skippedLocs: [],
        }
      )
    })

  })

  describe('Malachi', () => {

    it('KJV', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 39,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [ [ 1, 14 ], [ 1, 17 ], [ 1, 18 ], [ 1, 6 ] ],
          skippedLocs: [],
        }
      )
    })

    it('Original', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'original' },
        bookId: 39,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [ [ 1, 14 ], [ 1, 17 ], [ 1, 24 ] ],
          skippedLocs: [],
        }
      )
    })

  })

  describe('Joel', () => {

    it('KJV', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 29,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [ [ 1, 20 ], [ 1, 32 ], [ 1, 21 ] ],
          skippedLocs: [],
        }
      )
    })

    it('Original', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'original' },
        bookId: 29,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [ [ 1, 20 ], [ 1, 27 ], [ 1, 5 ], [ 1, 21 ] ],
          skippedLocs: [],
        }
      )
    })

  })

  describe('Invalid book', () => {

    it('KJV', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'kjv' },
        bookId: 67,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [],
          skippedLocs: [],
        }
      )
    })

    it('KJV', () => {
      const startAndEndVerses = getStartAndEndVersesByChapter({
        versionInfo: { versificationModel: 'kjv' },
        bookId: null,
      })
      assert.deepEqual(
        startAndEndVerses,
        {
          startAndEndVersesByChapter: [],
          skippedLocs: [],
        }
      )
    })

  })

})
