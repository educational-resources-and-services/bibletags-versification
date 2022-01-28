"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCorrespondingRefs = exports.getBookIdListWithCorrectOrdering = void 0;
Object.defineProperty(exports, "getLocFromRef", {
  enumerable: true,
  get: function get() {
    return _locFunctions.getLocFromRef;
  }
});
exports.getPreviousOriginalLoc = exports.getOriginalLocsFromRange = exports.getNumberOfChapters = exports.getNextOriginalLoc = void 0;
Object.defineProperty(exports, "getRefFromLoc", {
  enumerable: true,
  get: function get() {
    return _locFunctions.getRefFromLoc;
  }
});
exports.isValidRefInOriginal = exports.hasCorrespondingVerseInOriginal = exports.getStartAndEndVersesByChapter = void 0;
Object.defineProperty(exports, "padLocWithLeadingZero", {
  enumerable: true,
  get: function get() {
    return _locFunctions.padLocWithLeadingZero;
  }
});

var _numberOfVersesPerChapterPerBook = _interopRequireDefault(require("./data/numberOfVersesPerChapterPerBook"));

var _hebrewOrderingOfBookIds = _interopRequireDefault(require("./data/hebrewOrderingOfBookIds"));

var _getVerseMappingsByVersionInfo = _interopRequireDefault(require("./utils/getVerseMappingsByVersionInfo"));

var _locFunctions = require("./utils/locFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var VALID_PARTIAL_SCOPE_VALUES = [null, undefined, 'ot', 'nt'];
var VALID_SKIPS_UNLIKELY_ORIG_VALUES = [true, false, undefined];

var isValidRefInOriginal = function isValidRefInOriginal(_ref) {
  var bookId = _ref.bookId,
      chapter = _ref.chapter,
      verse = _ref.verse;
  return bookId >= 1 && bookId <= 66 && verse >= 1 && verse <= _numberOfVersesPerChapterPerBook["default"][bookId - 1][chapter - 1];
};

exports.isValidRefInOriginal = isValidRefInOriginal;

var getPreviousOriginalLoc = function getPreviousOriginalLoc(loc) {
  var _getRefFromLoc = (0, _locFunctions.getRefFromLoc)(loc),
      bookId = _getRefFromLoc.bookId,
      chapter = _getRefFromLoc.chapter,
      verse = _getRefFromLoc.verse;

  if (verse > 1) {
    verse--;
  } else if (chapter > 1) {
    chapter--;
    verse = _numberOfVersesPerChapterPerBook["default"][bookId - 1][chapter - 1];
  } else {
    return null;
  }

  return (0, _locFunctions.getLocFromRef)({
    bookId: bookId,
    chapter: chapter,
    verse: verse
  });
};

exports.getPreviousOriginalLoc = getPreviousOriginalLoc;

var getNextOriginalLoc = function getNextOriginalLoc(loc) {
  var _getRefFromLoc2 = (0, _locFunctions.getRefFromLoc)(loc),
      bookId = _getRefFromLoc2.bookId,
      chapter = _getRefFromLoc2.chapter,
      verse = _getRefFromLoc2.verse;

  if (verse < _numberOfVersesPerChapterPerBook["default"][bookId - 1][chapter - 1]) {
    verse++;
  } else if (chapter < _numberOfVersesPerChapterPerBook["default"][bookId - 1].length) {
    chapter++;
    verse = 1;
  } else {
    return null;
  }

  return (0, _locFunctions.getLocFromRef)({
    bookId: bookId,
    chapter: chapter,
    verse: verse
  });
};

exports.getNextOriginalLoc = getNextOriginalLoc;

var getOriginalLocsFromRange = function getOriginalLocsFromRange(fromLoc, toLoc) {
  var fromRef = (0, _locFunctions.getRefFromLoc)(fromLoc);
  var toRef = (0, _locFunctions.getRefFromLoc)(toLoc);

  var refLessThanOrEqualTo = function refLessThanOrEqualTo(ref1, ref2) {
    return isValidRefInOriginal(ref1) && isValidRefInOriginal(ref2) && ref1.bookId === ref2.bookId && (ref1.chapter < ref2.chapter || ref1.chapter === ref2.chapter && ref1.verse <= ref2.verse);
  };

  if (!refLessThanOrEqualTo(fromRef, toRef)) return [];
  var locs = [fromLoc.replace(/-.*$/, '-')];
  var bookId = fromRef.bookId,
      chapter = fromRef.chapter,
      verse = fromRef.verse;
  verse++;

  do {
    while (refLessThanOrEqualTo({
      bookId: bookId,
      chapter: chapter,
      verse: verse
    }, toRef)) {
      locs.push((0, _locFunctions.getLocFromRef)({
        bookId: bookId,
        chapter: chapter,
        verse: verse
      }));
      verse++;
    }

    chapter++;
    verse = 1;
  } while (chapter <= toRef.chapter);

  locs.splice(locs.length - 1, 1, toLoc.replace(/:.*-$/, '').replace(/:.*([0-9]+)$/, ':1-$1'));
  return locs;
};

exports.getOriginalLocsFromRange = getOriginalLocsFromRange;

var getCorrespondingRefs = function getCorrespondingRefs(_ref2) {
  var _ref2$baseVersion = _ref2.baseVersion,
      baseVersion = _ref2$baseVersion === void 0 ? {} : _ref2$baseVersion,
      _ref2$lookupVersionIn = _ref2.lookupVersionInfo,
      lookupVersionInfo = _ref2$lookupVersionIn === void 0 ? {} : _ref2$lookupVersionIn;

  // Returns one of the following:
  // an array of `ref` objects with keys `bookId`, `chapter`, `verse` and possibly `wordRanges`
  // `false` if there is not a valid verse in the corresponding version
  // `null` if invalid parameters were passed
  // Must go from an original text to a translation, or vice versa.
  if (_typeof(baseVersion) !== 'object' || _typeof(baseVersion.info) !== 'object' || _typeof(lookupVersionInfo) !== 'object') {
    return null;
  }

  if (!VALID_PARTIAL_SCOPE_VALUES.includes(baseVersion.info.partialScope)) {
    return null;
  }

  if (!VALID_PARTIAL_SCOPE_VALUES.includes(lookupVersionInfo.partialScope)) {
    return null;
  }

  if (!VALID_SKIPS_UNLIKELY_ORIG_VALUES.includes(baseVersion.info.skipsUnlikelyOriginals)) {
    return null;
  }

  if (!VALID_SKIPS_UNLIKELY_ORIG_VALUES.includes(lookupVersionInfo.skipsUnlikelyOriginals)) {
    return null;
  }

  if (!Number.isInteger(baseVersion.ref.bookId) || !Number.isInteger(baseVersion.ref.chapter) || !Number.isInteger(baseVersion.ref.verse) || baseVersion.ref.bookId < 1 || baseVersion.ref.chapter < 1 || baseVersion.ref.verse < 0) {
    return null;
  }

  var isOriginal = function isOriginal(info) {
    return !!(info.versificationModel === 'original' && !info.skipsUnlikelyOriginals && !info.extraVerseMappings);
  };

  var fromOriginal = isOriginal(baseVersion.info);

  if (!fromOriginal && !isOriginal(lookupVersionInfo)) {
    // must be one original text and one non-original
    return null;
  }

  var verseMappingsByVersionInfo = (0, _getVerseMappingsByVersionInfo["default"])(fromOriginal ? lookupVersionInfo : baseVersion.info);

  var baseVersionRefWithoutWordRanges = _objectSpread({}, baseVersion.ref);

  delete baseVersionRefWithoutWordRanges.wordRanges;
  var baseLoc = (0, _locFunctions.getLocFromRef)(baseVersionRefWithoutWordRanges);

  if (!verseMappingsByVersionInfo || !/^[0-9]{8}$/.test(baseLoc)) {
    // bad parameter
    return null;
  }

  if (baseVersion.info.partialScope === 'ot' && baseVersion.ref.bookId >= 40 || baseVersion.info.partialScope === 'nt' && baseVersion.ref.bookId <= 39) {
    // invalid verse in base version
    return null;
  }

  if (lookupVersionInfo.partialScope === 'ot' && baseVersion.ref.bookId >= 40 || lookupVersionInfo.partialScope === 'nt' && baseVersion.ref.bookId <= 39) {
    // the corresponding version does not have this testament of the Bible
    return false;
  }

  var lookupLocs = verseMappingsByVersionInfo[fromOriginal ? 'originalToTranslation' : 'translationToOriginal'][baseLoc];

  if (typeof lookupLocs === 'undefined') {
    if (!isValidRefInOriginal((0, _locFunctions.getRefFromLoc)(baseLoc))) {
      // this verse does not have a valid corresponding verse in the original version
      return false;
    }

    if (!fromOriginal) {
      // Need to discern lookup locs that go nowhere because orig of that loc was mapped elsewhere
      var refs = getCorrespondingRefs({
        baseVersion: {
          info: lookupVersionInfo,
          ref: baseVersionRefWithoutWordRanges
        },
        lookupVersionInfo: baseVersion.info
      });

      if (refs.length !== 1 || refs[0].chapter !== baseVersionRefWithoutWordRanges.chapter || refs[0].verse !== baseVersionRefWithoutWordRanges.verse) {
        return false;
      }
    } // baseVersion and original have the same versification for this verse


    lookupLocs = [baseLoc];
  } else if (lookupLocs === null) {
    // there are no corresponding verses in the original version
    return [];
  } else if (_typeof(lookupLocs) === 'object') {
    // we want all the locations that the baseVersion mapped to, regardless of wordRanges
    lookupLocs = Object.values(lookupLocs);
  } else {
    // always make it an array, since it may be mapped to more than one location in the original
    lookupLocs = [lookupLocs];
  } // condense wordRanges together so there is only one range per verse


  var locsWithWordRanges = {};
  lookupLocs.forEach(function (lookupVersionLoc) {
    var _lookupVersionLoc$spl = lookupVersionLoc.split(/:/),
        _lookupVersionLoc$spl2 = _slicedToArray(_lookupVersionLoc$spl, 2),
        lookupVersionLocWithoutWordRange = _lookupVersionLoc$spl2[0],
        wordRangeStr = _lookupVersionLoc$spl2[1];

    if (wordRangeStr) {
      if (!locsWithWordRanges[lookupVersionLocWithoutWordRange]) {
        locsWithWordRanges[lookupVersionLocWithoutWordRange] = [];
      }

      locsWithWordRanges[lookupVersionLocWithoutWordRange].push(wordRangeStr);
    }
  });

  var removeLookupVersionLocsStartingWith = function removeLookupVersionLocsStartingWith(str) {
    lookupLocs = lookupLocs.filter(function (lookupVersionLoc) {
      return lookupVersionLoc.indexOf(str) !== 0;
    });
  };

  for (var loc in locsWithWordRanges) {
    if (locsWithWordRanges[loc].length === Object.keys(verseMappingsByVersionInfo[fromOriginal ? 'translationToOriginal' : 'originalToTranslation'][loc]).length) {
      // wordRanges cover the entire verse, so no need to indicate wordRanges
      lookupLocs.push(loc);
      removeLookupVersionLocsStartingWith("".concat(loc, ":"));
    } else if (locsWithWordRanges[loc].length > 1) {
      // wordRanges do not cover the entire verse, so we want to combine them into
      // a single loc with as few pieces as possible
      // put them in order
      locsWithWordRanges[loc].sort(function (range1, range2) {
        return parseInt(range1.split('-')[0], 10) > parseInt(range2.split('-')[0], 10) ? 1 : -1;
      }); // reduce

      locsWithWordRanges[loc].reduce(function (ranges, thisRange) {
        if (_typeof(ranges) !== 'object') {
          ranges = [ranges];
        }

        var partsOfLastRange = ranges[ranges.length - 1].split('-');
        var partsOfNewRange = thisRange.split('-');

        if ((parseInt(partsOfLastRange[1], 10) || 0) + 1 === parseInt(partsOfNewRange[0], 10)) {
          ranges[ranges.length - 1] = "".concat(partsOfLastRange[0], "-").concat(partsOfNewRange[1]);
        } else {
          ranges.push(thisRange);
        }

        return ranges;
      }); // push on new loc with 1+ word ranges

      removeLookupVersionLocsStartingWith("".concat(loc, ":"));
      lookupLocs.push("".concat(loc, ":").concat(lowEndOfTotalWordRange, "-").concat(highEndOfTotalWordRange));
    }
  }

  return lookupLocs.map(function (lookupVersionLoc) {
    return (0, _locFunctions.getRefFromLoc)(lookupVersionLoc);
  });
};

exports.getCorrespondingRefs = getCorrespondingRefs;

var hasCorrespondingVerseInOriginal = function hasCorrespondingVerseInOriginal(version) {
  // Returns `true` or `false`, or null if passed an invalid parameter. Assumes version parameter to represent a valid passage.
  // Note: When a translation has a verse that is not in the original Hebrew, Aramaic or
  // Greek (translated, perhaps, from the LXX, apocryphal book or chapter, etc), it 
  // will simply fail validation. Hence, this function does not validate the presence
  // of a verse in a translation, but rather that a verse in a translation has a
  // corresponding verse in the original.
  var correspondingRefs = getCorrespondingRefs({
    baseVersion: version,
    lookupVersionInfo: {
      versificationModel: 'original'
    }
  });
  return correspondingRefs ? true : correspondingRefs;
};

exports.hasCorrespondingVerseInOriginal = hasCorrespondingVerseInOriginal;

var getNumberOfChapters = function getNumberOfChapters(_ref3) {
  var versionInfo = _ref3.versionInfo,
      bookId = _ref3.bookId;
  var numberOfVersesPerChapter = _numberOfVersesPerChapterPerBook["default"][bookId - 1];
  if (!numberOfVersesPerChapter) return null;
  var chapter = numberOfVersesPerChapter.length;
  var verse = numberOfVersesPerChapter[chapter - 1];
  var correspondingRefs;

  var goGetCorrespondingRefs = function goGetCorrespondingRefs(chapterAndVerse) {
    return getCorrespondingRefs({
      baseVersion: {
        info: {
          versificationModel: 'original'
        },
        ref: _objectSpread({
          bookId: bookId
        }, chapterAndVerse)
      },
      lookupVersionInfo: versionInfo
    });
  };

  var getLastChapterFromRefs = function getLastChapterFromRefs(refs) {
    return ((refs || []).pop() || {}).chapter || 0;
  };

  while (!correspondingRefs && verse > 0) {
    correspondingRefs = goGetCorrespondingRefs({
      chapter: chapter,
      verse: verse
    });
    verse--;
  } // The above may be wrong as it assumes the last verse in a book in one version is the last verse in that book in another.
  // But, SYNO has the last verses in Romans two chapters back! (As a result, the above would only show 14 chapters for Romans in SYNO.)
  // Hence I run a check on verse 1 of the last chapter of the book as well below, and take the greater of the two.


  var numChapters = Math.max(getLastChapterFromRefs(correspondingRefs), getLastChapterFromRefs(goGetCorrespondingRefs({
    chapter: chapter,
    verse: 1
  })));
  return numChapters || null;
};

exports.getNumberOfChapters = getNumberOfChapters;

var getStartAndEndVersesByChapter = function getStartAndEndVersesByChapter(_ref4) {
  var versionInfo = _ref4.versionInfo,
      bookId = _ref4.bookId;
  var numberOfVersesPerChapter = _numberOfVersesPerChapterPerBook["default"][bookId - 1];
  var startAndEndVersesByChapter = [];

  if (!numberOfVersesPerChapter || versionInfo.partialScope === 'ot' && bookId >= 40 || versionInfo.partialScope === 'nt' && bookId <= 39) {
    // this version does not have this testament of the Bible
    return {
      startAndEndVersesByChapter: [],
      skippedVerses: []
    };
  } // for each chapter in the original


  numberOfVersesPerChapter.forEach(function (numVersesInOrig, idx) {
    var isValidVerse = function isValidVerse(verse) {
      return hasCorrespondingVerseInOriginal({
        info: versionInfo,
        ref: {
          bookId: bookId,
          chapter: idx + 1,
          verse: verse
        }
      });
    }; // find the first valid verse in the chapter


    var BEYOND_MAX_VERSE_NUM = 140;
    var firstVerseInChapter = 0;

    while (firstVerseInChapter < BEYOND_MAX_VERSE_NUM && !isValidVerse(firstVerseInChapter)) {
      firstVerseInChapter++;
    } // now find the last valid verse in the chapter


    var lastVerseInChapter = numVersesInOrig; // start with the last in the original and reduce until we have a valid verse

    while (lastVerseInChapter > 0 && !isValidVerse(lastVerseInChapter)) {
      lastVerseInChapter--;
    } // now go forward until there is an invalid verse


    while (isValidVerse(lastVerseInChapter)) {
      lastVerseInChapter++;
    } // finally, back one to the last valid verse


    lastVerseInChapter--; // mark this the number of verses in this chapter

    startAndEndVersesByChapter[idx] = firstVerseInChapter !== BEYOND_MAX_VERSE_NUM && lastVerseInChapter ? [firstVerseInChapter, lastVerseInChapter] : null;
  }); // remove null chapters at the end

  var hitChapterWithVerses = false;
  startAndEndVersesByChapter = startAndEndVersesByChapter.reverse().filter(function (startAndEndVerses) {
    if (startAndEndVerses) {
      hitChapterWithVerses = true;
      return true;
    }

    return hitChapterWithVerses;
  }).reverse(); // find skipped verses in each chapter of this book

  var verseMappingsByVersionInfo = (0, _getVerseMappingsByVersionInfo["default"])(versionInfo);
  var skippedLocs = Object.keys(verseMappingsByVersionInfo.originalToTranslation).filter(function (loc) {
    return parseInt(loc.substr(0, 2), 10) === bookId && verseMappingsByVersionInfo.originalToTranslation[loc] === null;
  });
  return {
    startAndEndVersesByChapter: startAndEndVersesByChapter,
    skippedLocs: skippedLocs
  };
};

exports.getStartAndEndVersesByChapter = getStartAndEndVersesByChapter;

var getBookIdListWithCorrectOrdering = function getBookIdListWithCorrectOrdering(_ref5) {
  var _ref5$versionInfo = _ref5.versionInfo,
      hebrewOrdering = _ref5$versionInfo.hebrewOrdering,
      partialScope = _ref5$versionInfo.partialScope;
  var books = hebrewOrdering ? [].concat(_toConsumableArray(_hebrewOrderingOfBookIds["default"]), _toConsumableArray(Array(27).fill(0).map(function (x, idx) {
    return idx + 40;
  }))) : Array(66).fill(0).map(function (x, idx) {
    return idx + 1;
  });

  if (partialScope === 'ot') {
    books.splice(39, 27);
  }

  if (partialScope === 'nt') {
    books.splice(0, 39);
  }

  return books;
};

exports.getBookIdListWithCorrectOrdering = getBookIdListWithCorrectOrdering;