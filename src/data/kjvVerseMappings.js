// original mapped to the KJV

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

// So far I only have the mappings to skipped verses

export default const kjvVerseMappings = {
  "kjv": {
    // "40012047": null,
    "40017021": null,
    "40018011": null,
    "40023014": null,
    "41007016": null,
    "41009044": null,
    "41009046": null,
    "41011026": null,
    "41015028": null,
    "42017036": null,
    "42023017": null,
    "43005004": null,
    "44008037": null,
    "44015034": null,
    "44024007": null,
    "44028029": null,
    "45016024": null,
  },
}