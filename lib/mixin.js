/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _ownKeys = require("babel-runtime/core-js/reflect/own-keys");

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = mixinClass;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mixinClass(baseClass, target) {
    var targetObj = typeof target === "function" ? target.prototype : target;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)((0, _ownKeys2.default)(targetObj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            // コンストラクタは(相手にするのが面倒くさすぎるので)無視する
            if (key === "constructor") continue;

            var descriptor = (0, _getOwnPropertyDescriptor2.default)(targetObj, key);

            descriptor.configurable = true;
            descriptor.enumerable = false;
            if (descriptor.hasOwnProperty("writable")) {
                descriptor.writable = true;
            }

            (0, _defineProperty2.default)(baseClass.prototype, key, descriptor);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
//# sourceMappingURL=mixin.js.map
