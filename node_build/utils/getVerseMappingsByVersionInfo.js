"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _kjvLikeVerseMappings = _interopRequireDefault(require("../data/kjvLikeVerseMappings"));

var _lxxVerseMappings = _interopRequireDefault(require("../data/lxxVerseMappings"));

var _synodalVerseMappings = _interopRequireDefault(require("../data/synodalVerseMappings"));

var _locFunctions = require("./locFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

// Assuming a one-way mapping set takes up ~3k, 200 two-way mapping sets would be 1.2 MB of memory
var MAX_NUMBER_OF_MAPPING_SETS = 200;
var VALID_VERSIFICATION_MODELS = ['original', 'kjv', 'lxx', 'synodal'];
var VALID_PARTIAL_SCOPE_VALUES = [null, undefined, 'ot', 'nt'];
var verseMappings = {
  original: {},
  kjv: _kjvLikeVerseMappings["default"],
  lxx: _lxxVerseMappings["default"],
  synodal: _synodalVerseMappings["default"]
};
var unlikelyOriginals = {
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
  "45016024": null
};
var extraVerseMappingsKeys = {};
var extraVerseMappingsIndex = 0;
var verseMappingsByVersionInfo = {};
Object.keys(verseMappings).forEach(function (versificationModel) {
  return verseMappingsByVersionInfo[versificationModel] = {};
});

var getVerseMappingsByVersionInfo = function getVerseMappingsByVersionInfo() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      partialScope = _ref.partialScope,
      versificationModel = _ref.versificationModel,
      skipsUnlikelyOriginals = _ref.skipsUnlikelyOriginals,
      extraVerseMappings = _ref.extraVerseMappings;

  // validate parameters
  if (!VALID_PARTIAL_SCOPE_VALUES.includes(partialScope)) {
    return null;
  }

  if (!VALID_VERSIFICATION_MODELS.includes(versificationModel)) {
    return null;
  }

  if (!(!extraVerseMappings || _typeof(extraVerseMappings) === 'object')) {
    return null;
  } // Look to see if a versification mapping for these parameters is already compiled


  var extraVerseMappingsJSON = JSON.stringify(extraVerseMappings || {});
  var extraVerseMappingsKey = extraVerseMappingsKeys[extraVerseMappingsJSON];

  if (!extraVerseMappingsKey) {
    extraVerseMappingsKey = extraVerseMappingsKeys[extraVerseMappingsJSON] = extraVerseMappingsIndex++;
  }

  if (!verseMappingsByVersionInfo[versificationModel]["".concat(extraVerseMappingsKey, "-").concat(!!skipsUnlikelyOriginals)]) {
    // Create object of versification mappings without abbreviations
    var overrideMappings = function overrideMappings(_ref2) {
      var baseMappings = _ref2.baseMappings,
          overrideMappings = _ref2.overrideMappings;

      var getWordRangeInts = function getWordRangeInts(wordRange) {
        return wordRange.split('-').map(function (strNum) {
          return parseInt(strNum === '' ? 1000 : strNum, 10);
        });
      }; // process baseMappings


      var baseMappingsMap = {};
      Object.keys(baseMappings).forEach(function (locWithWordRange) {
        var _locWithWordRange$spl = locWithWordRange.split(':'),
            _locWithWordRange$spl2 = _slicedToArray(_locWithWordRange$spl, 2),
            loc = _locWithWordRange$spl2[0],
            wordRange = _locWithWordRange$spl2[1];

        if (!baseMappingsMap[loc]) {
          baseMappingsMap[loc] = [];
        }

        wordRange && baseMappingsMap[loc].push(wordRange);
      }); // delete some from baseMappings, based on keys in overrideMappings

      var baseMappingsCleaned = _objectSpread({}, baseMappings);

      var _loop = function _loop(key) {
        var keyWithoutWordRange = key.split(':')[0];
        delete baseMappingsCleaned[keyWithoutWordRange];
        (baseMappingsMap[keyWithoutWordRange] || []).forEach(function (baseMappingsWordRange) {
          var baseMappingsWordRangeInts = getWordRangeInts(baseMappingsWordRange);
          var overrideMappingWordRangeInts = getWordRangeInts(overrideMappings[key].split(':')[1] || '0-');

          if (overrideMappingWordRangeInts[0] <= baseMappingsWordRangeInts[1] && overrideMappingWordRangeInts[1] >= baseMappingsWordRangeInts[0]) {
            delete baseMappingsCleaned["".concat(keyWithoutWordRange, ":").concat(baseMappingsWordRange)];
          }
        });
      };

      for (var key in overrideMappings) {
        _loop(key);
      } // return merged overrideMappings onto baseMappings


      return _objectSpread(_objectSpread({}, baseMappingsCleaned), overrideMappings);
    }; // get the unparsed versification mappings


    var originalToTranslation = overrideMappings({
      baseMappings: verseMappings[versificationModel],
      overrideMappings: skipsUnlikelyOriginals ? unlikelyOriginals : {}
    });
    originalToTranslation = overrideMappings({
      baseMappings: originalToTranslation,
      overrideMappings: extraVerseMappings || {}
    }); // parse out ranges

    for (var key in originalToTranslation) {
      var keyParts = key.match(/^([0-9]{8})-([0-9]{3})$/);

      if (keyParts) {
        var startingLoc = parseInt(keyParts[1], 10);
        var endingLoc = parseInt(keyParts[1].substr(0, 5) + keyParts[2], 10);

        if (endingLoc >= startingLoc) {
          for (var loc = startingLoc; loc <= endingLoc; loc++) {
            originalToTranslation[(0, _locFunctions.padLocWithLeadingZero)(loc)] = (0, _locFunctions.padLocWithLeadingZero)(loc + originalToTranslation[key]);
          }
        }

        delete originalToTranslation[key];
      }
    } // switch it around, ignoring nulls


    var translationToOriginal = {};

    for (var _key in originalToTranslation) {
      if (originalToTranslation[_key] === null) continue;
      translationToOriginal[originalToTranslation[_key]] = _key;
    } // make multi-level so that all keys are simple locs


    var convertMappingsToMultiLevel = function convertMappingsToMultiLevel(mappings) {
      for (var _key2 in mappings) {
        var _keyParts = _key2.match(/^([0-9]{8}):([0-9]+(?:-[0-9]*)?)$/);

        if (_keyParts) {
          var _loc = _keyParts[1];
          var wordRangeStr = _keyParts[2];
          if (!mappings[_loc]) mappings[_loc] = {};
          mappings[_loc][wordRangeStr] = mappings[_key2];
          delete mappings[_key2];
        }
      }
    };

    convertMappingsToMultiLevel(originalToTranslation);
    convertMappingsToMultiLevel(translationToOriginal);
    verseMappingsByVersionInfo[versificationModel]["".concat(extraVerseMappingsKey, "-").concat(!!skipsUnlikelyOriginals)] = {
      originalToTranslation: originalToTranslation,
      translationToOriginal: translationToOriginal,
      createdAt: Date.now()
    }; // Prevent exhausting memory by not caching too many mappings

    var numMappingSets = 0;
    var oldestMappingSetInfo = {};

    for (var vModel in verseMappingsByVersionInfo) {
      for (var evmKey in verseMappingsByVersionInfo[vModel]) {
        numMappingSets++;
        var createdAt = verseMappingsByVersionInfo[vModel][evmKey]['createdAt'];

        if (!oldestMappingSetInfo || createdAt < oldestMappingSetInfo.createdAt) {
          ({
            vModel: vModel,
            evmKey: evmKey,
            createdAt: createdAt
          }), _readOnlyError("oldestMappingSetInfo");
        }
      }
    }

    if (numMappingSets > MAX_NUMBER_OF_MAPPING_SETS) {
      var _oldestMappingSetInfo = oldestMappingSetInfo,
          _vModel = _oldestMappingSetInfo.vModel,
          _evmKey = _oldestMappingSetInfo.evmKey,
          _createdAt = _oldestMappingSetInfo.createdAt;
      delete verseMappingsByVersionInfo[_vModel][_evmKey];
    }
  }

  return verseMappingsByVersionInfo[versificationModel]["".concat(extraVerseMappingsKey, "-").concat(!!skipsUnlikelyOriginals)];
};

var _default = getVerseMappingsByVersionInfo;
exports["default"] = _default;