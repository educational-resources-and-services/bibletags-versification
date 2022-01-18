// original mapped to the "KJV" (a KJV-like mapping)

// Examples
//   {
//     "02011030": "02012001",
//     "02012001-021": -1,
//     "05022005:1-5": "05022005",
//     "05022005:6-10": "05022006",
//     "08002009:5-10": "08002009:1-7",
//     "08002010:1-2": "08002009:8-9",

//     "40017014": "40017014:1-19",
//     "40017015:1-2": "40017014:20-",
//     "40017015:3-": "40017015",
//   }

// 8+ character strings represent a passage location:
//   BBCCCVVV
//     BB is a zero-padded bookId with KJV ordering (1-66)
//     CCC is a zero-padded chapter
//     VVV is a zero-padded verse
//   BBCCCVVV:W1-W2
//     W1 is the starting word number in cases where a partial verse must be mapped
//     W2 is the ending word number in cases where a partial verse must be mapped (can be left blank to indicate "rest of the verse")
//   BBCCCVVV-VVV
//     The key can also be a location range, with an integer as the value. Use this
//     when all the verses in the key range are to be increased by the same amount.

/*
 Notes:
 16007068 is in the KJV and Synodel, but does not exist in the WLC.
 The ESV notes, "Compare Ezra 2:66 and the margins of some Hebrew manuscripts; Hebrew lacks all of verse 68."
/*

*/


const kjvLikeVerseMappings = {
  "01032001": "01031055",
  "01032002-033": -1,
  "02007026-029": 975,
  "02008001-028": 4,
  "02021037": "02022001",
  "02022001-030": 1,
  "03005020-026": 981,
  "03006001-023": 7,
  "04017001-015": -965,
  "04017016-028": -15,
  "04025019": "04026001:1-8",
  "04026001": "04026001:9-", // "04026001:9-24"  
  "04030001": "04029040",
  "04030002-017": -1,
  "05013001": "05012032",
  "05013002-019": -1,
  "05023001": "05022030",
  "05023002-026": -1,
  "05028069": "05029001",
  "05029001-028": 1,
  "09020042": "09020042:1-39",
  "09021001": "09020042:40-", //"09020042:40-50"
  "09021002-016": -1,
  "09024001": "09023029",
  "09024002-023": -1,
  "10019001": "10018033",
  "10019002-044": -1,
  "11005001-014": -980,
  "11005015-032": -14,
  "11018033": "11018033:1-19",
  "11018034:1-10": "11018033:20-", //"11018033:20-37"
  "11018034:11-": "11018034", //"11018034:11-16": "11018034"
  "11022043": "11022043:1-28",
  "11022044": "11022043:29-", //"11022043:29-48"
  "11022045-054": -1,
  "12012001": "12011021",
  "12012002-022": -1,
  "13005027-041": 974,
  "13006001-066": 15,
  "13012004": "13012004:1-14",
  "13012005": "13012004:15-", //"13012004:15-24"
  "13012006-041": -1,
  "14001018": "14002001",
  "14002001-017": 1,
  "14013023": "14014001",
  "14014001-014": 1,
  "16003033-038": 968,
  "16004001-017": 6,
  "16007068:1-9": "16007068",
  "16007068:10-": "16007069",
  "16007069-072": 1,
  "16010001": "16009038",
  "16010002-040": -1,
  "18040025-032": 976,
  "18041001-026": 8,
  "19003001-009": -1,
  "19004001-009": -1,
  "19005001-013": -1,
  "19006001-011": -1,
  "19007001-018": -1,
  "19008001-010": -1,
  "19009001-021": -1,
  "19011001:1-2": "19011000", //PS11:1a = PS11 heading kjv
  "19011001:3-": "19011001", //"19011001:3-8": "19011001",
  "19012001-009": -1,
  "19013001-006": -1,
  "19014001:1-2": "19014000", //PS14:1a = PS14 heading kjv
  "19014001:3-": "19014001", //"19014001:3-13": "19014001",
  "19015001:1-2": "19015000", //PS15:1a = PS15 heading kjv
  "19015001:3-": "19015001", //"19015001:3-10": "19015001"
  "19016001:1-2": "19016000", //PS16:1a = PS16 heading kjv
  "19016001:3-": "19016001", //"19016001:3-7": "19016001",
  "19017001:1-2": "19017000", //PS17:1a = PS17 heading kjv
  "19017001:3-": "19017001", //"19017001:3-12": "19017001",
  "19018001": "19018000:1-44", //PS18:1 = PS18:heading a,b,c kjv
  "19018002:1": "19018000:45-", //"19018000:45-47" (heading part d kjv)
  "19018002:2-": "19018001", //"19018002:2-4": "19018001",
  "19018003-051": -1,
  "19019001-015": -1,
  "19020001-010": -1,
  "19021001-014": -1,
  "19022001-032": -1,
  "19023001:1-2": "19023000", //PS23:1a = PS23 heading kjv
  "19023001:3-": "19023001", //"19023001:3-6": "19023001",
  "19024001:1-2": "19024000", //PS24:1a = PS24 heading kjv
  "19024001:3-": "19024001", //"19024001:3-8": "19024001",
  "19025001:1": "19025000", //PS25:1a = PS25 heading kjv
  "19025001:2-": "19025001", //"19025001:2-5": "19025001",
  "19026001:1": "19026000", //PS26:1a = PS26 heading kjv
  "19026001:2-": "19026001", //"19026001:2-11": "19026001",
  "19027001:1": "19027000", //verse 1a = heading kjv
  "19027001:2-": "19027001", //"19027001:2-11": "19027001",
  "19028001:1": "19028000", //verse 1a = heading kjv
  "19028001:2-": "19028001", //"19028001:2-15": "19028001",
  "19029001:1-2": "19029000", //verse 1a = heading kjv
  "19029001:3-": "19029001", //"19029001:3-10": "19029001",
  "19030001-013": -1,
  "19031001-025": -1,
  "19032001:1-2": "19032000", //verse 1a = heading kjv
  "19032001:3-": "19032001", //"19032001:3-7": "19032001",
  "19034001-023": -1,
  "19035001:1": "19035000", //verse 1a = heading kjv
  "19035001:2-": "19035001", //"19035001:2-8": "19035001",
  "19036001-013": -1,
  "19037001:1": "19037000", //verse 1a = heading kjv
  "19037001:2-": "19037001", //"19037001:2-8": "19037001",
  "19038001-023": -1,
  "19039001-014": -1,
  "19040001-018": -1,
  "19041001-014": -1,
  "19042001-012": -1,
  "19044001-027": -1,
  "19045001-018": -1,
  "19046001-012": -1,
  "19047001-010": -1,
  "19048001-015": -1,
  "19049001-021": -1,
  "19050001:1-2": "19050000", //verse 1a = heading kjv
  "19050001:3-": "19050001", //"19050001:3-12": "19050001",
  "19051001": "19051000:1-8",
  "19051002": "19051000:9-", //"19051000:9-22",
  "19051003-021": -2,
  "19052001": "19052000:1-9",
  "19052002": "19052000:10-", //"19052000:10-29",
  "19052003-011": -2,
  "19053001-007": -1,
  "19054001": "19054000:1-11",
  "19054002": "19054000:12-", //"19054000:12-26",
  "19054003-009": -2,
  "19055001-024": -1,
  "19056001-014": -1,
  "19057001-012": -1,
  "19058001-012": -1,
  "19059001-018": -1,
  "19060001": "19060000:1-11",
  "19060002": "19060000:12-", //"19060000:12-33",
  "19060003-014": -2,
  "19061001-009": -1,
  "19062001-013": -1,
  "19063001-012": -1,
  "19064001-011": -1,
  "19065001-014": -1,
  "19066001:1-3": "19066000", //verse 1a = heading kjv
  "19066001:4-": "19066001", //"19066001:4-7": "19066001",
  "19067001-008": -1,
  "19068001-036": -1,
  "19069001-037": -1,
  "19070001-006": -1,
  "19072001:1": "19072000", //verse 1a = heading kjv
  "19072001:2-": "19072001", //"19072001:2-8": "19072001"
  "19073001:1-2": "19073000", //verse 1a = heading kjv
  "19073001:3-": "19073001", //"19073001:3-8": "19073001",
  "19074001:1-2": "19074000", //verse 1a = heading kjv
  "19074001:3-": "19074001", //"19074001:3-10": "19074001",
  "19075001-011": -1,
  "19076001-013": -1,
  "19077001-021": -1,
  "19078001:1-2": "19078000", //verse 1a = heading kjv
  "19078001:3-": "19078001", //"19078001:3-9": "19078001",
  "19079001:1-2": "19079000", //verse 1a = heading kjv
  "19079001:3-": "19079001", //"19079001:3-14": "19079001",
  "19080001-020": -1,
  "19081001-017": -1,
  "19082001:1-2": "19082000", //verse 1a = heading kjv
  "19082001:3-": "19082001", //"19082001:3-9": "19082001",
  "19083001-019": -1,
  "19084001-013": -1,
  "19085001-014": -1,
  "19086001:1-2": "19086000", //verse 1a = heading kjv
  "19086001:3-": "19086001", //"19086001:3-10": "19086001",
  "19087001:1-4": "19087000", //verse 1a = heading kjv
  "19087001:5-": "19087001", //"19087001:5-7": "19087001",
  "19088001-019": -1,
  "19089001-053": -1,
  "19090001:1-4": "19090000", //verse 1a = heading kjv
  "19090001:5-": "19090001", //"19090001:5-11": "19090001",
  "19092001-016": -1,
  "19098001:1": "19098000", //verse 1a = heading kjv
  "19098001:2-": "19098001", //"19098001:2-13": "19098001",
  "19100001:1-2": "19100000", //verse 1a = heading kjv
  "19100001:3-": "19100001", //"19100001:3-6": "19100001",
  "19101001:1-2": "19101000", //verse 1a = heading kjv
  "19101001:3-": "19101001", //"19101001:3-8": "19101001",
  "19102001-029": -1,
  "19103001:1": "19103000", //verse 1a = heading kjv
  "19103001:2-": "19103001", //"19103001:2-10": "19103001",
  "19108001-014": -1,
  "19109001:1-3": "19109000", //verse 1a = heading kjv
  "19109001:4-": "19109001", //"19109001:4-7": "19109001",
  "19110001:1-2": "19110000", //verse 1a = heading kjv
  "19110001:3-": "19110001", //"19110001:3-12": "19110001",
  "19120001:1-2": "19120000", //verse 1a = heading kjv
  "19120001:3-": "19120001", //"19120001:3-8": "19120001",
  "19121001:1-2": "19121000", //verse 1a = heading kjv
  "19121001:3-": "19121001", //"19121001:3-9": "19121001",
  "19122001:1-3": "19122000", //verse 1a = heading kjv
  "19122001:4-": "19122001", //"19122001:4-9": "19122001",
  "19123001:1-2": "19123000", //verse 1a = heading kjv
  "19123001:3-": "19123001", //"19123001:3-8": "19123001",
  "19124001:1-3": "19124000", //verse 1a = heading kjv
  "19124001:4-": "19124001", //"19124001:4-10": "19124001",
  "19125001:1-2": "19125000", //verse 1a = heading kjv
  "19125001:3-": "19125001", //"19125001:3-10": "19125001",
  "19126001:1-2": "19126000", //verse 1a = heading kjv
  "19126001:3-": "19126001", //"19126001:3-9": "19126001",
  "19127001:1-3": "19127000", //verse 1a = heading kjv
  "19127001:4-": "19127001", //"19127001:4-20": "19127001",
  "19128001:1-2": "19128000", //verse 1a = heading kjv
  "19128001:3-": "19128001", //"19128001:3-8": "19128001",
  "19129001:1-2": "19129000", //verse 1a = heading kjv
  "19129001:3-": "19129001", //"19129001:3-8": "19129001",
  "19130001:1-2": "19130000", //verse 1a = heading kjv
  "19130001:3-": "19130001", //"19130001:3-5": "19130001",
  "19131001:1-3": "19131000", //verse 1a = heading kjv
  "19131001:4-": "19131001", //"19131001:4-15": "19131001",
  "19132001:1-2": "19132000", //verse 1a = heading kjv
  "19132001:3-": "19132001", //"19132001:3-8": "19132001",
  "19133001:1-3": "19133000", //verse 1a = heading kjv
  "19133001:4-": "19133001", //"19133001:4-12": "19133001",
  "19134001:1-2": "19134000", //verse 1a = heading kjv
  "19134001:3-": "19134001", //"19134001:3-13": "19134001",
  "19138001:1": "19138000", //verse 1a = heading kjv
  "19138001:2-": "19138001", //"19138001:2-7": "19138001",
  "19139001:1-3": "19139000", //verse 1a = heading kjv
  "19139001:4-": "19139001", //"19139001:4-6": "19139001",
  "19140001-014": -1,
  "19141001:1-2": "19141000", //verse 1a = heading kjv
  "19141001:3-": "19141001", //"19141001:3-10": "19141001",
  "19142001-008": -1,
  "19143001:1-2": "19143000", //verse 1a = heading kjv
  "19143001:3-": "19143001", //"19143001:3-11": "19143001",
  "19144001:1": "19144000", //verse 1a = heading kjv
  "19144001:4-": "19144001", //"19144001:4-7": "19144001",
  "19145001:1-2": "19145000", //verse 1a = heading kjv
  "19145001:3-": "19145001", //"19145001:3-9": "19145001",
  "21004017": "21005001",
  "21005001-019": 1,
  "22007001": "22006013",
  "22007002-014": -1,
  "23008023": "23009001",
  "23009001-020": 1,
  "23064001-011": 1,
  "24008023": "24009001",
  "24009001-025": 1,
  "26021001-002": -956,
  "26021003": "26020047",
  "26021004-005": -956,
  "26021006-037": -5,
  "27003031-033": 970,
  "27004001-034": 3,
  "27006001": "27005031",
  "27006002-029": -1,
  "28002001-002": -991,
  "28002003-025": -2,
  "28012001": "28011012",
  "28012002-015": -1,
  "28014001": "28013016",
  "28014002-010": -1,
  "29003001-005": -973,
  "29004001-021": -1000,
  "32002001": "32001017",
  "32002002-011": -1,
  "33004014": "33005001",
  "33005001-014": 1,
  "34002001": "34001015",
  "34002002-014": -1,
  "38002001-004": -983,
  "38002005-017": -4,
  "39003019-024": 982,
  //NT
  "40017014": "40017014:1-19",
  "40017015:1-2": "40017014:20-",    //"40017015:1-2": "40017014:20-21",
  "40017015:3-": "40017015",         //"40017015:3-23": "40017015",
  "40020004": "40020004:1-18",
  "40020005:1-3": "40020004:19-",   //"40020005:1-3": "40020004:19-23",
  "40020005:4-": "40020005",        //"40020005:4-12": "40020005",
  "41012014:1-35": "41012014",
  "41012014:36-": "41012015:1-8",   //"41012014:36-39": "41012015:1-8",
  "41012015": "41012015:9-",       //"41012015": "41012015:9-29",
  "42001073:1-8": "42001073",
  "42001073:9-": "42001074:1-6",  //"42001073:9-11": "42001074:1-6",
  "42001074": "42001074:7-",  //"42001074": "42001074:7-22",
  "42007018:1-9": "42007018",
  "42007018:10-": "42007019:1-9",  //"42007018:10-18": "42007019:1-9",
  "42007019": "42007019:10-",    //"42007019": "42007019:10-25",
  "42022066": "42022066:1-27",
  "42022067:1": "42022066:28",
  "42022067:2-": "42022067",   //"42022067:2-17": "42022067"
  "42024045:1-9": "42024045",
  "42024045:10-": "42024046:1-4",  //"42024045:10-12": "42024046:1-4",
  "42024046": "42024046:5-",    //"42024046": "42024046:5-24",
  "44002010": "44002010:1-17",
  "44002011:1-4": "44002010:18-", //"44002011:1-4": "44002010:18-20",
  "44002011:5-": "44002011",    //"44002011:5-17": "44002011",
  "44003019": "44003019:1-13",
  "44003020:1-9": "44003019:14-", //"44003020:1-9": "44003019:14-26",
  "44003020:10-": "44003020",    //"44003020:10-16": "44003020",
  "44005039:1-13": "44005039",
  "44005039:14-": "44005040:1-5", //"44005039:14-16": "44005040:1-5",
  "44005040": "44005040:6-",     //"44005040": "44005040:6-31",
  "44013038:1-13": "44013038",
  "44013038:14-": "44013039:12-", //"44013038:14-23": "44013039:12-23",
  "44013039": "44013039:1-11",  //English translations switch the order of the two phrases (so 38b orig is 39b KJV, and 39 orig is 39a KJV)
  "45007009": "45007009:1-15",
  "45007010:1-3": "45007009:16-",   //"45007010:1-3": "45007009:16-18",
  "45007010:4-": "45007010",     //"45007010:4-14": "45007010",
  "45009011": "45009011:1-24",
  "45009012:1-7": "45009011:25-",  //"45009012:1-7": "45009011:25-32",
  "45009012:8-": "45009012",    //"45009012:8-15": "45009012",
  "47010004:1-15": "47010004",
  "47010004:16-": "47010005:1-3",   //"47010004:16-17": "47010005:1-3",
  "47010005": "47010005:4-",     //"47010005": "47010005:4-26",
  "47013012:1-5": "47013012",
  "47013012:6-": "47013013",  //"47013012:6-10": "47013013",
  "47013013": "47013014",
  "48002019:1-9": "48002019",
  "48002019:10-": "48002020:1-5",   //"48002019:10-11": "48002020:1-5",
  "48002020": "48002020:6-",     //"48002020": "48002020:6-44",
  "49002014:1-17": "49002014",
  "49002014:18-": "49002015:1-7",  //"49002014:18-23": "49002015:1-7",
  "49002015": "49002015:8-",    //"49002015": "49002015:8-21",
  "50002007:1-10": "50002007",
  "50002007:11-": "50002008:1-8",  //"50002007:11-15": "50002008:1-8",
  "50002008": "50002008:9-",   //"50002008": "50002008:9-22",
  "52002006": "52002006:1-13",
  "52002007:1-7": "52002006:14-",  //"52002007:1-7": "52002006:14-24",
  "52002007:8-": "52002007",    //"52002007:8-21": "52002007",
  "58003009": "58003009:1-11",
  "58003010:1-2": "58003009:12-",  //"58003010:1-2": "58003009:12-13",
  "58003010:3-": "58003010",   //"58003010:3-20": "58003010",
  "58007020:1-6": "58007020",
  "58007020:7-": "58007021:1-8",   //"58007020:7-14": "58007021:1-8",
  "58007021": "58007021:9-",    //"58007021": "58007021:9-37",
  "58012022:1-13": "58012022",
  "58012022:14": "58012023:1-4",
  "58012023": "58012023:5-",    //"58012023": "58012023:5-30",
  "60003015": "60003015:1-31",
  "60003016:1-5": "60003015:32-",   //"60003016:1-5": "60003015:32-35",
  "60003016:6-": "60003016",   //"60003016:6-21": "60003016",
  "62002013": "62002013:1-28",
  "62002014:1-7": "62002013:29-",   //"62002014:1-7": "62002013:29-40",
  "62002014:8-": "62002014",     //"62002014:8-33": "62002014",
  "64001014": "64001014:1-15",
  "64001015": "64001014:16-",  //"64001015": "64001014:16-28",
  "66002027": "66002027:1-22",
  "66002028:1-7": "66002027:23-",  //"66002028:1-7": "66002027:23-29",
  "66002028:8-14": "66002028",    //"66002028:8-": "66002028",
  "66012018": "66013001:1-9",
  "66013001": "66013001:10-",   //"66013001": "66013001:10-39",
  "66017009:1-18": "66017009",
  "66017009:19-": "66017010:1-5",   //"66017009:19-22": "66017010:1-5",
  "66017010": "66017010:6-",    //"66017010": "66017010:6-28",
}

export default kjvLikeVerseMappings