// original mapped to the KJV

// Examples
//   {
//     "02011030": "02012001",
//     "02012001-02012021": -1,
//     "05022005:1-5": "05022005",
//     "05022005:6-10": "05022006",
//     "08002009:5-10": "08002009:1-7",
//     "08002010:1-2": "08002009:8-9",
//   }

// 8+ character strings represent a passage location:
//   BBCCCVVV
//     BB is a zero-padded bookId with KJV ordering (1-66)
//     CCC is a zero-padded chapter
//     VVV is a zero-padded verse
//   BBCCCVVV:W1-W2
//     W1 is the starting word number in cases where a partial verse must be mapped
//     W2 is the ending word number in cases where a partial verse must be mapped
//   BBCCCVVV-BBCCCVVV
//     The key can also be a location range, with an integer as the value. Use this
//     when all the verses in the key range are to be increased by the same amount.

// So far I only have the mappings to skipped verses

// These are absent in the ESV, but are they in the KJV?

export default const kjvVerseMappings = {
  "40012047": null,  
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
}