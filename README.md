# Bible Tags

## About

*Original language Bible study for everyone, in every language.*

Vision: That every Christian might have free access to the Bible tagged to the original Hebrew, Aramaic and Greek with parsing and lexical information—all in their own language.

For more information on this project, see the [Bible Tags website](https://bibletags.org).

## Repos

* [bibletags-data](https://github.com/educational-resources-and-services/bibletags-data) **(Contains general information on project design, installation, and contributing.)**
* [bibletags-react-native-app](https://github.com/educational-resources-and-services/bibletags-react-native-app)
* [bibletags-ui-helper](https://github.com/educational-resources-and-services/bibletags-ui-helper)
* [bibletags-versification](https://github.com/educational-resources-and-services/bibletags-versification)
* [bibletags-widget](https://github.com/educational-resources-and-services/bibletags-widget)
* [bibletags-widget-script](https://github.com/educational-resources-and-services/bibletags-widget-script)

## Bugs

* Use the appropriate repository's `Issues`. Please first check if your bug report / feature request already exists before submitting a new issue.
* For bug reports, please provide a clear description of the problem and step-by-step explanation of how to reproduce it.

# bibletags-versification

## Concept and approach

To line up verses between versions correctly, we will need to have versification mapping. However, we also want versification mapping primarily to be in the widget so as to reduce the amount of data that needs to be retrieved from the server with the use of each new translation. Thus, we use the concept of "versification models," since versification for most versions falls into one of a few traditions. Thus, a versification model id will live in the versions table in the database, along with any exceptional versification details. For each retrieved version, this information will be recorded in localStorage to avoid the need to retrieve it repeatedly.

Versification is also complicated by the fact that some versions occasionally deliniate by verse range instead of individual verses. For example, John 10:22-23 are presented together in the Living Bible (TLB). In such cases, such verse ranges should be treated as the initial verse alone (i.e. John 10:22 in our example), but be mapped to the entire verse range in the original language. This approach assumes verse ranges to be exceptional. Versions containing many verse ranges (eg. The Message), on the other hand, are uncondussive to the Bible Tags project, being paraphrases more than translations.

### Functions exposed

- `isValidRefInOriginal({ bookId, chapter, verse }): Boolean`
- `getPreviousOriginalLoc(loc): String`
- `getNextOriginalLoc(loc): String`
- `getOriginalLocsFromRange(fromLoc, toLoc): [ String ]`
- `getCorrespondingRefs({ baseVersion, lookupVersionInfo }): [ { bookId: Int, chapter: Int, verse: Int} ]`
- `hasCorrespondingVerseInOriginal(version): Boolean`
- `getNumberOfChapters({ versionInfo, bookId }): Boolean or null`
- `getStartAndEndVersesByChapter({ versionInfo, bookId }): [ Int, Int ] or null`
- `getBookIdListWithCorrectOrdering({ versionInfo: { hebrewOrdering, partialScope } }): [ Int ]`
- `getLocFromRef({ bookId, chapter, verse, wordRanges }): String`
- `getRefFromLoc(loc): Object`
- `padLocWithLeadingZero(loc): String`

#### Example locs and refs

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