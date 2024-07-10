// original mapped to the lxx

// See kjvLikeVerseMappings.js for examples

/*
Notes:
 16007068 is in the LXX, KJV and Synodel, but does not exist in the WLC.
 The ESV notes, "Compare Ezra 2:66 and the margins of some Hebrew manuscripts; Hebrew lacks all of verse 68."
*/


const lxxVerseMappings = {
  "01031051": null,
  "01035021": null,
  "02020013": "02020015",
  "02020014": "02020013",
  "02020015": "02020014",
  "02021016": "02021017",
  "02021017": "02021016",
  "02025006": null,
  "02028023-028": null,
  "02028030-043": 1,  // LXX has an extra verse: 02028030
  "02032009": null,
  "02035008": null,
  "02035013-015": 1,  // LXX has an extra verse: 02035013
  "02035017-018": null,
  "02036008-009": 993,  // 37:1-2 is 36:8-9 in Hebrew and English.
  "02036035-038": 968,  // 37:3-6 is 36:35-38 in Hebrew and English.
  "02037001-003": 1000,  // 38:1-17 is 37:1-24 in Hebrew and English.
  "02037004": null,
  "02037005-009": 999,
  "02037010": "02038009",
  "02037011": null,
  "02037012": null,
  "02037013": "02038010",
  "02037014": null,
  "02037015-019": 996,
  "02037020": "02038016:1-8",
  "02037021": "02038016:9-32",
  "02037022": "02038016:33-",
  "02037023": "02038017",
  "02037024-028": null,
  "02037029": "02038025",  // 38:25-27 is 37:29, 38:8 in Hebrew and English.
  "02038001": "02038022",  // 38:22-24 is 38:1-7 in Hebrew and English.
  "02038002": null,
  "02038003": "02038023",
  "02038004": "02038024",
  "02038005": null,
  "02038006": null,
  "02038007": null,
  "02038008": "02038026",  // 38:25-27 is 37:29, 38:8 in Hebrew and English.
  "02038009-023": -1002,  // 37:7-21 is 38:9-23 in Hebrew and English.
  "02038024-031": 977,  // 39:1-9 is 38:24-31 in Hebrew and English. (39:9 LXX does not appear to have a corresponding verse here. Is it elsewhere?)
  "02039001-031": -2993,  // 36:8-38 is 39:1-31 in Hebrew and English.
  "02039032": "02039010",  // 39:10-23 is 39:32-43 in Hebrew and English.
  "02039033": "02039023",
  "02039034": "02039020",
  "02039035": "02039014",
  "02039036": "02039017",
  "02039037": "02039016",
  "02039038": "02039015",
  "02039039": null,  // 02039021 in the LXX also does not appear to have correspondance in the original
  "02039040": "02039019",
  "02039041": "02039018",
  "02039042-043": -20,
  "02040007": null,
  "02040011": null,
  "02040028": null,
  "02040030-032": null,
  "04006027": null,
  "04025019": "04026001:1-5",
  "04026001": "04026001:6-",
  "05005017": "05005018",
  "05005018": "05005017",
  "06006004": null,
  "06008013": null,
  "06008026": null,
  "06008030-035": 973,  // 8:30-35 in the original is placed after 9:2 in the LXX
  "06009003-027": 6,
  "06010015": null,
  "06010043": null,
  "06013033": null,
  "06020004-006": null,
  "07011004": null,
  "09013001": null,
  "09017012-031": null,
  "09017055-058": null,
  "09018001-005": null,
  "09018010-011": null,
  "09018017-019": null,
  "09018030": null,
  "09017041": null,
  "09017050": null,
  "09023012": null,
  "11002036-045": 14,
  "11002046:1-10": "11002060",
  "11003001": null,
  "11004017": "11004019",
  "11004018-019": -1,
  "11004020": null,
  "11005005-008": null,
  "11006018": null,
  "11006038": null,
  // I could not find a match for 6:37-38 in the original, and 7:50 in the LXX
  "11007001-012": 37,  // 7:1-12 - 7:38-49
  "11007013-051": -12,  // 7:13-51 - 7:1-37
  "11008012-013": null,
  "11009010-014": 1,  // 9:10 in the LXX has not corresponding vs in the original
  "11009015-025": null,
  "11011003": null,
  "11011005:": "11011006",
  "11011007": "11011005",
  "11011008": "11011007",
  "11011006": "11011008",
  "11011023": null,
  "11011024": null,
  "11011039": null,
  "11012002": null,
  "11012017": null,
  "11014001-020": null,
  "11013027": null,
  "11015006": null,
  "11015032": null,
  "11020001-043": 1000,
  "11021001-029": -1000,
  "11022047-050": null,
  "13001011-016": null,
  "13001018-023": null,
  "13016024": null,
  "14027008": null,
  "16003007": null,
  "16003038": null,
  "16007068:1-9": "16007068",
  "16007068:10-": "16007069",
  "16007069-072": 1,
  "16011016": null,
  "16011020-021": null,
  "16011028-029": null,
  "16011032-035": null,
  "16012004-006": null,
  "17004006": null,
  "17009005": null,
  "17009030": null,
  "18023014": null,
  "19010001-018": -979, //PS10 WLC = PS9:22-39 LXX
  "19011001-007": -1000,
  "19012001-009": -1000,
  "19013001-005": -1000,
  "19013006:1-6": "19012005",
  "19013006:7-": "19012006",
  "19014001-007": -1000,
  "19015001-005": -1000,
  "19016001-011": -1000,
  "19017001-015": -1000,
  "19018001-051": -1000,
  "19019001-015": -1000,
  "19020001-010": -1000,
  "19021001-014": -1000,
  "19022001-032": -1000,
  "19023001-006": -1000,
  "19024001-010": -1000,
  "19025001-022": -1000,
  "19026001-012": -1000,
  "19027001-014": -1000,
  "19028001-009": -1000,
  "19029001-011": -1000,
  "19030001-013": -1000,
  "19031001-025": -1000,
  "19032001-011": -1000,
  "19033001-022": -1000,
  "19034001-023": -1000,
  "19035001-028": -1000,
  "19036001-013": -1000,
  "19037001-040": -1000,
  "19038001-023": -1000,
  "19039001-014": -1000,
  "19040001-018": -1000,
  "19041001-014": -1000,
  "19042001-012": -1000,
  "19043001-005": -1000,
  "19044001-027": -1000,
  "19045001-018": -1000,
  "19046001-012": -1000,
  "19047001-010": -1000,
  "19048001-015": -1000,
  "19049001-021": -1000,
  "19050001-023": -1000,
  "19051001-021": -1000,
  "19052001-011": -1000,
  "19053001-007": -1000,
  "19054001-009": -1000,
  "19055001-024": -1000,
  "19056001-014": -1000,
  "19057001-012": -1000,
  "19058001-012": -1000,
  "19059001-018": -1000,
  "19060001-014": -1000,
  "19061001-009": -1000,
  "19062001-013": -1000,
  "19063001-012": -1000,
  "19064001-011": -1000,
  "19065001-014": -1000,
  "19066001-020": -1000,
  "19067001-008": -1000,
  "19068001-036": -1000,
  "19069001-037": -1000,
  "19070001-006": -1000,
  "19071001-024": -1000,
  "19072001-020": -1000,
  "19073001-028": -1000,
  "19074001-023": -1000,
  "19075001-011": -1000,
  "19076001-013": -1000,
  "19077001-021": -1000,
  "19078001-072": -1000,
  "19079001-013": -1000,
  "19080001-020": -1000,
  "19081001-017": -1000,
  "19082001-008": -1000,
  "19083001-019": -1000,
  "19084001-013": -1000,
  "19085001-014": -1000,
  "19086001-017": -1000,
  "19087001-007": -1000,
  "19088001-019": -1000,
  "19089001-053": -1000,
  "19090001-017": -1000,
  "19091001-016": -1000,
  "19092001-016": -1000,
  "19093001-005": -1000,
  "19094001-023": -1000,
  "19095001-011": -1000,
  "19096001-013": -1000,
  "19097001-012": -1000,
  "19098001-009": -1000,
  "19099001-009": -1000,
  "19100001-005": -1000,
  "19101001-008": -1000,
  "19102001-029": -1000,
  "19103001-022": -1000,
  "19104001-035": -1000,
  "19105001-045": -1000,
  "19106001-048": -1000,
  "19107001-043": -1000,
  "19108001-014": -1000,
  "19109001-031": -1000,
  "19110001-007": -1000,
  "19111001-010": -1000,
  "19112001-010": -1000,
  "19113001-009": -1000,
  "19114001-008": -1000,
  "19115001-018": -1992,
  "19116001-009": -2000,
  "19116010-013": -1009,
  "19116014": null,
  "19116015-019": -1009,
  "19117001-002": -1000,
  "19118001-029": -1000,
  "19119001-176": -1000,
  "19120001-007": -1000,
  "19121001-008": -1000,
  "19122001-009": -1000,
  "19123001-004": -1000,
  "19124001-008": -1000,
  "19125001-005": -1000,
  "19126001-006": -1000,
  "19127001-005": -1000,
  "19128001-006": -1000,
  "19129001-008": -1000,
  "19130001-008": -1000,
  "19131001-003": -1000,
  "19132001-018": -1000,
  "19133001-003": -1000,
  "19134001-003": -1000,
  "19135001-021": -1000,
  "19136001-026": -1000,
  "19137001-009": -1000,
  "19138001-008": -1000,
  "19139001-024": -1000,
  "19140001-014": -1000,
  "19141001-010": -1000,
  "19142001-008": -1000,
  "19143001-012": -1000,
  "19144001-015": -1000,
  "19145001-021": -1000,
  "19146001-010": -1000,
  "19147001-011": -1000,
  "19147012-020": -11,
  "20004007": null,
  "20011004": null,
  "20016001": null,
  "20016003-004": null,
  "20016006": null,
  "20018024": null,
  "20019001-002": null,
  "20020010-013": 3,
  "20020014-019": null,
  "20020020-022": -10,
  "20021005": null,
  "20022006": null,
  "20023023": null,
  "23002022": null,
  "23056012": null,
  "24002001": null,
  "24007001": null,
  "24007028": null,
  "24008011-012": null,
  "24011007": null,
  "24010005-008": null,
  "24017001-004": null,
  "24023007-008": null,
  "24025013:1-15": "24025013", //JER25:13a WLC = JER25:13 LXX
  "24025013:16-": "24032013", //JER25:13b ("24025013:16-21" close-ended) WLC = JER32:13 LXX
  "24025014": null,
  "24025015-038": 7000,  // 32:13-38 is 25:13b-38 in Hebrew and English.
  "24026001-024": 7000,  // Chapter 26 in Hebrew and English.
  "24026026": null,                 
  "24027001": null,
  "24027002-006": 7000,
  "24027007": null,
  "24027008-012": 7000,
  "24027013": null,
  "24027014-016": 7000,
  "24027017": null,
  "24027018-020": 7000,
  "24027021": null,
  "24027022-022": 7000,
  "24028001-017": 7000,
  "24029001-015": 7000,
  "24029016-020": null,
  "24029021-032": 7000,
  "24030001-009": 7000,
  "24030010-011": null,
  "24030012-014": 7000,
  "24030015": null,
  "24030016-021": 7000,
  "24030022": null,
  "24030023-024": 7000,
  "24031001-040": 7000,
  "24032001-044": 7000,
  "24033001-013": 7000,
  "24033014-026": null,
  "24034001-022": 7000,
  "24035001-019": 7000,
  "24036001-032": 7000,
  "24037001-021": 7000,
  "24038001-028": 7000,
  "24039001-003": 7000,
  "24039014-018": 7000,
  "24040001-016": 7000,
  "24041001-018": 7000,
  "24042001-022": 7000,
  "24043001-013": 7000,
  "24044001-030": 7000,
  "24045001-005": 6030,
  "24046001": null,
  "24046002-025": -20000,
  "24046026": null,
  "24046027-028": -20000,
  "24047001-007": -18000,
  "24048001-044": -17000,  // Chapter 48 in Hebrew and English.
  "24048045-047": null,
  "24049001-005": -18984,  // 30:17-21 is 49:1-5 in Hebrew and English.
  "24049006": null,
  "24049007-022": -19006,  // 30:1-16 is 49:7-22 in Hebrew and English.
  "24049023-027": -18994,  // 30:29-33 is 49:23-27 in Hebrew and English.
  "24049028-033": -19005,  // 30:23-28 is 49:28-33 in Hebrew and English.
  "24049034:1-9": "24025014", // Jer49:34a WLC = Jer25:14 LXX
  "24049034:10-": "24025020", // Jer49:34b ("24049034:10-15" close-ended) = Jer25:20 LXX
  "24049035-039": -24020,
  "24050001-046": -23000,
  "24051001-044": -23000,
  "24051045-048": null,
  "24051049-064": -23000,
  "24052002-003": null,
  "24052015": null,
  "24052028-030": null,
  "25003022-024": null,
  "25003029": null,
  "26001014": null,
  "26010014": null,
  "26027031": null,
  "26032019": null,
  "26033026": null,
  "26040030": null,
  // Dan 3 has 97 verses in the LXX! How they relate to the 33 verses in the original has not yet been determined
  "27004001-002": 3,
  "27004003-006": null,
  "27004007-007": 3,
  "27004008": null,
  "27004009-009": 3,
  // LXX 4:13 does not seem to have coorespondence to the original
  "27004010-013": 4,
  // LXX 4:19 does not seem to have coorespondence to the original
  "27004015-029": 5,
  "27004030:1-6": "27004035",
  "27004030:7-12": "27004036",
  "27004030:13-": "27004037",
  "27004031-031": 7,
  // Orig 4:32 seems to be skipped by the LXX
  "27004033-034": 6,
  // LXX 4:41-43 does not seem to have coorespondence to the original
  "27005015": null,
  "27005018-022": null,
  "27005024-025": null,
  "27005027-028": null,
}

export default lxxVerseMappings


// The following are currently understood to be verses in the LXX without correspondance in the original
//   02028030
//   02035013
//   02038018-021
//   02038027
//   02039009
//   02039011-013
//   02039021
//   06015064
//   06019052-053
//   06021046-049
//   06024034-036
//   09030032
//   10005026
//   11002036-049
//   11002061-071
//   11005033
//   11007050
//   11008067
//   11009010
//   11010030-056
//   11016035-042
//   12001019-022
//   14035028-031
//   14036024-031
//   17001023-039
//   17003016-022
//   17004018-041
//   17005015-038
//   17010004-014
//   18002014-018
//   18019030
//   18023018
//   18036034-035
//   18042018-022
//   19144022
//   19151001-007
//   20003036-037
//   20004028-029
//   20006036-039
//   20007028
//   20009019-026
//   20010033
//   20012029-030
//   20013026-027
//   20015034-037
//   20017029-030
//   20022030-039
//   20025029-030
//   20026029
//   20027028-029
//   20028029
//   24023041-42
//   25001023
//   27003034-097
//   27004012-013
//   27004033-034
//   27004042-043
//   27006030