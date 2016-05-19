'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['(d*.?d+)', ''], ['(\\d*\\.?\\d+)', '']);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var generateUnitRegex = function generateUnitRegex(unit) {
  return new RegExp(String.raw(_templateObject, unit), 'i');
};
var convert = function convert(multiplier, unit) {
  return function (match) {
    return '' + parseFloat(match) * multiplier + unit;
  };
};
var converterFor = function converterFor(originalUnit, multiplier, unit) {
  return [generateUnitRegex(originalUnit), { fast: originalUnit }, convert(multiplier, unit)];
};

var stops = '\ntransparent 0%,\nhsla(315, 100%, 50%, 0) 45%,\nhsla(315, 100%, 50%, 0.5) 46%,\nhsla(236, 100%, 50%, 0.5) 48%,\nhsla(158, 100%, 50%, 0.5) 50%,\nhsla(79, 100%, 50%, 0.5) 52%,\nhsla(0, 100%, 50%, 0.5) 54%,\nhsla(0, 100%, 50%, 0) 55%,\nhsla(0, 100%, 50%, 0) 85%,\nhsla(0, 100%, 50%, 0.25) 87.5%,\nhsla(79, 100%, 50%, 0.25) 90%,\nhsla(158, 100%, 50%, 0.25) 92.5%,\nhsla(236, 100%, 50%, 0.25) 95%,\nhsla(315, 100%, 50%, 0.25) 97.5%,\nhsla(315, 100%, 50%, 0) 99%'.split('\n').slice(1).join(' ');

exports.default = _postcss2.default.plugin('css-egg', function () {
  return function (css) {
    var _css$replaceValues$re, _css$replaceValues$re2, _css$replaceValues$re3, _css$replaceValues$re4, _css$replaceValues;

    (_css$replaceValues$re = (_css$replaceValues$re2 = (_css$replaceValues$re3 = (_css$replaceValues$re4 = (_css$replaceValues = css.replaceValues.apply(css, _toConsumableArray(converterFor('apc', 3.086, 'cm')))).replaceValues.apply(_css$replaceValues, _toConsumableArray(converterFor('pls', 1.133, 'px')))).replaceValues.apply(_css$replaceValues$re4, _toConsumableArray(converterFor('ls', 1.133e12, 'px')))).replaceValues.apply(_css$replaceValues$re3, _toConsumableArray(converterFor('pc', 3.086e18, 'cm')))).replaceValues.apply(_css$replaceValues$re2, _toConsumableArray(converterFor('ftn', 1209600, 's')))).replaceValues.apply(_css$replaceValues$re, _toConsumableArray(converterFor('mftn', 1209600e-3, 's'))).replaceValues(generateUnitRegex('tmbl'), 'fast').replaceValues(/double-rainbow\(([^,]+),\s*([^,]+)\)/i, 'radial-gradient(circle $2 at $1, ' + stops + ')').replaceValues(/double-rainbow\(([^,]+)\)/i, 'radial-gradient(circle at $1, ' + stops + ')');
  };
});
