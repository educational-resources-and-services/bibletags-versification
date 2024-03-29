# Bible Tags

## About

*Original language Bible study for everyone, in every language.*

Vision: That every Christian might have free access to the Bible tagged to the original Hebrew, Aramaic and Greek with parsing and lexical information—all in their own language.

For more information on this project, see the [Bible Tags website](https://bibletags.org).

## Repos

* [bibletags-data](https://github.com/educational-resources-and-services/bibletags-data)
* [bibletags-react-native-app](https://github.com/educational-resources-and-services/bibletags-react-native-app)
* [bibletags-ui-helper](https://github.com/educational-resources-and-services/bibletags-ui-helper)
* [bibletags-versification](https://github.com/educational-resources-and-services/bibletags-versification)
* [bibletags-usfm](https://github.com/educational-resources-and-services/bibletags-usfm)
* [bibletags-widget](https://github.com/educational-resources-and-services/bibletags-widget)
* [bibletags-widget-script](https://github.com/educational-resources-and-services/bibletags-widget-script)

## Bugs

* Report [here](https://github.com/educational-resources-and-services/bibletags-data/issues).

# bibletags-versification

## Concept and approach

To line up verses between versions correctly, we will need to have versification mapping. We use the concept of "versification models," since versification for most versions falls into one of a few traditions. See the `src/data` directory for these base mappings. Thus `versionInfo` (see below), which contains the versification model id and any exceptional versification details, is a required parameter for many of the exposed functions.

Versification is also complicated by the fact that some versions occasionally delineate by verse range instead of individual verses. For example, John 10:22-23 are presented together in the Living Bible (TLB). In such cases, such verse ranges should be treated as the initial verse alone (i.e. John 10:22 in our example), but be mapped to the entire verse range in the original language. This approach assumes verse ranges to be exceptional. Versions containing many verse ranges (e.g. The Message), on the other hand, are uncondussive to the Bible Tags project, being paraphrases more than translations.

Finally, this library allows for partial verse mapping as well.

## Usage

```bash
npm i @bibletags/bibletags-versification
```

##### ES6

```js
import { ... } from '@bibletags/bibletags-versification'
```

##### NodeJS

```js
const { ... } = require('@bibletags/bibletags-versification/node_build')
```

## Development

### Installation

```bash
git clone https://github.com/educational-resources-and-services/bibletags-versification
cd bibletags-versification
npm install
```

### Testing

```js
npm run test
```

## Functions exposed

```js
isValidRefInOriginal({ bookId, chapter, verse }): Boolean
```

```js
getPreviousOriginalLoc(loc): String
```

```js
getNextOriginalLoc(loc): String
```

```js
getPreviousTranslationRef({ ref, loc, info }): { bookId, chapter, verse }
```

```js
getNextTranslationRef({ ref, loc, info }): { bookId, chapter, verse }
```

```js
getOriginalLocsFromRange(fromLoc, toLoc): [ String ]
```

```js
getCorrespondingRefs({ baseVersion, lookupVersionInfo }): [ { bookId: Int, chapter: Int, verse: Int} ]
```

```js
getVerseMappingsByVersionInfo(versionInfo): { originalToTranslation: Array, translationToOriginal: Array }
```

```js
hasCorrespondingVerseInOriginal(version): Boolean
```

```js
getNumberOfChapters({ versionInfo, bookId }): Boolean or null
```

```js
getStartAndEndVersesByChapter({ versionInfo, bookId }): [ Int, Int ] or null
```

```js
getBookIdListWithCorrectOrdering({ versionInfo: { hebrewOrdering, partialScope } }): [ Int ]
```

```js
getLocFromRef({ bookId, chapter, verse, wordRanges }): String
```

```js
getRefFromLoc(loc): Object
```

```js
padLocWithLeadingZero(loc): String
```


## Parameter examples

### `versionInfo`

```js
{
  versificationModel: 'kjv',
  skipsUnlikelyOriginals: true,
  partialScope: 'ot',  // should be "ot", "nt" or undefined
  extraVerseMappings: {

    // 8+ character strings represent a passage location:
    //   BBCCCVVV
    //     BB is a zero-padded bookId with KJV ordering (1-66)
    //     CCC is a zero-padded chapter
    //     VVV is a zero-padded verse
    //   BBCCCVVV:W1-W2
    //     W1 is the starting word number in cases where a partial verse must be mapped
    //     W2 is the ending word number in cases where a partial verse must be mapped (MUST be left blank when it covers the rest of the verse)
    //   BBCCCVVV-VVV
    //     The key can also be a location range, with an integer as the value. Use this
    //     when all the verses in the key range are to be increased by the same amount.

    "02011030": "02012001",  // single original verse mapped to a single translation verse
    "02012001-021": -1,  // all original verses in this range need to be reduced by 1 to map properly to the translation
    "05022005:1-5": "05022005",  // verse 5 in the original maps to two in the translation; words 1-5 correspond to verse 5 in the translation...
    "05022005:6-": "05022006",  // ...while words 6 through the end correspond to verse 6 in the translation
    "08002009:5-10": "08002009:1-7",  // words 5-10 in the original correspond to words 1-7 in the translation
    "08002010:1-2": "08002009:8-9",  // words 1-2 of verse 10 in the original correspond to words 8-9 of verse 9 in the translation
    "40017014": "40017014:1-19",  // all of verse 14 in the original correspond to only words 1-19 of the translation
    "40017015:1-2": "40017014:20-",  // words 1-2 of verse 15 in the original correspond to word 20 of verse 14 to the end of that same verse in the translation
    "40017015:3-": "40017015",  // word 3 of verse 15 to the end of the same verse correspond to verse 15 in the translation
  },
}
```

### `loc` and `ref`

```js
01001001
{
  bookId: 1,
  chapter: 1,
  verse: 1,
}

01001001:1-3
{
  bookId: 1,
  chapter: 1,
  verse: 1,
  wordRanges: ["1-3"],
}

01001001:4-
{
  bookId: 1,
  chapter: 1,
  verse: 1,
  wordRanges: ["4-"],
}

01001001:1-3,7-9
{
  bookId: 1,
  chapter: 1,
  verse: 1,
  wordRanges: ["1-3","7-9"],
}
```

[UnfoldingWord's Versification data](https://github.com/unfoldingWord-dev/uw-api) used in part to develop versification mappings and tests. (See the `imports` directory.)