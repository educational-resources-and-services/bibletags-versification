// original mapped to the synodal

// Examples
//   {
//     "02011030": "02012001",
//     "02012001-02012021": -1,
//     "05012001-05012002": "05012001",
//     "05022005": "05022005-05022006",
//     "66001001-66001001:9": "66001001",
//     "66001001:10-66001002": "66001002",
//   }

// 8+ character strings represent a passage location:
//   BBCCCVVV[:W]
//     BB is a zero-padded bookId with KJV ordering (1-66)
//     CCC is a zero-padded chapter
//     VVV is a zero-padded verse
//     W is the optional word number in cases where a partial verse must be mapped
// An integer can be given as the value to a mapping when all the verses in the key range
// are increased by this amount in the transtion.

// I need mappings to skipped verses and otherwise

export default const synodalVerseMappings = {
  "synodal": {
  },
}