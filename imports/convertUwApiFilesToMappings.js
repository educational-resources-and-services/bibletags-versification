const fs = require('fs');

const mappingsFolder = './imports/uw-api-files/canonical-mappings-only/';

const bookAbbrToIDMapping = {
  "GEN": "01",
  "EXO": "02",
  "LEV": "03",
  "NUM": "04",
  "DEU": "05",
  "JOS": "06",
  "JDG": "07",
  "RUT": "08",
  "1SA": "09",
  "2SA": "10",
  "1KI": "11",
  "2KI": "12",
  "1CH": "13",
  "2CH": "14",
  "EZR": "15",
  "NEH": "16",
  "EST": "17",
  "JOB": "18",
  "PSA": "19",
  "PRO": "20",
  "ECC": "21",
  "SNG": "22",
  "ISA": "23",
  "JER": "24",
  "LAM": "25",
  "EZK": "26",
  "DAN": "27",
  "HOS": "28",
  "JOL": "29",
  "AMO": "30",
  "OBA": "31",
  "JON": "32",
  "MIC": "33",
  "NAM": "34",
  "HAB": "35",
  "ZEP": "36",
  "HAG": "37",
  "ZEC": "38",
  "MAL": "39",
  "MAT": "40",
  "MRK": "41",
  "LUK": "42",
  "JHN": "43",
  "ACT": "44",
  "ROM": "45",
  "1CO": "46",
  "2CO": "47",
  "GAL": "48",
  "EPH": "49",
  "PHP": "50",
  "COL": "51",
  "1TH": "52",
  "2TH": "53",
  "1TI": "54",
  "2TI": "55",
  "TIT": "56",
  "PHM": "57",
  "HEB": "58",
  "JAS": "59",
  "1PE": "60",
  "2PE": "61",
  "1JN": "62",
  "2JN": "63",
  "3JN": "64",
  "JUD": "65",
  "REV": "66"
}

fs.readdir(mappingsFolder, (err, files) => {
  files.forEach(file => {
    fs.readFile(`${mappingsFolder}${file}`, 'utf8', function(err, contents) {

      const repeats = {}

      contents = contents
        .split(/\n/g)
        .filter(line => line.trim() && line.indexOf('#') !== 0)
        .join("\n")
        .replace(/^(.*) = (.*)$/gm, "$2 ~ $1")
        .replace(/([A-Z1-2]{3} [0-9]+:)([0-9]+-)([0-9]+)/g, "$1$2$1$3")
        .replace(/([A-Z1-2]{3}) ([0-9]+):([0-9]+)/g, (x, book, chapter, verse) => (
          `${bookAbbrToIDMapping[book]}${('00'+chapter).substr(-3)}${('00'+verse).substr(-3)}`
        ))
        .replace(/([0-9]{8})-([0-9]{8}) ~ ([0-9]{8})-([0-9]{8})/g, (x, loc1a, loc1b, loc2a, loc2b) => {
          const difference = parseInt(loc2a) - parseInt(loc1a)
          if(
            difference === parseInt(loc2b) - parseInt(loc1b)
            && loc1a.substr(0,5) === loc1b.substr(0,5)
            && loc2a.substr(0,5) === loc2b.substr(0,5)
          ) {
            return `"${loc1a}-${loc1b.substr(-3)}": ${difference},`
          } else {
            return `------------------------> BAD! ${loc1a}, ${loc1b}, ${loc2a}, ${loc2b}`
          }
        })
        .replace(/([0-9]{8}) ~ ([0-9]{8})/g, '"$1": "$2",')

      console.log(`\n\n------- ${file} -------\n`)
      console.log(contents)

      contents.match(/[0-9]{8}/g).forEach(loc => {
        if(!repeats[loc]) repeats[loc] = 0
        repeats[loc]++
      })

      console.log(`\nREPEATS:`)
      for(let loc in repeats) {
        if(repeats[loc] > 1) console.log(loc)
      }

    })
  })
})

