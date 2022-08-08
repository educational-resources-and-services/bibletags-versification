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
    var getOverrideMappings = function getOverrideMappings(_ref2) {
      var baseMappings = _ref2.baseMappings,
          overrideMappings = _ref2.overrideMappings;
      // find baseMapping keys by bareLocs
      var baseMappingsKeysByBareOriginalLoc = {};
      var baseMappingsKeysByBareTranslationLoc = {};
      Object.keys(baseMappings).forEach(function (locWithWordRange) {
        var _locWithWordRange$spl = locWithWordRange.split(':'),
            _locWithWordRange$spl2 = _slicedToArray(_locWithWordRange$spl, 1),
            bareOriginalLoc = _locWithWordRange$spl2[0];

        baseMappingsKeysByBareOriginalLoc[bareOriginalLoc] = baseMappingsKeysByBareOriginalLoc[bareOriginalLoc] || [];
        baseMappingsKeysByBareOriginalLoc[bareOriginalLoc].push(locWithWordRange);

        if (baseMappings[locWithWordRange]) {
          var _baseMappings$locWith = baseMappings[locWithWordRange].split(':'),
              _baseMappings$locWith2 = _slicedToArray(_baseMappings$locWith, 1),
              bareTranslationLoc = _baseMappings$locWith2[0];

          baseMappingsKeysByBareTranslationLoc[bareTranslationLoc] = baseMappingsKeysByBareTranslationLoc[bareTranslationLoc] || [];
          baseMappingsKeysByBareTranslationLoc[bareTranslationLoc].push(locWithWordRange);
        }
      }); // delete from baseMappings where base loc used in overrideMappings (both original and translation sides)

      var baseMappingsCleaned = _objectSpread({}, baseMappings);

      for (var locWithWordRange in overrideMappings) {
        var _locWithWordRange$spl3 = locWithWordRange.split(':'),
            _locWithWordRange$spl4 = _slicedToArray(_locWithWordRange$spl3, 1),
            bareOriginalLoc = _locWithWordRange$spl4[0];

        (baseMappingsKeysByBareOriginalLoc[bareOriginalLoc] || []).forEach(function (baseMappingsKey) {
          delete baseMappingsCleaned[baseMappingsKey];
        });
        delete baseMappingsKeysByBareOriginalLoc[bareOriginalLoc];

        if (overrideMappings[locWithWordRange]) {
          var _overrideMappings$loc = overrideMappings[locWithWordRange].split(':'),
              _overrideMappings$loc2 = _slicedToArray(_overrideMappings$loc, 1),
              bareTranslationLoc = _overrideMappings$loc2[0];

          (baseMappingsKeysByBareTranslationLoc[bareTranslationLoc] || []).forEach(function (baseMappingsKey) {
            delete baseMappingsCleaned[baseMappingsKey];
          });
          delete baseMappingsKeysByBareTranslationLoc[bareTranslationLoc];
        }
      } // return merged overrideMappings onto baseMappings


      return _objectSpread(_objectSpread({}, baseMappingsCleaned), overrideMappings);
    };

    var parseOutRanges = function parseOutRanges(mappings) {
      mappings = _objectSpread({}, mappings);

      for (var key in mappings) {
        var keyParts = key.match(/^([0-9]{8})-([0-9]{3})$/);

        if (keyParts) {
          var startingLoc = parseInt(keyParts[1], 10);
          var endingLoc = parseInt(keyParts[1].substr(0, 5) + keyParts[2], 10);

          if (endingLoc >= startingLoc) {
            for (var loc = startingLoc; loc <= endingLoc; loc++) {
              mappings[(0, _locFunctions.padLocWithLeadingZero)(loc)] = (0, _locFunctions.padLocWithLeadingZero)(loc + mappings[key]);
            }
          }

          delete mappings[key];
        }
      }

      return mappings;
    }; // parse out ranges


    var originalToTranslation = parseOutRanges(verseMappings[versificationModel]);
    var overrideMappings1 = skipsUnlikelyOriginals ? unlikelyOriginals : {};
    var overrideMappings2 = extraVerseMappings || {}; // apply overrides

    originalToTranslation = getOverrideMappings({
      baseMappings: originalToTranslation,
      overrideMappings: overrideMappings1
    });
    originalToTranslation = getOverrideMappings({
      baseMappings: originalToTranslation,
      overrideMappings: overrideMappings2
    }); // switch it around, ignoring nulls

    var translationToOriginal = {};

    for (var key in originalToTranslation) {
      if (originalToTranslation[key] === null) continue;
      translationToOriginal[originalToTranslation[key]] = key;
    }

    var normalizeWordRanges = function normalizeWordRanges(mapping) {
      return !mapping ? mapping : mapping.replace(/([0-9]+)-([0-9]+)/g, function (match, a, b) {
        return a === b ? a : match;
      });
    }; // make multi-level so that all keys are simple locs


    var convertMappingsToMultiLevel = function convertMappingsToMultiLevel(mappings) {
      for (var _key in mappings) {
        var keyParts = _key.match(/^([0-9]{8}):([0-9]+(?:-[0-9]*)?(?:,[0-9]+(?:-[0-9]*)?)*)$/);

        if (keyParts) {
          var loc = keyParts[1];
          var wordRangesStr = normalizeWordRanges(keyParts[2]);
          if (!mappings[loc]) mappings[loc] = {};
          mappings[loc][wordRangesStr] = normalizeWordRanges(mappings[_key]);
          delete mappings[_key];
        } else {
          mappings[_key] = normalizeWordRanges(mappings[_key]);
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
    var oldestMappingSetInfo;

    for (var vModel in verseMappingsByVersionInfo) {
      for (var evmKey in verseMappingsByVersionInfo[vModel]) {
        numMappingSets++;
        var createdAt = verseMappingsByVersionInfo[vModel][evmKey]['createdAt'];

        if (!oldestMappingSetInfo || createdAt < oldestMappingSetInfo.createdAt) {
          oldestMappingSetInfo = {
            vModel: vModel,
            evmKey: evmKey,
            createdAt: createdAt
          };
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