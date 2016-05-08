/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mixinClass;
function mixinClass(baseClass, target) {
    var targetObj = typeof target === "function" ? target.prototype : target;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Reflect.ownKeys(targetObj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            // コンストラクタは(相手にするのが面倒くさすぎるので)無視する
            if (key === "constructor") continue;

            var descriptor = Object.getOwnPropertyDescriptor(targetObj, key);

            descriptor.configurable = true;
            descriptor.enumerable = false;
            if (descriptor.hasOwnProperty("writable")) {
                descriptor.writable = true;
            }

            Object.defineProperty(baseClass.prototype, key, descriptor);
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
