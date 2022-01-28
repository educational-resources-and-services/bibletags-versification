"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.padLocWithLeadingZero = exports.getRefFromLoc = exports.getLocFromRef = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var padLocWithLeadingZero = function padLocWithLeadingZero(loc) {
  return ('0' + loc).substr(-8);
};
/*
  Example locs and refs

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
*/


exports.padLocWithLeadingZero = padLocWithLeadingZero;

var getLocFromRef = function getLocFromRef(_ref) {
  var bookId = _ref.bookId,
      chapter = _ref.chapter,
      verse = _ref.verse,
      wordRanges = _ref.wordRanges;
  return "".concat(('0' + bookId).substr(-2)).concat(('00' + chapter).substr(-3)).concat(('00' + verse).substr(-3)) + "".concat(wordRanges ? ":".concat(wordRanges.join(",")) : '');
};

exports.getLocFromRef = getLocFromRef;

var getRefFromLoc = function getRefFromLoc(loc) {
  return _objectSpread({
    bookId: parseInt(loc.substr(0, 2), 10),
    chapter: parseInt(loc.substr(2, 3), 10),
    verse: parseInt(loc.substr(5, 3), 10)
  }, loc.substr(8, 1) === ':' ? {
    wordRanges: loc.substr(9).split(",")
  } : '');
};

exports.getRefFromLoc = getRefFromLoc;