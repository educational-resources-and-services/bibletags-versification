// original mapped to the kjv

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

export default const lxxVerseMappings = {
  "lxx": {
    "01031051": null,
    "01035021": null,
    "02025006": null,
    "02032009": null,
    "02035008": null,
    "02040007": null,
    "02040011": null,
    "02040028": null,
    "06006004": null,
    "06008013": null,
    "06008026": null,
    "06010015": null,
    "07011004": null,
    "09013001": null,
    "09017041": null,
    "09017050": null,
    "09023012": null,
    "11003001": null,
    "11006018": null,
    "11011003": null,
    "11011039": null,
    "11012002": null,
    "11012017": null,
    "11013027": null,
    "11015006": null,
    "11015032": null,
    "13016024": null,
    "14027008": null,
    "16003007": null,
    "16011016": null,
    "17004006": null,
    "17009005": null,
    "17009030": null,
    "18023014": null,
    "19115005": null,
    "20004007": null,
    "20011004": null,
    "20016001": null,
    "20016006": null,
    "20021005": null,
    "20022006": null,
    "20023023": null,
    "24002001": null,
    "24007001": null,
    "24007028": null,
    "24011007": null,
    "24026001": null,
    "24026026": null,
    "24030022": null,
    "24032014": null,
    "24034001": null,
    "24034007": null,
    "24034013": null,
    "24034017": null,
    "24034021": null,
    "24037015": null,
    "24037022": null,
    "24052015": null,
    "25003029": null,
    "26001014": null,
    "26010014": null,
    "26027031": null,
    "26032019": null,
    "26033026": null,
    "26040030": null,
    "27004011": null,
    "27005015": null,
  },
}