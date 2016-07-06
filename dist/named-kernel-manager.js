/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
var namedKernelManager =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NamedKernelManager = exports.NamedKernelManagerControllers = exports.NamedKernelManagerRoutings = undefined;
	
	var _keys = __webpack_require__(1);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _getPrototypeOf = __webpack_require__(36);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(40);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(41);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(45);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(82);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _mixin = __webpack_require__(90);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _routableComponent = __webpack_require__(103);
	
	var _namedKernelManagerGhostModule = __webpack_require__(168);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * ルーティング設定クラスのリスト
	 * @type {RoutableComponentRouting[]}
	 */
	var NamedKernelManagerRoutings = exports.NamedKernelManagerRoutings = [];
	
	/**
	 * コントローラクラスの連想配列
	 * @type {Hash<NamedKernelManagerController>}
	 */
	var NamedKernelManagerControllers = exports.NamedKernelManagerControllers = {};
	
	/** Ukagaka baseware named manager */
	
	var NamedKernelManager = exports.NamedKernelManager = function (_RoutableComponent) {
	  (0, _inherits3.default)(NamedKernelManager, _RoutableComponent);
	
	  /**
	   * constructor
	   * @param {Object} components - Event source
	   * @param {NanikaStorage} components.NanikaStorage - storage
	   * @param {NamedManager} components.NamedManager - named manager
	   * @param {TimerEventSource} components.TimerEventSource - Timer event source
	   * @param {RoutableComponentRoutes} [routes] - ルーティング
	   * @param {Hash<NamedKernelManagerController>} [controllers] - コントローラ
	   */
	
	  function NamedKernelManager(components) {
	    var routes = arguments.length <= 1 || arguments[1] === undefined ? new _routableComponent.RoutableComponentRoutes(NamedKernelManagerRoutings) : arguments[1];
	    var controllers = arguments.length <= 2 || arguments[2] === undefined ? NamedKernelManagerControllers : arguments[2];
	    (0, _classCallCheck3.default)(this, NamedKernelManager);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NamedKernelManager).call(this, components));
	
	    _this.components.NamedKernelManager = _this;
	
	    /** @type {NamedKernel[]} */
	    _this._named_kernels = {};
	
	    _this._routes = routes;
	    _this.routes.setup_to(_this, controllers);
	    return _this;
	  }
	
	  /**
	   * Kernel event routes
	   * @type {RoutableComponentRoutes}
	   */
	
	
	  (0, _createClass3.default)(NamedKernelManager, [{
	    key: 'named_ids',
	
	
	    /**
	     * existing named ids
	     * @return {Array<string>} named ids
	     */
	    value: function named_ids() {
	      return (0, _keys2.default)(this._named_kernels);
	    }
	
	    /**
	     * named instance exists or not
	     * @param {string} named_id - named id
	     * @return {boolean} exists or not
	     */
	
	  }, {
	    key: 'is_kernel_exists',
	    value: function is_kernel_exists(named_id) {
	      // in や [] 等ではprototypeのものも認識するため
	      return this._named_kernels.hasOwnProperty(named_id);
	    }
	
	    /**
	     * named kernel instance
	     * @param {string} named_id - named id
	     * @return {NamedKernel} named instance
	     */
	
	  }, {
	    key: 'kernel',
	    value: function kernel(named_id) {
	      return this.is_kernel_exists(named_id) ? this._named_kernels[named_id].kernel : null;
	    }
	
	    /**
	     * find named id of a kernel
	     * @param {NamedKernel} kernel - named kernel
	     * @return {string} named id
	     */
	
	  }, {
	    key: 'named_id',
	    value: function named_id(kernel) {
	      var _this2 = this;
	
	      return (0, _keys2.default)(this._named_kernels).find(function (named_id) {
	        return _this2.kernel(named_id) === kernel;
	      });
	    }
	
	    /**
	     * register named kernel
	     * @param {string} named_id - named id
	     * @param {NamedKernel} kernel - kernel
	     * @return {NamedKernel} kernel
	     */
	
	  }, {
	    key: 'register_kernel',
	    value: function register_kernel(named_id, kernel) {
	      if (this.is_kernel_exists(named_id)) {
	        throw new Error('kernel [' + named_id + '] already exists');
	      }
	      this._named_kernels[named_id] = kernel;
	      this.emit('kernel_registered', named_id);
	      return kernel;
	    }
	
	    /**
	     * unregister named kernel
	     * @param {string} named_id - named id
	     * @return {void}
	     */
	
	  }, {
	    key: 'unregister_kernel',
	    value: function unregister_kernel(named_id) {
	      if (!this.is_kernel_exists(named_id)) {
	        throw new Error('kernel [' + named_id + '] not exists');
	      }
	      delete this._named_kernels[named_id];
	      this.emit('kernel_unregistered', named_id);
	    }
	
	    /**
	     * send communication
	     * @param {string} from_id - from named id
	     * @param {string} to_id - to named id
	     * @param {any} content - communication content
	     * @return {Promise<transactionlike>} transaction
	     */
	
	  }, {
	    key: 'send_communication',
	    value: function send_communication(from_id, to_id, content) {}
	
	    /**
	     * send notice
	     * @param {string} from_id - from named id
	     * @param {string} to_id - to named id
	     * @param {any} content - communication content
	     * @return {Promise<transactionlike>} transaction
	     */
	
	  }, {
	    key: 'send_notice',
	    value: function send_notice(from_id, to_id, content) {
	      // other close etc
	    }
	  }, {
	    key: 'routes',
	    get: function get() {
	      return this._routes;
	    }
	  }]);
	  return NamedKernelManager;
	}(_routableComponent.RoutableComponent);
	
	(0, _mixin2.default)(NamedKernelManager, _namedKernelManagerGhostModule.NamedKernelManagerGhostModule);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(23).Object.keys;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(4)
	  , $keys    = __webpack_require__(6);
	
	__webpack_require__(21)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 4 */
[199, 5],
/* 5 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
[200, 7, 20],
/* 7 */
[201, 8, 9, 12, 16],
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
[202, 10, 5],
/* 10 */
[203, 11],
/* 11 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 12 */
[204, 9, 13, 15],
/* 13 */
[205, 14],
/* 14 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 15 */
[206, 14],
/* 16 */
[207, 17, 19],
/* 17 */
[208, 18],
/* 18 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(22)
	  , core    = __webpack_require__(23)
	  , fails   = __webpack_require__(32);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(18)
	  , core      = __webpack_require__(23)
	  , ctx       = __webpack_require__(24)
	  , hide      = __webpack_require__(26)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 23 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 24 */
[209, 25],
/* 25 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 26 */
[210, 27, 35, 31],
/* 27 */
[211, 28, 30, 34, 31],
/* 28 */
[212, 29],
/* 29 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 30 */
[213, 31, 32, 33],
/* 31 */
[214, 32],
/* 32 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 33 */
[215, 29, 18],
/* 34 */
[216, 29],
/* 35 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	module.exports = __webpack_require__(23).Object.getPrototypeOf;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(4)
	  , $getPrototypeOf = __webpack_require__(39);
	
	__webpack_require__(21)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 39 */
[217, 8, 4, 16],
/* 40 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(42);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	var $Object = __webpack_require__(23).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(22);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(31), 'Object', {defineProperty: __webpack_require__(27).f});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(46);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(47);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(66);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	__webpack_require__(61);
	module.exports = __webpack_require__(65).f('iterator');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(50)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(51)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(14)
	  , defined   = __webpack_require__(5);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 51 */
[218, 52, 22, 53, 26, 8, 54, 55, 59, 39, 60],
/* 52 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26);

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 55 */
[219, 56, 35, 59, 26, 60],
/* 56 */
[220, 28, 57, 20, 16, 33, 58],
/* 57 */
[221, 27, 28, 6, 31],
/* 58 */
[222, 18],
/* 59 */
[223, 27, 8, 60],
/* 60 */
[224, 17, 19, 18],
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	var global        = __webpack_require__(18)
	  , hide          = __webpack_require__(26)
	  , Iterators     = __webpack_require__(54)
	  , TO_STRING_TAG = __webpack_require__(60)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 62 */
[225, 63, 64, 54, 9, 51],
/* 63 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 65 */
[226, 60],
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ },
/* 67 */
[227, 68, 79, 80, 81, 23],
/* 68 */
[228, 18, 8, 31, 22, 53, 69, 32, 17, 59, 19, 60, 65, 70, 71, 72, 75, 28, 9, 34, 35, 56, 76, 78, 27, 6, 77, 74, 73, 52, 26],
/* 69 */
[229, 19, 29, 8, 27, 32],
/* 70 */
[230, 18, 23, 52, 65, 27],
/* 71 */
[231, 6, 9],
/* 72 */
[232, 6, 73, 74],
/* 73 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 74 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 75 */
[233, 11],
/* 76 */
[234, 9, 77],
/* 77 */
[235, 7, 20],
/* 78 */
[236, 74, 35, 9, 34, 8, 30, 31],
/* 79 */
/***/ function(module, exports) {



/***/ },
/* 80 */
[237, 70],
/* 81 */
[238, 70],
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(83);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(87);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(46);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(85);
	module.exports = __webpack_require__(23).Object.setPrototypeOf;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(22);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(86).set});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(29)
	  , anObject = __webpack_require__(28);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(24)(Function.call, __webpack_require__(78).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	var $Object = __webpack_require__(23).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(22)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(56)});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _defineProperty = __webpack_require__(42);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	var _getOwnPropertyDescriptor = __webpack_require__(91);
	
	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
	
	var _ownKeys = __webpack_require__(94);
	
	var _ownKeys2 = _interopRequireDefault(_ownKeys);
	
	var _getIterator2 = __webpack_require__(98);
	
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

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	var $Object = __webpack_require__(23).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(9)
	  , $getOwnPropertyDescriptor = __webpack_require__(78).f;
	
	__webpack_require__(21)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	module.exports = __webpack_require__(23).Reflect.ownKeys;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(22);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(97)});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(77)
	  , gOPS     = __webpack_require__(73)
	  , anObject = __webpack_require__(28)
	  , Reflect  = __webpack_require__(18).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(49);
	module.exports = __webpack_require__(100);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(28)
	  , get      = __webpack_require__(101);
	module.exports = __webpack_require__(23).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(102)
	  , ITERATOR  = __webpack_require__(60)('iterator')
	  , Iterators = __webpack_require__(54);
	module.exports = __webpack_require__(23).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 102 */
[239, 11, 60],
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoutableComponentRoute = exports.RoutableComponentRoutes = exports.RoutableComponentController = exports.RoutableComponentRouting = exports.RoutableComponent = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _events = __webpack_require__(104);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// shim
	__webpack_require__(105);
	__webpack_require__(151);
	
	/**
	 * ルーティング可能なコンポーネント
	 */
	
	var RoutableComponent = exports.RoutableComponent = function (_EventEmitter) {
	  _inherits(RoutableComponent, _EventEmitter);
	
	  /**
	   * constructor
	   * @param {Object<EventEmitter>} components components
	   */
	
	  function RoutableComponent() {
	    var components = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, RoutableComponent);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoutableComponent).call(this));
	
	    _this._components = components;
	    _this._controllers = {};
	    return _this;
	  }
	
	  /**
	   * Components
	   * @type {Hash<EventEmitter>}
	   */
	
	
	  _createClass(RoutableComponent, [{
	    key: 'components',
	    get: function get() {
	      return this._components;
	    }
	
	    /**
	     * Controllers
	     * @type {Hash<RoutableComponentController>}
	     */
	
	  }, {
	    key: 'controllers',
	    get: function get() {
	      return this._controllers;
	    }
	  }]);
	
	  return RoutableComponent;
	}(_events.EventEmitter);
	
	/**
	 * ルーティング設定定義
	 * @interface
	 */
	
	
	var RoutableComponentRouting = exports.RoutableComponentRouting = function () {
	  function RoutableComponentRouting() {
	    _classCallCheck(this, RoutableComponentRouting);
	  }
	
	  _createClass(RoutableComponentRouting, [{
	    key: 'setup',
	
	    /**
	     * ルーティングをセットアップする
	     * @param {RoutableComponentRoutes} routes ルーティング設定
	     * @return {void}
	     */
	    value: function setup(routes) {
	      throw new Error('abstruct');
	    }
	  }]);
	
	  return RoutableComponentRouting;
	}();
	
	/**
	 * コントローラ
	 * @interface
	 */
	
	
	var RoutableComponentController =
	/**
	 * コンストラクタ
	 * @param {RoutableComponent} component コンポーネント
	 */
	exports.RoutableComponentController = function RoutableComponentController(component) {
	  _classCallCheck(this, RoutableComponentController);
	
	  throw new Error('abstruct');
	};
	
	/**
	 * イベントのルーティング設定
	 * @notice スレッドセーフではありません
	 */
	
	
	var RoutableComponentRoutes = function () {
	  /**
	   * コンストラクタ
	   * @param {RoutableComponentRouting|RoutableComponentRouting[]} routing_classes ルート定義クラス(の配列)
	   */
	
	  function RoutableComponentRoutes() {
	    var routing_classes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    _classCallCheck(this, RoutableComponentRoutes);
	
	    this._routes = [];
	    this.include_route(routing_classes);
	  }
	
	  /**
	   * ルートを設定する
	   * @param {Route|Route[]} routing_classes ルート定義クラス(の配列)
	   * @return {void}
	   */
	
	
	  _createClass(RoutableComponentRoutes, [{
	    key: 'include_route',
	    value: function include_route(routing_classes) {
	      var _routing_classes = routing_classes instanceof Array ? routing_classes : [routing_classes];
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = _routing_classes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var route_class = _step.value;
	
	          var route = new route_class();
	          route.setup(this);
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
	
	    /**
	     * コンポーネントのもつイベント発火要素のイベントにルーティングを設定する
	     * @param {RoutableComponent} component コンポーネント
	     * @param {Hash<RoutableComponentController>} controller_classes コントローラクラスの連想配列
	     * @return {void}
	     */
	
	  }, {
	    key: 'setup_to',
	    value: function setup_to(component, controller_classes) {
	      this._check_routes_requirements(component, controller_classes);
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        var _loop = function _loop() {
	          var route = _step2.value;
	
	          component.components[route.from].on(route.event, function () {
	            var _component$controller;
	
	            if (!component.controllers[route.controller]) {
	              // なければコントローラを初期化
	              component.controllers[route.controller] = new controller_classes[route.controller](component);
	            }
	            if (!component.controllers[route.controller][route.action]) {
	              throw new Error('controller [' + route.controller + '] does not have action [' + route.action + ']');
	            }
	            (_component$controller = component.controllers[route.controller])[route.action].apply(_component$controller, arguments);
	          });
	        };
	
	        for (var _iterator2 = this._routes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }, {
	    key: '_check_routes_requirements',
	    value: function _check_routes_requirements(component, controller_classes) {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;
	
	      try {
	        for (var _iterator3 = this._routes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var _route = _step3.value;
	
	          if (!(_route.controller in controller_classes)) {
	            throw new Error('controller [' + _route.controller + '] not found');
	          }
	          if (!(_route.from in component.components)) {
	            throw new Error('component from [' + _route.from + '] not found');
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }, {
	    key: Symbol.iterator,
	    value: function value() {
	      return this._routes[Symbol.iterator]();
	    }
	
	    /**
	     * イベントを定義する
	     * @param {...string} args from, event, controller, action(前提としたものは省く)それぞれの名称文字列
	     * @return {void}
	     * @example
	     * router.event('shell', 'clicked', 'ShellController', 'shell_clicked'); // full
	     * router.event('shell', 'clicked', 'ShellController'); // event = action
	     * router.controller('ShellController', function(router) {
	     *   router.event('shell', 'clicked'); // controllerは前提があるので省く
	     * });
	     * router.from('shell', function(router) {
	     *   router.controller('ShellController', function(router) {
	     *     router.event('clicked'); // from, controllerは前提があるので省く
	     *   });
	     * });
	     */
	
	  }, {
	    key: 'event',
	    value: function event() {
	      if (this._current_from && this._current_controller) {
	        if (arguments.length > 2) throw new Error('arguments too long');
	        this.event_on_from_controller.apply(this, arguments);
	      } else if (this._current_from) {
	        if (arguments.length > 3) throw new Error('arguments too long');
	        this.event_on_from.apply(this, arguments);
	      } else if (this._current_controller) {
	        if (arguments.length > 3) throw new Error('arguments too long');
	        this.event_on_controller.apply(this, arguments);
	      } else {
	        this.event_on_none.apply(this, arguments);
	      }
	    }
	
	    /**
	     * from, controllerを前提としてイベントを定義する
	     * @param {string} event イベント
	     * @param {string} [action] アクション
	     * @return {void}
	     */
	
	  }, {
	    key: 'event_on_from_controller',
	    value: function event_on_from_controller(event) {
	      var action = arguments.length <= 1 || arguments[1] === undefined ? event : arguments[1];
	
	      var from = this._current_from;
	      var controller = this._current_controller;
	      this.add_route(from, event, controller, action);
	    }
	
	    /**
	     * fromを前提としてイベントを定義する
	     * @param {string} event イベント
	     * @param {string} controller コントローラ
	     * @param {string} [action] アクション
	     * @return {void}
	     */
	
	  }, {
	    key: 'event_on_from',
	    value: function event_on_from(event, controller) {
	      var action = arguments.length <= 2 || arguments[2] === undefined ? event : arguments[2];
	
	      var from = this._current_from;
	      this.add_route(from, event, controller, action);
	    }
	
	    /**
	     * controllerを前提としてイベントを定義する
	     * @param {string} from イベント発生源
	     * @param {string} event イベント
	     * @param {string} [action] アクション
	     * @return {void}
	     */
	
	  }, {
	    key: 'event_on_controller',
	    value: function event_on_controller(from, event) {
	      var action = arguments.length <= 2 || arguments[2] === undefined ? event : arguments[2];
	
	      var controller = this._current_controller;
	      this.add_route(from, event, controller, action);
	    }
	
	    /**
	     * 前提なしとしてイベントを定義する
	     * @param {string} from イベント発生源
	     * @param {string} event イベント
	     * @param {string} controller コントローラ
	     * @param {string} [action] アクション
	     * @return {void}
	     */
	
	  }, {
	    key: 'event_on_none',
	    value: function event_on_none(from, event, controller) {
	      var action = arguments.length <= 3 || arguments[3] === undefined ? event : arguments[3];
	
	      this.add_route(from, event, controller, action);
	    }
	
	    /**
	     * イベント発生源を前提とする
	     * @param {string} from イベント発生源プロパティ名
	     * @param {Function} block 前提としたイベント発生源におけるルート定義を行う関数
	     * @return {void}
	     */
	
	  }, {
	    key: 'from',
	    value: function from(_from, block) {
	      this._current_from = _from;
	      block(this);
	      delete this._current_from;
	    }
	
	    /**
	     * コントローラーを前提とする
	     * @param {string} controller コントローラ名
	     * @param {Function} block 前提としたコントローラにおけるルート定義を行う関数
	     * @return {void}
	     */
	
	  }, {
	    key: 'controller',
	    value: function controller(_controller, block) {
	      this._current_controller = _controller;
	      block(this);
	      delete this._current_controller;
	    }
	
	    /**
	     * ルート定義を追加する
	     * @param {string} from イベント発生源
	     * @param {string} event イベント
	     * @param {string} controller コントローラ
	     * @param {string} action アクション
	     * @return {void}
	     */
	
	  }, {
	    key: 'add_route',
	    value: function add_route(from, event, controller, action) {
	      this._routes.push(new RoutableComponentRoute(from, event, controller, action));
	    }
	
	    /**
	     * ルーティングの状態を返す
	     * @return {string} ルーティングの状態を示す文字列
	     */
	
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this._routes.sort(function (a, b) {
	        return (a.from === b.from ? 0 : a.from > b.from ? 10 : -10) + (a.event === b.event ? 0 : a.event > b.event ? 1 : -1);
	      }).map(function (route) {
	        return route.toString() + '\n';
	      }).join('');
	    }
	  }]);
	
	  return RoutableComponentRoutes;
	}();
	
	/**
	 * ルート
	 */
	
	
	exports.RoutableComponentRoutes = RoutableComponentRoutes;
	
	var RoutableComponentRoute = exports.RoutableComponentRoute = function () {
	  /**
	   * コンストラクタ
	   * @param {string} from イベント発生源
	   * @param {string} event イベント
	   * @param {string} controller コントローラ
	   * @param {string} action アクション
	   */
	
	  function RoutableComponentRoute(from, event, controller, action) {
	    _classCallCheck(this, RoutableComponentRoute);
	
	    this._check_constructor_arguments(from, event, controller, action);
	    this._from = from;
	    this._event = event;
	    this._controller = controller;
	    this._action = action;
	  }
	
	  _createClass(RoutableComponentRoute, [{
	    key: '_check_constructor_arguments',
	    value: function _check_constructor_arguments(from, event, controller, action) {
	      var isString = function isString(obj) {
	        return typeof obj === 'string' || obj instanceof String;
	      };
	      if (from == null) throw new Error('register routing error: from is empty!');
	      if (event == null) throw new Error('register routing error: event is empty!');
	      if (controller == null) throw new Error('register routing error: controller is empty!');
	      if (action == null) throw new Error('register routing error: action is empty!');
	      if (!isString(from) || !isString(event) || !isString(controller) || !isString(action)) {
	        throw new Error('register routing error: arguments must be string!');
	      }
	    }
	
	    /**
	     * イベント発生源
	     * @type {string}
	     */
	
	  }, {
	    key: 'toString',
	
	
	    /**
	     * ルーティングの状態を返す
	     * @return {string} ルーティングの状態を示す文字列
	     */
	    value: function toString() {
	      return this.from + '.' + this.event + ' => ' + this.controller + '#' + this.action;
	    }
	  }, {
	    key: 'from',
	    get: function get() {
	      return this._from;
	    }
	    /**
	     * イベント
	     * @type {string}
	     */
	
	  }, {
	    key: 'event',
	    get: function get() {
	      return this._event;
	    }
	    /**
	     * コントローラ
	     * @type {string}
	     */
	
	  }, {
	    key: 'controller',
	    get: function get() {
	      return this._controller;
	    }
	    /**
	     * アクション
	     * @type {string}
	     */
	
	  }, {
	    key: 'action',
	    get: function get() {
	      return this._action;
	    }
	  }]);
	
	  return RoutableComponentRoute;
	}();
	//# sourceMappingURL=routable-component.js.map


/***/ },
/* 104 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	module.exports = __webpack_require__(131).Array.values;

/***/ },
/* 106 */
[225, 107, 122, 123, 124, 128],
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(108)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(112)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 108 */
[224, 109, 111, 110],
/* 109 */
[208, 110],
/* 110 */
18,
/* 111 */
19,
/* 112 */
[210, 113, 121, 117],
/* 113 */
[211, 114, 116, 120, 117],
/* 114 */
[212, 115],
/* 115 */
29,
/* 116 */
[213, 117, 118, 119],
/* 117 */
[214, 118],
/* 118 */
32,
/* 119 */
[215, 115, 110],
/* 120 */
[216, 115],
/* 121 */
35,
/* 122 */
64,
/* 123 */
54,
/* 124 */
[202, 125, 127],
/* 125 */
[203, 126],
/* 126 */
11,
/* 127 */
5,
/* 128 */
[218, 129, 130, 132, 112, 133, 123, 136, 148, 149, 108],
/* 129 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(110)
	  , core      = __webpack_require__(131)
	  , hide      = __webpack_require__(112)
	  , redefine  = __webpack_require__(132)
	  , ctx       = __webpack_require__(134)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 131 */
23,
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(110)
	  , hide      = __webpack_require__(112)
	  , has       = __webpack_require__(133)
	  , SRC       = __webpack_require__(111)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(131).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 133 */
8,
/* 134 */
[209, 135],
/* 135 */
25,
/* 136 */
[219, 137, 121, 148, 112, 108],
/* 137 */
[220, 114, 138, 146, 145, 119, 147],
/* 138 */
[221, 113, 114, 139, 117],
/* 139 */
[200, 140, 146],
/* 140 */
[201, 133, 124, 141, 145],
/* 141 */
[204, 124, 142, 144],
/* 142 */
[205, 143],
/* 143 */
14,
/* 144 */
[206, 143],
/* 145 */
[207, 109, 111],
/* 146 */
20,
/* 147 */
[222, 110],
/* 148 */
[223, 113, 133, 108],
/* 149 */
[217, 133, 150, 145],
/* 150 */
[199, 127],
/* 151 */
[227, 152, 164, 166, 167, 131],
/* 152 */
[228, 110, 133, 117, 130, 132, 153, 118, 109, 148, 111, 108, 154, 155, 156, 157, 160, 114, 124, 120, 121, 137, 161, 163, 113, 139, 162, 159, 158, 129, 112],
/* 153 */
[229, 111, 115, 133, 113, 118],
/* 154 */
[226, 108],
/* 155 */
[230, 110, 131, 129, 154, 113],
/* 156 */
[231, 139, 124],
/* 157 */
[232, 139, 158, 159],
/* 158 */
73,
/* 159 */
74,
/* 160 */
[233, 126],
/* 161 */
[234, 124, 162],
/* 162 */
[235, 140, 146],
/* 163 */
[236, 159, 121, 124, 120, 133, 116, 117],
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(165)
	  , test    = {};
	test[__webpack_require__(108)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(132)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 165 */
[239, 126, 108],
/* 166 */
[237, 155],
/* 167 */
[238, 155],
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NamedKernelManagerGhostModule = undefined;
	
	var _slicedToArray2 = __webpack_require__(169);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(173);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _regenerator = __webpack_require__(187);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _asyncToGenerator2 = __webpack_require__(191);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(40);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(41);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _shiorif = __webpack_require__(192);
	
	var _sakurascript = __webpack_require__(198);
	
	var _namedKernelManager = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./named-kernel-manager\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NamedKernelManagerGhostModule = exports.NamedKernelManagerGhostModule = function () {
	  function NamedKernelManagerGhostModule() {
	    (0, _classCallCheck3.default)(this, NamedKernelManagerGhostModule);
	  }
	
	  (0, _createClass3.default)(NamedKernelManagerGhostModule, [{
	    key: 'load_ghost',
	
	
	    /**
	     * load ghost
	     * @param {string} named_id - named id
	     * @param {GhostProfile} [profile] - profile
	     * @param {RoutableComponentRoutes} [routes] - ルーティング
	     * @param {Hash<GhostKernelController>} [controllers] - コントローラ
	     * @return {Promise<GhostKernel>} ghost kernel instance
	     */
	    value: function () {
	      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(named_id, profile, routes, controllers) {
	        var kernel;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!this.is_kernel_exists(named_id)) {
	                  _context.next = 2;
	                  break;
	                }
	
	                throw new Error('ghost [' + named_id + '] already exists');
	
	              case 2:
	                _context.next = 4;
	                return this._get_ghost_kernel_as_profile(named_id, profile, routes, controllers);
	
	              case 4:
	                kernel = _context.sent;
	
	                this.register_kernel(named_id, kernel);
	                return _context.abrupt('return', kernel);
	
	              case 7:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));
	
	      function load_ghost(_x, _x2, _x3, _x4) {
	        return _ref.apply(this, arguments);
	      }
	
	      return load_ghost;
	    }()
	    // then kernel.start()
	
	    /**
	     * load ghost
	     * @param {string} named_id - named id
	     * @param {GhostProfile} [profile] - profile
	     */
	
	  }, {
	    key: '_get_ghost_profile',
	    value: function () {
	      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(named_id, profile) {
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _context2.t0 = profile;
	
	                if (_context2.t0) {
	                  _context2.next = 5;
	                  break;
	                }
	
	                _context2.next = 4;
	                return this.storage.ghost_profile(named_id);
	
	              case 4:
	                _context2.t0 = _context2.sent;
	
	              case 5:
	                return _context2.abrupt('return', _context2.t0);
	
	              case 6:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));
	
	      function _get_ghost_profile(_x5, _x6) {
	        return _ref2.apply(this, arguments);
	      }
	
	      return _get_ghost_profile;
	    }()
	
	    /**
	     * load ghost
	     * @param {string} named_id - named id
	     * @param {GhostProfile} [default_profile] - profile
	     * @param {RoutableComponentRoutes} [routes] - ルーティング
	     * @param {Hash<GhostKernelController>} [controllers] - コントローラ
	     */
	
	  }, {
	    key: '_get_ghost_kernel_as_profile',
	    value: function () {
	      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(named_id, default_profile, routes, controllers) {
	        var profile;
	        return _regenerator2.default.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                _context3.next = 2;
	                return this._get_ghost_profile(named_id, default_profile);
	
	              case 2:
	                profile = _context3.sent;
	                _context3.next = 5;
	                return this._get_ghost_kernel(named_id, profile.shell_name, profile.balloon_name, routes, controllers);
	
	              case 5:
	                return _context3.abrupt('return', _context3.sent);
	
	              case 6:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));
	
	      function _get_ghost_kernel_as_profile(_x7, _x8, _x9, _x10) {
	        return _ref3.apply(this, arguments);
	      }
	
	      return _get_ghost_kernel_as_profile;
	    }()
	
	    /**
	     * build ghost kernel
	     * @param {string} named_id - named id
	     * @param {string} shellname - shellname
	     * @param {string} balloonname - balloonname
	     * @param {RoutableComponentRoutes} [routes] - ルーティング
	     * @param {Hash<GhostKernelController>} [controllers] - コントローラ
	     * @return {Promise<GhostKernel>} ghost kernel instance
	     */
	
	  }, {
	    key: '_get_ghost_kernel',
	    value: function () {
	      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(named_id, shellname, balloonname, routes, controllers) {
	        var _this = this;
	
	        return _regenerator2.default.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                return _context4.abrupt('return', _promise2.default.all([this._get_ghost(named_id, storage), this._get_shell(named_id, shellname, storage), this._get_balloon(balloonname, storage)]).then(function (_ref5) {
	                  var _ref6 = (0, _slicedToArray3.default)(_ref5, 3);
	
	                  var shiori = _ref6[0];
	                  var shell = _ref6[1];
	                  var balloon = _ref6[2];
	
	                  var shiorif = new _shiorif.Shiorif(shiori);
	                  var named = namedmanager.materialize2(shell, balloon);
	                  var ssp = new _sakurascript.SakuraScriptExecuter(named);
	                  return new GhostKernel({
	                    shiorif: shiorif,
	                    view: named,
	                    ssp: ssp,
	                    manager: _this,
	                    time: _this.time
	                  }, routes, controllers);
	                }));
	
	              case 1:
	              case 'end':
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));
	
	      function _get_ghost_kernel(_x11, _x12, _x13, _x14, _x15) {
	        return _ref4.apply(this, arguments);
	      }
	
	      return _get_ghost_kernel;
	    }()
	
	    /**
	     * ensure path separator at dirpath' end
	     * @param {string} dirpath - dirpath
	     * @return {string} dirpath that ends with path separator
	     */
	
	  }, {
	    key: '_get_ghost',
	
	
	    /**
	     * get ghost(shiori) instance
	     * @param {string} named_id - named id
	     * @return {Promise<Shiori>} ghost(shiori) instance
	     */
	    value: function () {
	      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(named_id) {
	        var dirpath, ghost;
	        return _regenerator2.default.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                this.emit('ghost_load', named_id);
	                dirpath = _namedKernelManager.NamedKernelManager._get_ghost_directory_path(named_id);
	                _context5.next = 4;
	                return _namedKernelManager.NamedKernelManager._load_ghost(storage.backend.fs, dirpath);
	
	              case 4:
	                ghost = _context5.sent;
	
	                this.emit('ghost_loaded', named_id);
	                return _context5.abrupt('return', ghost);
	
	              case 7:
	              case 'end':
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this);
	      }));
	
	      function _get_ghost(_x16) {
	        return _ref7.apply(this, arguments);
	      }
	
	      return _get_ghost;
	    }()
	
	    /**
	     * get ghost directory path
	     * @param {string} named_id - named id
	     * @return {string} ghost directory path
	     */
	
	  }, {
	    key: '_get_shell',
	
	
	    /**
	     * get shell instance
	     * @param {string} named_id - named id
	     * @param {string} shellname - shellname
	     * @return {Promise<Shell>} shell instance
	     */
	    value: function () {
	      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(named_id, shellname) {
	        var directory, shell;
	        return _regenerator2.default.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                this.emit('load_shell_files', named_id, shellname);
	                _context6.next = 3;
	                return this._get_shell_directory(named_id, shellname);
	
	              case 3:
	                directory = _context6.sent;
	
	                this.emit('shell_load', named_id, shellname, directory);
	                _context6.next = 7;
	                return _namedKernelManager.NamedKernelManager._load_shell(directory);
	
	              case 7:
	                shell = _context6.sent;
	
	                this.emit('shell_loaded', named_id, shellname, shell);
	                return _context6.abrupt('return', shell);
	
	              case 10:
	              case 'end':
	                return _context6.stop();
	            }
	          }
	        }, _callee6, this);
	      }));
	
	      function _get_shell(_x17, _x18) {
	        return _ref8.apply(this, arguments);
	      }
	
	      return _get_shell;
	    }()
	
	    /**
	     * get shell directory contents
	     * @param {string} named_id - named id
	     * @param {string} shellname - shellname
	     * @return {Promise<NanikaDirectory>} shell directory contents
	     */
	
	  }, {
	    key: '_get_shell_directory',
	    value: function () {
	      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(named_id, shellname) {
	        return _regenerator2.default.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                _context7.next = 2;
	                return this.storage.shell(named_id, shellname);
	
	              case 2:
	                return _context7.abrupt('return', _context7.sent);
	
	              case 3:
	              case 'end':
	                return _context7.stop();
	            }
	          }
	        }, _callee7, this);
	      }));
	
	      function _get_shell_directory(_x19, _x20) {
	        return _ref9.apply(this, arguments);
	      }
	
	      return _get_shell_directory;
	    }()
	
	    /**
	     * load shell
	     * @param {NanikaDirectory} shell directory contents
	     * @return {Promise<Shell>} shell instance
	     */
	
	  }, {
	    key: '_get_balloon',
	
	
	    /**
	     * get balloon instance
	     * @param {string} balloonname - balloonname
	     * @return {Promise<Balloon>} balloon instance
	     */
	    value: function () {
	      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(balloonname) {
	        var directory, balloon;
	        return _regenerator2.default.wrap(function _callee8$(_context8) {
	          while (1) {
	            switch (_context8.prev = _context8.next) {
	              case 0:
	                this.emit('load_balloon_files', balloonname);
	                _context8.next = 3;
	                return this._get_balloon_directory(balloonname);
	
	              case 3:
	                directory = _context8.sent;
	
	                this.emit('balloon_load', balloonname, directory);
	                _context8.next = 7;
	                return _namedKernelManager.NamedKernelManager._load_balloon(directory);
	
	              case 7:
	                balloon = _context8.sent;
	
	                this.emit('balloon_loaded', balloonname, shell);
	                return _context8.abrupt('return', balloon);
	
	              case 10:
	              case 'end':
	                return _context8.stop();
	            }
	          }
	        }, _callee8, this);
	      }));
	
	      function _get_balloon(_x21) {
	        return _ref10.apply(this, arguments);
	      }
	
	      return _get_balloon;
	    }()
	
	    /**
	     * get balloon directory contents
	     * @param {string} balloonname - balloonname
	     * @return {Promise<NanikaDirectory>} balloon directory contents
	     */
	
	  }, {
	    key: '_get_balloon_directory',
	    value: function () {
	      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(balloonname) {
	        return _regenerator2.default.wrap(function _callee9$(_context9) {
	          while (1) {
	            switch (_context9.prev = _context9.next) {
	              case 0:
	                _context9.next = 2;
	                return this.storage.balloon(balloonname);
	
	              case 2:
	                return _context9.abrupt('return', _context9.sent);
	
	              case 3:
	              case 'end':
	                return _context9.stop();
	            }
	          }
	        }, _callee9, this);
	      }));
	
	      function _get_balloon_directory(_x22) {
	        return _ref11.apply(this, arguments);
	      }
	
	      return _get_balloon_directory;
	    }()
	
	    /**
	     * load balloon
	     * @param {NanikaDirectory} balloon directory contents
	     * @return {Promise<Balloon>} balloon instance
	     */
	
	  }, {
	    key: 'GhostViewClass',
	
	
	    /**
	     * ゴーストのビュークラス
	     * @type {cuttlebone}
	     */
	    get: function get() {
	      return this._GhostViewClass || _namedKernelManager.NamedKernelManager._GhostViewClass;
	    }
	
	    /**
	     * ゴーストのビュークラス
	     * @type {cuttlebone}
	     */
	    ,
	    set: function set(value) {
	      this._GhostViewClass = value;
	    }
	  }], [{
	    key: '_canondirpath',
	    value: function _canondirpath(dirpath) {
	      var path_separator = dirpath.match(/[\\\/]/)[0];
	      return dirpath.replace(new RegExp('\\' + path_separator + '?$'), path_separator);
	    }
	  }, {
	    key: '_get_ghost_directory_path',
	    value: function _get_ghost_directory_path(named_id) {
	      return _namedKernelManager.NamedKernelManager._canondirpath(this.storage.ghost_master_path(named_id));
	    }
	
	    /**
	     * load ghost(shiori)
	     * @param {NanikaDirectory} ghost directory contents
	     * @return {Promise<Shiori>} ghost(shiori) instance
	     */
	
	  }, {
	    key: '_load_ghost',
	    value: function () {
	      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(fs, dirpath) {
	        var shiori;
	        return _regenerator2.default.wrap(function _callee10$(_context10) {
	          while (1) {
	            switch (_context10.prev = _context10.next) {
	              case 0:
	                _context10.next = 2;
	                return ShioriLoader.detect_shiori(fs, dirpath);
	
	              case 2:
	                shiori = _context10.sent;
	                _context10.next = 5;
	                return shiori.load(dirpath);
	
	              case 5:
	                return _context10.abrupt('return', _context10.sent);
	
	              case 6:
	              case 'end':
	                return _context10.stop();
	            }
	          }
	        }, _callee10, this);
	      }));
	
	      function _load_ghost(_x23, _x24) {
	        return _ref12.apply(this, arguments);
	      }
	
	      return _load_ghost;
	    }()
	  }, {
	    key: '_load_shell',
	    value: function _load_shell(directory) {
	      var shell = new this.GhostViewClass.Shell(directory.asArrayBuffer());
	      return shell.load();
	    }
	  }, {
	    key: '_load_balloon',
	    value: function _load_balloon(directory) {
	      var balloon = new this.GhostViewClass.Balloon(directory.asArrayBuffer());
	      return balloon.load();
	    }
	  }, {
	    key: 'GhostViewClass',
	
	    /**
	     * デフォルトのゴーストのビュークラス
	     * @type {cuttlebone}
	     */
	    get: function get() {
	      return _namedKernelManager.NamedKernelManager._GhostViewClass;
	    }
	
	    /**
	     * デフォルトのゴーストのビュークラス
	     * @type {cuttlebone}
	     */
	    ,
	    set: function set(value) {
	      _namedKernelManager.NamedKernelManager._GhostViewClass = value;
	    }
	  }]);
	  return NamedKernelManagerGhostModule;
	}();

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(170);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(98);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(171), __esModule: true };

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(49);
	module.exports = __webpack_require__(172);

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(102)
	  , ITERATOR  = __webpack_require__(60)('iterator')
	  , Iterators = __webpack_require__(54);
	module.exports = __webpack_require__(23).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(174), __esModule: true };

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(79);
	__webpack_require__(49);
	__webpack_require__(61);
	__webpack_require__(175);
	module.exports = __webpack_require__(23).Promise;

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(52)
	  , global             = __webpack_require__(18)
	  , ctx                = __webpack_require__(24)
	  , classof            = __webpack_require__(102)
	  , $export            = __webpack_require__(22)
	  , isObject           = __webpack_require__(29)
	  , anObject           = __webpack_require__(28)
	  , aFunction          = __webpack_require__(25)
	  , anInstance         = __webpack_require__(176)
	  , forOf              = __webpack_require__(177)
	  , setProto           = __webpack_require__(86).set
	  , speciesConstructor = __webpack_require__(180)
	  , task               = __webpack_require__(181).set
	  , microtask          = __webpack_require__(183)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(60)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(184)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(59)($Promise, PROMISE);
	__webpack_require__(185)(PROMISE);
	Wrapper = __webpack_require__(23)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(186)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(24)
	  , call        = __webpack_require__(178)
	  , isArrayIter = __webpack_require__(179)
	  , anObject    = __webpack_require__(28)
	  , toLength    = __webpack_require__(13)
	  , getIterFn   = __webpack_require__(101)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(28);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(54)
	  , ITERATOR   = __webpack_require__(60)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(28)
	  , aFunction = __webpack_require__(25)
	  , SPECIES   = __webpack_require__(60)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(24)
	  , invoke             = __webpack_require__(182)
	  , html               = __webpack_require__(58)
	  , cel                = __webpack_require__(33)
	  , global             = __webpack_require__(18)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(11)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 182 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(18)
	  , macrotask = __webpack_require__(181).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(11)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(26);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(18)
	  , core        = __webpack_require__(23)
	  , dP          = __webpack_require__(27)
	  , DESCRIPTORS = __webpack_require__(31)
	  , SPECIES     = __webpack_require__(60)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(60)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__(188);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}
	
	module.exports = { "default": module.exports, __esModule: true };
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module, process) {"use strict";
	
	var _promise = __webpack_require__(173);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _setPrototypeOf = __webpack_require__(83);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(87);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(46);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _iterator = __webpack_require__(47);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(66);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!function (global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol = typeof _symbol2.default === "function" && _iterator2.default || "@@iterator";
	
	  var inModule = ( false ? "undefined" : (0, _typeof3.default)(module)) === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = (0, _create2.default)((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };
	
	  runtime.mark = function (genFun) {
	    if (_setPrototypeOf2.default) {
	      (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = (0, _create2.default)(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function (arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument ? _promise2.default.resolve(value.arg).then(invokeNext, invokeThrow) : _promise2.default.resolve(value).then(function (unwrapped) {
	        // When a yielded Promise is resolved, its final value becomes
	        // the .value of the Promise<{value,done}> result for the
	        // current iteration. If the Promise is rejected, however, the
	        // result for this iteration will be rejected with the same
	        // reason. Note that rejections of yielded Promises are not
	        // thrown back into the generator function, as is the case
	        // when an awaited Promise is rejected. This difference in
	        // behavior between yield and await is important, because it
	        // allows the consumer to decide what to do with the yielded
	        // rejection (swallow it and continue, manually .throw it back
	        // into the generator, abandon iteration, whatever). With
	        // await, by contrast, there is no opportunity to examine the
	        // rejection reason outside the generator function, so the
	        // only option is to throw it from the await expression, and
	        // let the generator function handle the exception.
	        result.value = unwrapped;
	        return result;
	      });
	    }
	
	    if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	      // If enqueue has been called before, then we want to wait until
	      // all previous Promises have been resolved before calling invoke,
	      // so that results are always delivered in the correct order. If
	      // enqueue has not been called before, then it is important to
	      // call invoke immediately, without waiting on a callback to fire,
	      // so that the async generator function has the opportunity to do
	      // any necessary setup in a predictable way. This predictability
	      // is why the Promise constructor synchronously invokes its
	      // executor callback, and why async functions synchronously
	      // execute code before the first await. Since we implement simple
	      // async functions in terms of async generators, it is especially
	      // important to get this right, even though it requires care.
	      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	      // Avoid propagating failures to Promises returned by later
	      // invocations of the iterator.
	      callInvokeWithMethodAndArg) : new _promise2.default(function (resolve) {
	        resolve(callInvokeWithMethodAndArg());
	      });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	
	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          context._sent = arg;
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function () {
	    return this;
	  };
	
	  Gp.toString = function () {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function (object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function reset(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function stop() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	}(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	(typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(189)(module), __webpack_require__(190)))

/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 190 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _promise = __webpack_require__(173);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }
	
	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            return step("next", value);
	          }, function (err) {
	            return step("throw", err);
	          });
	        }
	      }
	
	      return step("next");
	    });
	  };
	};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}if(false)var exports=window;var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();if(Object.defineProperty(exports,"__esModule",{value:!0}),"undefined"!="function")var ShioriJK=__webpack_require__(193),ShioriTransaction=__webpack_require__(195).ShioriTransaction,EventEmitter=__webpack_require__(197);var Shiorif=function(e){function t(e){var r=arguments.length<=1||void 0===arguments[1]?"2.6":arguments[1];_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this));return n._shiori=e,n.auto_convert_request_version=r,n._request_parser=new ShioriJK.Shiori.Request.Parser,n._response_parser=new ShioriJK.Shiori.Response.Parser,n}return _inherits(t,e),_createClass(t,[{key:"load",value:function(e){var r=this;return this.emit("load",e),this.shiori.load(e).then(function(e){if(r.emit("loaded",e),!e)throw new t.StatusError;return e})}},{key:"request",value:function(e){var t=this,r=arguments.length<=1||void 0===arguments[1]?!0:arguments[1],n=new ShioriTransaction;n.request=e instanceof ShioriJK.Message.Request?e:this._request_parser.parse(e),this.emit("request",n);var i=r?n.request.to(this.auto_convert_request_version):n.request;for(var s in this.default_headers)null!=i.headers.header[s]&&(i.headers.header[s]=this.default_headers[s]);return this.shiori.request(i).then(function(e){return n.response=t._response_parser.parse(e),t.emit("response",n),n})}},{key:"request3",value:function(e,t,r){var n=arguments.length<=3||void 0===arguments[3]?!0:arguments[3],i=new ShioriJK.Message.Request({request_line:{version:"3.0",method:e},headers:r});return this.request(i,n)}},{key:"request2",value:function(e,t,r){var n=arguments.length<=3||void 0===arguments[3]?!0:arguments[3],i=new ShioriJK.Message.Request({request_line:{version:"2.6",method:e},headers:r});return this.request(i,n)}},{key:"get3",value:function(e,t){var r=arguments.length<=2||void 0===arguments[2]?!0:arguments[2];return this.request3("GET",e,t,r)}},{key:"notify3",value:function(e,t){var r=arguments.length<=2||void 0===arguments[2]?!0:arguments[2];return this.request3("NOTIFY",e,t,r)}},{key:"unload",value:function(){var e=this;return this.emit("unload"),this.shiori.unload().then(function(r){if(e.emit("unloaded",r),!r)throw new t.StatusError;return r})}},{key:"shiori",get:function(){return this._shiori}},{key:"auto_convert_request_version",get:function(){return this._auto_convert_request_version},set:function(e){this._auto_convert_request_version=e}},{key:"default_headers",get:function(){return this._default_headers},set:function(e){this._default_headers=e}}]),t}(EventEmitter);exports.Shiorif=Shiorif,Shiorif.StatusError=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),t}(Error);
	//# sourceMappingURL=shiorif.js.map


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(194)


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {
	/* (C) 2014 Narazaka : Licensed under The MIT License - http://narazaka.net/license/MIT?2014 */
	var ShioriJK,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	ShioriJK = {};
	
	if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
	  module.exports = ShioriJK;
	}
	
	Function.prototype.property = function(properties) {
	  var descriptions, property, results1;
	  results1 = [];
	  for (property in properties) {
	    descriptions = properties[property];
	    results1.push(Object.defineProperty(this.prototype, property, descriptions));
	  }
	  return results1;
	};
	
	ShioriJK.Message = {};
	
	ShioriJK.Message.Request = (function() {
	  function Request(arg) {
	    var headers, no_prepare, ref, request_line;
	    ref = arg != null ? arg : {}, request_line = ref.request_line, headers = ref.headers, no_prepare = ref.no_prepare;
	    this.request_line = request_line != null ? request_line instanceof ShioriJK.RequestLine ? request_line : new ShioriJK.RequestLine(request_line) : !no_prepare ? new ShioriJK.RequestLine() : void 0;
	    this.headers = headers != null ? headers instanceof ShioriJK.Headers.Request ? headers : new ShioriJK.Headers.Request(headers) : new ShioriJK.Headers.Request();
	  }
	
	  Request.prototype.request_line = null;
	
	  Request.prototype.headers = null;
	
	  Request.prototype.toString = function() {
	    return this.request_line.toString() + '\r\n' + this.headers.toString() + '\r\n';
	  };
	
	  return Request;
	
	})();
	
	ShioriJK.Message.Response = (function() {
	  function Response(arg) {
	    var headers, no_prepare, ref, status_line;
	    ref = arg != null ? arg : {}, status_line = ref.status_line, headers = ref.headers, no_prepare = ref.no_prepare;
	    this.status_line = status_line != null ? status_line instanceof ShioriJK.StatusLine ? status_line : new ShioriJK.StatusLine(status_line) : !no_prepare ? new ShioriJK.StatusLine() : void 0;
	    this.headers = headers != null ? headers instanceof ShioriJK.Headers.Response ? headers : new ShioriJK.Headers.Response(headers) : new ShioriJK.Headers.Response();
	  }
	
	  Response.prototype.status_line = null;
	
	  Response.prototype.headers = null;
	
	  Response.prototype.toString = function() {
	    return this.status_line.toString() + '\r\n' + this.headers.toString() + '\r\n';
	  };
	
	  return Response;
	
	})();
	
	ShioriJK.RequestLine = (function() {
	  function RequestLine(arg) {
	    var method, protocol, ref, version;
	    ref = arg != null ? arg : {}, method = ref.method, protocol = ref.protocol, version = ref.version;
	    this["arguments"] = {};
	    if (method != null) {
	      this.method = method;
	    }
	    this.protocol = protocol || 'SHIORI';
	    if (version != null) {
	      this.version = version;
	    }
	  }
	
	  RequestLine.prototype.method = null;
	
	  RequestLine.prototype.protocol = null;
	
	  RequestLine.prototype.version = null;
	
	  RequestLine.property({
	    method: {
	      get: function() {
	        return this["arguments"].method;
	      },
	      set: function(method) {
	        if ((method != null) && (this.version != null)) {
	          this.validate_method_version(method, this.version);
	        } else if (method != null) {
	          switch (method) {
	            case 'GET':
	            case 'NOTIFY':
	            case 'GET Version':
	            case 'GET Sentence':
	            case 'GET Word':
	            case 'GET Status':
	            case 'TEACH':
	            case 'GET String':
	            case 'NOTIFY OwnerGhostName':
	            case 'NOTIFY OtherGhostName':
	            case 'TRANSLATE Sentence':
	              break;
	            default:
	              throw 'Invalid protocol method : ' + method;
	          }
	        }
	        return this["arguments"].method = method;
	      }
	    },
	    protocol: {
	      get: function() {
	        return this["arguments"].protocol;
	      },
	      set: function(protocol) {
	        if ((protocol != null) && protocol !== 'SHIORI') {
	          throw 'Invalid protocol : ' + protocol;
	        }
	        return this["arguments"].protocol = protocol;
	      }
	    },
	    version: {
	      get: function() {
	        return this["arguments"].version;
	      },
	      set: function(version) {
	        if ((this.method != null) && (version != null)) {
	          this.validate_method_version(this.method, version);
	        } else if (version != null) {
	          switch (version) {
	            case '2.0':
	            case '2.2':
	            case '2.3':
	            case '2.4':
	            case '2.5':
	            case '2.6':
	            case '3.0':
	              break;
	            default:
	              throw 'Invalid protocol version : ' + version;
	          }
	        }
	        return this["arguments"].version = version;
	      }
	    }
	  });
	
	  RequestLine.prototype.validate_method_version = function(method, version) {
	    var is_valid;
	    is_valid = false;
	    switch (version) {
	      case '2.0':
	        switch (method) {
	          case 'GET Version':
	          case 'NOTIFY OwnerGhostName':
	          case 'GET Sentence':
	          case 'GET Word':
	          case 'GET Status':
	            is_valid = true;
	        }
	        break;
	      case '2.2':
	        switch (method) {
	          case 'GET Sentence':
	            is_valid = true;
	        }
	        break;
	      case '2.3':
	        switch (method) {
	          case 'NOTIFY OtherGhostName':
	          case 'GET Sentence':
	            is_valid = true;
	        }
	        break;
	      case '2.4':
	        switch (method) {
	          case 'TEACH':
	            is_valid = true;
	        }
	        break;
	      case '2.5':
	        switch (method) {
	          case 'GET String':
	            is_valid = true;
	        }
	        break;
	      case '2.6':
	        switch (method) {
	          case 'GET Sentence':
	          case 'GET Status':
	          case 'GET String':
	          case 'NOTIFY OwnerGhostName':
	          case 'NOTIFY OtherGhostName':
	          case 'GET Version':
	          case 'TRANSLATE Sentence':
	            is_valid = true;
	        }
	        break;
	      case '3.0':
	        switch (method) {
	          case 'GET':
	          case 'NOTIFY':
	            is_valid = true;
	        }
	    }
	    if (!is_valid) {
	      throw 'Invalid protocol method and version : ' + method + ' SHIORI/' + version;
	    }
	  };
	
	  RequestLine.prototype.toString = function() {
	    return this.method + " " + this.protocol + "/" + this.version;
	  };
	
	  return RequestLine;
	
	})();
	
	ShioriJK.StatusLine = (function() {
	  function StatusLine(arg) {
	    var code, protocol, ref, version;
	    ref = arg != null ? arg : {}, code = ref.code, protocol = ref.protocol, version = ref.version;
	    this["arguments"] = {};
	    if (code != null) {
	      this.code = code;
	    }
	    this.protocol = protocol || 'SHIORI';
	    if (version != null) {
	      this.version = version;
	    }
	  }
	
	  StatusLine.prototype.code = null;
	
	  StatusLine.prototype.protocol = null;
	
	  StatusLine.prototype.version = null;
	
	  StatusLine.property({
	    code: {
	      get: function() {
	        return this["arguments"].code;
	      },
	      set: function(code) {
	        if ((code != null) && (this.message[code] == null)) {
	          throw 'Invalid response code : ' + code;
	        }
	        return this["arguments"].code = code;
	      }
	    },
	    protocol: {
	      get: function() {
	        return this["arguments"].protocol;
	      },
	      set: function(protocol) {
	        if ((protocol != null) && protocol !== 'SHIORI') {
	          throw 'Invalid protocol : ' + protocol;
	        }
	        return this["arguments"].protocol = protocol;
	      }
	    },
	    version: {
	      get: function() {
	        return this["arguments"].version;
	      },
	      set: function(version) {
	        if (version != null) {
	          switch (version) {
	            case '2.0':
	            case '2.2':
	            case '2.3':
	            case '2.4':
	            case '2.5':
	            case '2.6':
	            case '3.0':
	              break;
	            default:
	              throw 'Invalid protocol version : ' + version;
	          }
	        }
	        return this["arguments"].version = version;
	      }
	    }
	  });
	
	  StatusLine.prototype.toString = function() {
	    return this.protocol + "/" + this.version + " " + this.code + " " + this.message[this.code];
	  };
	
	  StatusLine.prototype.message = {
	    200: 'OK',
	    204: 'No Content',
	    310: 'Communicate',
	    311: 'Not Enough',
	    312: 'Advice',
	    400: 'Bad Request',
	    418: "I'm a tea pot",
	    500: 'Internal Server Error'
	  };
	
	  return StatusLine;
	
	})();
	
	ShioriJK.Headers = (function() {
	  function Headers(header) {
	    this.header = header != null ? header : {};
	  }
	
	  Headers.prototype.header = null;
	
	  Headers.prototype.get = function(name) {
	    if (this.header[name] != null) {
	      return this.header[name];
	    }
	  };
	
	  Headers.prototype.set = function(name, value) {
	    return this.header[name] = value;
	  };
	
	  Headers.prototype.get_separated = function(name, separator) {
	    if (separator == null) {
	      separator = '\x01';
	    }
	    if (this.header[name] != null) {
	      return this.header[name].split(separator);
	    }
	  };
	
	  Headers.prototype.set_separated = function(name, value, separator) {
	    if (separator == null) {
	      separator = '\x01';
	    }
	    return this.header[name] = value.join(separator);
	  };
	
	  Headers.prototype.get_separated2 = function(name, separator1, separator2) {
	    var element, i, len, ref, results1;
	    if (separator1 == null) {
	      separator1 = '\x02';
	    }
	    if (separator2 == null) {
	      separator2 = '\x01';
	    }
	    if (this.header[name] != null) {
	      ref = this.header[name].split(separator1);
	      results1 = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        element = ref[i];
	        results1.push(element.split(separator2));
	      }
	      return results1;
	    }
	  };
	
	  Headers.prototype.set_separated2 = function(name, value, separator1, separator2) {
	    var element;
	    if (separator1 == null) {
	      separator1 = '\x02';
	    }
	    if (separator2 == null) {
	      separator2 = '\x01';
	    }
	    return this.header[name] = ((function() {
	      var i, len, results1;
	      results1 = [];
	      for (i = 0, len = value.length; i < len; i++) {
	        element = value[i];
	        results1.push(element.join(separator2));
	      }
	      return results1;
	    })()).join(separator1);
	  };
	
	  Headers.prototype.validate = function() {
	    var name, ref, results1, value;
	    ref = this.header;
	    results1 = [];
	    for (name in ref) {
	      value = ref[name];
	      if (value.match(/\n/)) {
	        throw 'Invalid header value - line feed found : [' + name + '] : ' + value;
	      } else {
	        results1.push(void 0);
	      }
	    }
	    return results1;
	  };
	
	  Headers.prototype.toString = function() {
	    var name, ref, str, value;
	    str = '';
	    this.validate();
	    ref = this.header;
	    for (name in ref) {
	      value = ref[name];
	      str += name + ": " + value + "\r\n";
	    }
	    return str;
	  };
	
	  return Headers;
	
	})();
	
	ShioriJK.Headers.Request = (function(superClass) {
	  extend(Request, superClass);
	
	  function Request() {
	    return Request.__super__.constructor.apply(this, arguments);
	  }
	
	  return Request;
	
	})(ShioriJK.Headers);
	
	ShioriJK.Headers.Response = (function(superClass) {
	  extend(Response, superClass);
	
	  function Response() {
	    return Response.__super__.constructor.apply(this, arguments);
	  }
	
	  return Response;
	
	})(ShioriJK.Headers);
	
	ShioriJK.Shiori = {};
	
	ShioriJK.Shiori.Header = {};
	
	ShioriJK.Shiori.Request = {};
	
	ShioriJK.Shiori.Request.RequestLine = {};
	
	ShioriJK.Shiori.Request.Header = {};
	
	ShioriJK.Shiori.Response = {};
	
	ShioriJK.Shiori.Response.StatusLine = {};
	
	ShioriJK.Shiori.Response.Header = {};
	
	ShioriJK.Shiori.Parser = (function() {
	  function Parser() {}
	
	  Parser.prototype.is_parsing = function() {
	    return !this.section.is('idle');
	  };
	
	  Parser.prototype.is_parsing_end = function() {
	    return !this.section.is('end');
	  };
	
	  Parser.prototype.get_result = function() {
	    return this.result;
	  };
	
	  Parser.prototype.result_builder = function() {};
	
	  Parser.prototype.begin_parse = function() {
	    if (!this.section.is('idle')) {
	      throw 'cannot begin parsing because previous transaction is still working';
	    }
	    this.result = this.result_builder();
	    return this.section.next();
	  };
	
	  Parser.prototype.end_parse = function() {
	    if (!this.section.is('end')) {
	      this.abort_parse();
	      throw 'parsing was aborted';
	    }
	    return this.section.next();
	  };
	
	  Parser.prototype.abort_parse = function() {
	    var name, parser, ref;
	    if (this.parsers != null) {
	      ref = this.parsers;
	      for (name in ref) {
	        parser = ref[name];
	        if (parser.abort_parse != null) {
	          parser.abort_parse();
	        }
	      }
	    }
	    return this.section.set('idle');
	  };
	
	  Parser.prototype.parse = function(transaction) {
	    var result;
	    this.begin_parse();
	    result = this.parse_chunk(transaction);
	    if (this.is_parsing()) {
	      throw 'transaction is not closed';
	    }
	    if (result.results.length !== 1) {
	      throw 'multiple transaction';
	    }
	    return result.results[0];
	  };
	
	  Parser.prototype.parse_chunk = function(chunk) {
	    var lines;
	    lines = chunk.split(/\r\n/);
	    if (chunk.match(/\r\n$/)) {
	      lines.pop();
	    }
	    return this.parse_lines(lines);
	  };
	
	  Parser.prototype.parse_lines = function(lines) {
	    var i, len, line, result, results;
	    results = [];
	    for (i = 0, len = lines.length; i < len; i++) {
	      line = lines[i];
	      result = this.parse_line(line);
	      if (result.state === 'end') {
	        results.push(result.result);
	      }
	    }
	    return {
	      results: results,
	      state: result.state
	    };
	  };
	
	  Parser.prototype.parse_line = function(line) {
	    if (this.section.is('idle')) {
	      this.begin_parse();
	    }
	    this.parse_main(line);
	    if (this.section.is('end')) {
	      this.end_parse();
	      return {
	        result: this.get_result(),
	        state: 'end'
	      };
	    } else {
	      return {
	        state: 'continue'
	      };
	    }
	  };
	
	  Parser.prototype.parse_main = function(line) {};
	
	  return Parser;
	
	})();
	
	ShioriJK.Shiori.Section = (function() {
	  function Section(sections) {
	    this.sections = sections;
	    this.index = 0;
	  }
	
	  Section.prototype.is = function(section) {
	    return this.sections[this.index] === section;
	  };
	
	  Section.prototype.next = function() {
	    if (this.index === this.sections.length - 1) {
	      return this.index = 0;
	    } else {
	      return this.index++;
	    }
	  };
	
	  Section.prototype.previous = function() {
	    if (this.index === 0) {
	      return this.index = this.sections.length - 1;
	    } else {
	      return this.index--;
	    }
	  };
	
	  Section.prototype.set = function(section) {
	    return this.index = this.sections.indexOf(section);
	  };
	
	  Section.prototype.get = function() {
	    return this.sections[this.index];
	  };
	
	  return Section;
	
	})();
	
	ShioriJK.Shiori.Header.Parser = (function(superClass) {
	  extend(Parser, superClass);
	
	  function Parser() {
	    return Parser.__super__.constructor.apply(this, arguments);
	  }
	
	  Parser.prototype.parse_main = function(line) {
	    var result;
	    result = this.parse_header(line);
	    if (result.state === 'end') {
	      return this.section.next();
	    }
	  };
	
	  Parser.prototype.parse_header = function(line) {
	    var result;
	    if (line.length) {
	      if (result = line.match(/^(.+?): (.*)$/)) {
	        this.result.header[result[1]] = result[2];
	      } else {
	        throw 'Invalid header line : ' + line;
	      }
	      return {
	        state: 'continue'
	      };
	    } else {
	      return {
	        state: 'end'
	      };
	    }
	  };
	
	  return Parser;
	
	})(ShioriJK.Shiori.Parser);
	
	ShioriJK.Shiori.Header.Section = (function(superClass) {
	  extend(Section, superClass);
	
	  function Section(sections) {
	    this.sections = sections != null ? sections : ['idle', 'header', 'end'];
	    this.index = 0;
	  }
	
	  return Section;
	
	})(ShioriJK.Shiori.Section);
	
	ShioriJK.Shiori.Request.Parser = (function(superClass) {
	  extend(Parser, superClass);
	
	  function Parser() {
	    this.parsers = {
	      request_line: new ShioriJK.Shiori.Request.RequestLine.Parser(),
	      headers: new ShioriJK.Shiori.Request.Header.Parser()
	    };
	    this.section = new ShioriJK.Shiori.Request.Section();
	  }
	
	  Parser.prototype.result_builder = function() {
	    return new ShioriJK.Message.Request({
	      no_prepare: true
	    });
	  };
	
	  Parser.prototype.parse_main = function(line) {
	    var parser, parser_result;
	    parser = this.parsers[this.section.get()];
	    parser_result = parser.parse_line(line);
	    if (parser_result.state === 'end') {
	      this.result[this.section.get()] = parser_result.result;
	      return this.section.next();
	    }
	  };
	
	  return Parser;
	
	})(ShioriJK.Shiori.Parser);
	
	ShioriJK.Shiori.Request.RequestLine.Parser = (function() {
	  function Parser() {}
	
	  Parser.prototype.result_builder = function() {
	    return new ShioriJK.RequestLine();
	  };
	
	  Parser.prototype.parse = function(transaction) {
	    return this.parse_chunk(transaction);
	  };
	
	  Parser.prototype.parse_chunk = function(chunk) {
	    return this.parse_line(chunk);
	  };
	
	  Parser.prototype.parse_line = function(line) {
	    var result;
	    result = line.match(/^([A-Za-z0-9 ]+) SHIORI\/([0-9.]+)/);
	    if (!result) {
	      throw 'Invalid request line : ' + line;
	    }
	    this.result = this.result_builder();
	    this.result.method = result[1];
	    this.result.protocol = 'SHIORI';
	    this.result.version = result[2];
	    return {
	      result: this.result,
	      state: 'end'
	    };
	  };
	
	  return Parser;
	
	})();
	
	ShioriJK.Shiori.Request.Header.Parser = (function(superClass) {
	  extend(Parser, superClass);
	
	  function Parser() {
	    this.section = new ShioriJK.Shiori.Request.Header.Section();
	  }
	
	  Parser.prototype.result_builder = function() {
	    return new ShioriJK.Headers.Request();
	  };
	
	  return Parser;
	
	})(ShioriJK.Shiori.Header.Parser);
	
	ShioriJK.Shiori.Request.Section = (function(superClass) {
	  extend(Section, superClass);
	
	  function Section(sections) {
	    this.sections = sections != null ? sections : ['idle', 'request_line', 'headers', 'end'];
	    this.index = 0;
	  }
	
	  return Section;
	
	})(ShioriJK.Shiori.Section);
	
	ShioriJK.Shiori.Request.Header.Section = (function(superClass) {
	  extend(Section, superClass);
	
	  function Section() {
	    return Section.__super__.constructor.apply(this, arguments);
	  }
	
	  return Section;
	
	})(ShioriJK.Shiori.Header.Section);
	
	ShioriJK.Shiori.Response.Parser = (function(superClass) {
	  extend(Parser, superClass);
	
	  function Parser() {
	    this.parsers = {
	      status_line: new ShioriJK.Shiori.Response.StatusLine.Parser(),
	      headers: new ShioriJK.Shiori.Response.Header.Parser()
	    };
	    this.section = new ShioriJK.Shiori.Response.Section();
	  }
	
	  Parser.prototype.result_builder = function() {
	    return new ShioriJK.Message.Response({
	      no_prepare: true
	    });
	  };
	
	  Parser.prototype.parse_main = function(line) {
	    var parser, parser_result;
	    parser = this.parsers[this.section.get()];
	    parser_result = parser.parse_line(line);
	    if (parser_result.state === 'end') {
	      this.result[this.section.get()] = parser_result.result;
	      return this.section.next();
	    }
	  };
	
	  return Parser;
	
	})(ShioriJK.Shiori.Parser);
	
	ShioriJK.Shiori.Response.StatusLine.Parser = (function() {
	  function Parser() {}
	
	  Parser.prototype.result_builder = function() {
	    return new ShioriJK.StatusLine();
	  };
	
	  Parser.prototype.parse = function(transaction) {
	    return this.parse_chunk(transaction);
	  };
	
	  Parser.prototype.parse_chunk = function(chunk) {
	    return this.parse_line(chunk);
	  };
	
	  Parser.prototype.parse_line = function(line) {
	    var result;
	    result = line.match(/^SHIORI\/([0-9.]+) (\d+) (.+)$/);
	    if (!result) {
	      throw 'Invalid status line : ' + line;
	    }
	    this.result = this.result_builder();
	    this.result.protocol = 'SHIORI';
	    this.result.version = result[1];
	    this.result.code = result[2] - 0;
	    return {
	      result: this.result,
	      state: 'end'
	    };
	  };
	
	  return Parser;
	
	})();
	
	ShioriJK.Shiori.Response.Header.Parser = (function(superClass) {
	  extend(Parser, superClass);
	
	  function Parser() {
	    this.section = new ShioriJK.Shiori.Response.Header.Section();
	  }
	
	  Parser.prototype.result_builder = function() {
	    return new ShioriJK.Headers.Response();
	  };
	
	  return Parser;
	
	})(ShioriJK.Shiori.Header.Parser);
	
	ShioriJK.Shiori.Response.Section = (function(superClass) {
	  extend(Section, superClass);
	
	  function Section(sections) {
	    this.sections = sections != null ? sections : ['idle', 'status_line', 'headers', 'end'];
	    this.index = 0;
	  }
	
	  return Section;
	
	})(ShioriJK.Shiori.Section);
	
	ShioriJK.Shiori.Response.Header.Section = (function(superClass) {
	  extend(Section, superClass);
	
	  function Section() {
	    return Section.__super__.constructor.apply(this, arguments);
	  }
	
	  return Section;
	
	})(ShioriJK.Shiori.Header.Section);
	
	//# sourceMappingURL=shiorijk.js.map
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(189)(module)))

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	if(false) var exports = window;
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	if (true) {
	  var ShioriConverter = __webpack_require__(196).ShioriConverter;
	}
	
	/**
	 * SHIORI/2.x/3.x transaction class with protocol version converter
	 */
	
	var ShioriTransaction = (function () {
	  /**
	   * constructor
	   * @return {ShioriTransaction} this
	   */
	
	  function ShioriTransaction() {
	    _classCallCheck(this, ShioriTransaction);
	  }
	
	  /**
	   * request
	   * @return {ShioriJK.Message.Request} request
	   */
	
	  _createClass(ShioriTransaction, [{
	    key: 'request_to',
	
	    /**
	     * convert request to specified protocol version
	     * (this method needs ShioriConverter)
	     * @param {string} version - target protocol version
	     * @return {ShioriJK.Message.Request} specified version request
	     */
	    value: function request_to(version) {
	      return ShioriConverter.request_to(this.request, version);
	    }
	
	    /**
	     * convert response to specified protocol version
	     * (this method needs ShioriConverter)
	     * @param {string} version - target protocol version
	     * @return {ShioriJK.Message.Response} specified version response
	     */
	
	  }, {
	    key: 'response_to',
	    value: function response_to(version) {
	      return ShioriConverter.response_to(this.request, this.response, version);
	    }
	  }, {
	    key: 'request',
	    get: function get() {
	      return this._request;
	    }
	
	    /**
	     * request
	     * @param {ShioriJK.Message.Request} request - request
	     * @return {ShioriJK.Message.Request} request
	     */
	    ,
	    set: function set(request) {
	      this._request = request;
	      this._request.to = this.request_to.bind(this);
	      return this._request;
	    }
	
	    /**
	     * response
	     * @return {ShioriJK.Message.Response} response
	     */
	
	  }, {
	    key: 'response',
	    get: function get() {
	      return this._response;
	    }
	
	    /**
	     * response
	     * @param {ShioriJK.Message.Response} response - response
	     * @return {ShioriJK.Message.Response} response
	     */
	    ,
	    set: function set(response) {
	      this._response = response;
	      this._response.to = this.response_to.bind(this);
	      return this._response;
	    }
	  }]);
	
	  return ShioriTransaction;
	})();
	
	exports.ShioriTransaction = ShioriTransaction;
	//# sourceMappingURL=shiori_transaction.js.map


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	function _possibleConstructorReturn(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function _inherits(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}if(false)var exports=window;var _createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(r,t,o){return t&&e(r.prototype,t),o&&e(r,o),r}}();if(Object.defineProperty(exports,"__esModule",{value:!0}),"undefined"!="function")var ShioriJK=__webpack_require__(193);var ShioriConverter=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"request_to",value:function(r,t){if(!r)throw new e.RequestNotSetError;return"4.0"===r.request_line.version?"4.0"===t?r:"3.0"===t?e.request_4to3(r):e.request_4to2(r):"3.0"===r.request_line.version?"4.0"===t?e.request_3to4(r):"3.0"===t?r:e.request_3to2(r):"4.0"===t?e.request_2to4(r):"3.0"===t?e.request_2to3(r):r}},{key:"response_to",value:function(r,t,o){if(!r)throw new e.RequestNotSetError;if(!t)throw new e.ResponseNotSetError;return"4.0"===t.status_line.version?"4.0"===o?t:"3.0"===o?e.response_4to3(r,t):e.response_4to2(r,t):"3.0"===t.status_line.version?"4.0"===o?e.response_3to4(r,t):"3.0"===o?t:e.response_3to2(r,t):"4.0"===o?e.response_2to4(r,t):"3.0"===o?e.response_2to3(r,t):t}},{key:"request_4to3",value:function(r){throw new e.NotImplementedError}},{key:"request_4to2",value:function(r){return e.request_3to2(e.request_4to3(r))}},{key:"method3to2",value:function(e){var r=e.headers.header.ID;return"version"===r?"GET Version":"OnTeach"===r?"TEACH":"ownerghostname"===r?"NOTIFY OwnerGhostName":"otherghostname"===r?"NOTIFY OtherGhostName":"NOTIFY"===e.request_line.method?void 0:r.match(/^[a-z]/)?"GET String":"GET Sentence"}},{key:"request_3to2",value:function(r){var t=e.method3to2(r);if(t){var o=r.headers.header.ID,n=new ShioriJK.Headers.Request,s=new ShioriJK.Message.Request({request_line:new ShioriJK.RequestLine({method:t,protocol:r.protocol,version:"2.6"}),headers:n});if("GET Sentence"===t&&null!=o){if("OnCommunicate"===o){n.header.Sender=r.headers.header.Reference0,n.header.Sentence=r.headers.header.Reference1,n.header.Age=r.headers.header.Age||"0";for(var a in r.headers.header){var i=r.headers.header[a],u=void 0;(u=a.match(/^Reference(\d+)$/))?n.header["Reference"+(u[1]-2)]=""+i:n.header[a]=""+i}return s}n.header.Event=o}else{if("GET String"!==t||null==o){if("TEACH"===t){n.header.Word=r.headers.header.Reference0;for(var a in r.headers.header){var i=r.headers.header[a],u=void 0;(u=a.match(/^Reference(\d+)$/))?n.header["Reference"+(u[1]-1)]=""+i:n.header[a]=""+i}return s}if("NOTIFY OwnerGhostName"===t)return n.header.Ghost=r.headers.header.Reference0,s;if("NOTIFY OtherGhostName"===t){var h=[];for(var a in r.headers.header){var i=r.headers.header[a];a.match(/^Reference\d+$/)?h.push(""+i):n.header[a]=""+i}var c=h.map(function(e){return"GhostEx: "+e+"\r\n"}).join("");return s.request_line+"\r\n"+s.headers+c+"\r\n"}return}n.header.ID=o}for(var a in r.headers.header)if("ID"!==a){var i=r.headers.header[a];n.header[a]=""+i}return s}}},{key:"request_2to3",value:function(r){throw new e.NotImplementedError}},{key:"request_3to4",value:function(r){throw new e.NotImplementedError}},{key:"request_2to4",value:function(r){return e.request_3to4(e.request_2to3(r))}},{key:"response_4to3",value:function(r,t){throw new e.NotImplementedError}},{key:"response_4to2",value:function(r,t){return e.response_3to2(e.response_4to3(r,t))}},{key:"response_3to2",value:function(r,t){throw new e.NotImplementedError}},{key:"response_2to3",value:function(r,t){var o=e.request_to(r,"2.6"),n=void 0;switch(o.request_line.method){case"GET String":n="String";break;case"GET Word":n="Word";break;case"GET Status":n="Status";break;default:n="Sentence"}var s=new ShioriJK.Headers.Response;null!=t.headers.header[n]&&(s.header.Value=t.headers.header[n]);for(var a in t.headers.header){var i=t.headers.header[a],u=void 0;(u=a.match(/^Reference(\d+)$/))?s.header["Reference"+(u[1]+1)]=i:"To"===a?s.header.Reference0=i:a!==n&&(s.header[a]=i)}return new ShioriJK.Message.Response({status_line:new ShioriJK.StatusLine({code:t.status_line.code,protocol:t.status_line.protocol,version:"3.0"}),headers:s})}},{key:"response_3to4",value:function(r,t){throw new e.NotImplementedError}},{key:"response_2to4",value:function(r,t){return e.response_3to4(e.response_2to3(r,t))}}]),e}();ShioriConverter.RequestNotSetError=function(e){function r(){return _classCallCheck(this,r),_possibleConstructorReturn(this,Object.getPrototypeOf(r).apply(this,arguments))}return _inherits(r,e),r}(Error),ShioriConverter.ResponseNotSetError=function(e){function r(){return _classCallCheck(this,r),_possibleConstructorReturn(this,Object.getPrototypeOf(r).apply(this,arguments))}return _inherits(r,e),r}(Error),ShioriConverter.NotImplementedError=function(e){function r(){return _classCallCheck(this,r),_possibleConstructorReturn(this,Object.getPrototypeOf(r).apply(this,arguments))}return _inherits(r,e),r}(Error),exports.ShioriConverter=ShioriConverter;
	//# sourceMappingURL=shiori_converter.js.map


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;
	
	  if (!events) return names;
	
	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return this;
	
	  var listeners = this._events[evt]
	    , events = [];
	
	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {(function() {
	  var SakuraScript, SakuraScriptToken, joinargs, splitargs,
	    slice = [].slice,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    hasProp = {}.hasOwnProperty;
	
	  splitargs = function(str) {
	    return str.replace(/"((?:\\\\|\\"|[^"])*)"/g, function(all, quoted) {
	      return quoted.replace(/,/g, '\0');
	    }).split(/\s*\,\s*/).map(function(arg) {
	      return arg.replace(/\0/g, ',').replace(/\\(.)/, '$1');
	    });
	  };
	
	  joinargs = function(args) {
	    return args.map(function(arg) {
	      return arg.replace(/\\/, '\\\\').replace(/\]/, '\\]');
	    }).map(function(arg) {
	      if (/[,"]/.test(arg)) {
	        return '"' + arg.replace(/"/, '\\"') + '"';
	      } else {
	        return arg;
	      }
	    }).join(',');
	  };
	
	  SakuraScript = (function() {
	    SakuraScript.fromObject = function(json) {
	      var i, len, token, tokens;
	      tokens = [];
	      for (i = 0, len = json.length; i < len; i++) {
	        token = json[i];
	        tokens.push(SakuraScriptToken.fromObject(token));
	      }
	      return new SakuraScript(tokens);
	    };
	
	    SakuraScript.parse = function(script) {
	      var i, len, ref, tag, tokens;
	      tokens = [];
	      while (script.length) {
	        tag = null;
	        ref = SakuraScript.tags;
	        for (i = 0, len = ref.length; i < len; i++) {
	          tag = ref[i];
	          if (tag.re.test(script)) {
	            break;
	          }
	        }
	        script = script.replace(tag.re, (function(_this) {
	          return function() {
	            var all, group, j, offset;
	            group = 3 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 2) : (j = 0, []), offset = arguments[j++], all = arguments[j++];
	            tokens.push(tag.match.call(_this, group));
	            return '';
	          };
	        })(this));
	      }
	      return new SakuraScript(tokens);
	    };
	
	    function SakuraScript(tokens1) {
	      this.tokens = tokens1 != null ? tokens1 : [];
	    }
	
	    SakuraScript.prototype.toObject = function() {
	      var i, len, ref, results, token;
	      ref = this.tokens;
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        token = ref[i];
	        results.push(token.toObject());
	      }
	      return results;
	    };
	
	    SakuraScript.prototype.toSakuraScript = function() {
	      var token;
	      return ((function() {
	        var i, len, ref, results;
	        ref = this.tokens;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          token = ref[i];
	          results.push(token.toSakuraScript());
	        }
	        return results;
	      }).call(this)).join('');
	    };
	
	    return SakuraScript;
	
	  })();
	
	  SakuraScriptToken = (function() {
	    SakuraScriptToken.fromObject = function(json) {
	      var i, instance, key, len, ref;
	      instance = new SakuraScriptToken[json["class"]]();
	      ref = Object.keys(json);
	      for (i = 0, len = ref.length; i < len; i++) {
	        key = ref[i];
	        if (key !== "class") {
	          instance[key] = json[key];
	        }
	      }
	      return instance;
	    };
	
	    function SakuraScriptToken() {}
	
	    SakuraScriptToken.prototype.toObject = function() {
	      var class_name, i, json, key, len, ref;
	      class_name = this.constructor.toString().slice(9).match(/^[^\s(]+/)[0];
	      json = {
	        "class": class_name
	      };
	      ref = Object.keys(this);
	      for (i = 0, len = ref.length; i < len; i++) {
	        key = ref[i];
	        json[key] = this[key];
	      }
	      return json;
	    };
	
	    SakuraScriptToken.prototype.toSakuraScript = function() {
	      throw new Error("not implemented");
	    };
	
	    return SakuraScriptToken;
	
	  })();
	
	  SakuraScriptToken.Scope = (function(superClass) {
	    extend(Scope, superClass);
	
	    function Scope(scope, view) {
	      this.scope = scope;
	      this.view = view;
	    }
	
	    Scope.prototype.toSakuraScript = function() {
	      switch (this.view) {
	        case "bracket":
	          return "\\p[" + this.scope + "]";
	        case "nobracket":
	          return "\\p" + this.scope;
	        default:
	          return "\\" + this.view;
	      }
	    };
	
	    return Scope;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Surface = (function(superClass) {
	    extend(Surface, superClass);
	
	    function Surface(surface, view) {
	      this.surface = surface;
	      this.view = view;
	    }
	
	    Surface.prototype.toSakuraScript = function() {
	      switch (this.view) {
	        case "bracket":
	          return "\\s[" + this.surface + "]";
	        case "nobracket":
	          return "\\s" + this.surface;
	      }
	    };
	
	    return Surface;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.SurfaceAlias = (function(superClass) {
	    extend(SurfaceAlias, superClass);
	
	    function SurfaceAlias(surface_alias) {
	      this.surface_alias = surface_alias;
	    }
	
	    SurfaceAlias.prototype.toSakuraScript = function() {
	      return "\\s[" + (joinargs([this.surface_alias])) + "]";
	    };
	
	    return SurfaceAlias;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Balloon = (function(superClass) {
	    extend(Balloon, superClass);
	
	    function Balloon(balloon, view) {
	      this.balloon = balloon;
	      this.view = view;
	    }
	
	    Balloon.prototype.toSakuraScript = function() {
	      switch (this.view) {
	        case "bracket":
	          return "\\b[" + this.balloon + "]";
	        case "nobracket":
	          return "\\b" + this.balloon;
	      }
	    };
	
	    return Balloon;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.PlayAnimation = (function(superClass) {
	    extend(PlayAnimation, superClass);
	
	    function PlayAnimation(animation, view) {
	      this.animation = animation;
	      this.view = view;
	    }
	
	    PlayAnimation.prototype.toSakuraScript = function() {
	      switch (this.view) {
	        case "bracket":
	          return "\\i[" + this.animation + "]";
	        case "nobracket":
	          return "\\i" + this.animation;
	      }
	    };
	
	    return PlayAnimation;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.PlayAnimationWait = (function(superClass) {
	    extend(PlayAnimationWait, superClass);
	
	    function PlayAnimationWait(animation) {
	      this.animation = animation;
	    }
	
	    PlayAnimationWait.prototype.toSakuraScript = function() {
	      return "\\i[" + this.animation + ",wait]";
	    };
	
	    return PlayAnimationWait;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.SimpleWait = (function(superClass) {
	    extend(SimpleWait, superClass);
	
	    function SimpleWait(period) {
	      this.period = period;
	    }
	
	    SimpleWait.prototype.toSakuraScript = function() {
	      return "\\w" + this.period;
	    };
	
	    return SimpleWait;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.PreciseWait = (function(superClass) {
	    extend(PreciseWait, superClass);
	
	    function PreciseWait(period) {
	      this.period = period;
	    }
	
	    PreciseWait.prototype.toSakuraScript = function() {
	      return "\\_w[" + this.period + "]";
	    };
	
	    return PreciseWait;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.WaitFromBeginning = (function(superClass) {
	    extend(WaitFromBeginning, superClass);
	
	    function WaitFromBeginning(period) {
	      this.period = period;
	    }
	
	    WaitFromBeginning.prototype.toSakuraScript = function() {
	      return "\\__w[" + this.period + "]";
	    };
	
	    return WaitFromBeginning;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.ResetBeginning = (function(superClass) {
	    extend(ResetBeginning, superClass);
	
	    function ResetBeginning() {}
	
	    ResetBeginning.prototype.toSakuraScript = function() {
	      return "\\__w[clear]";
	    };
	
	    return ResetBeginning;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.WaitAnimationEnd = (function(superClass) {
	    extend(WaitAnimationEnd, superClass);
	
	    function WaitAnimationEnd(id) {
	      this.id = id;
	    }
	
	    WaitAnimationEnd.prototype.toSakuraScript = function() {
	      return "\\__w[animation," + this.id + "]";
	    };
	
	    return WaitAnimationEnd;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.ToggleQuick = (function(superClass) {
	    extend(ToggleQuick, superClass);
	
	    function ToggleQuick() {}
	
	    ToggleQuick.prototype.toSakuraScript = function() {
	      return "\\_q";
	    };
	
	    return ToggleQuick;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.ToggleSynchronize = (function(superClass) {
	    extend(ToggleSynchronize, superClass);
	
	    function ToggleSynchronize(scopes) {
	      this.scopes = scopes != null ? scopes : [];
	    }
	
	    ToggleSynchronize.prototype.toSakuraScript = function() {
	      return "\\_s" + (this.scopes.length ? "[" + (joinargs(this.scopes)) + "]" : "");
	    };
	
	    return ToggleSynchronize;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.TimeCritical = (function(superClass) {
	    extend(TimeCritical, superClass);
	
	    function TimeCritical() {}
	
	    TimeCritical.prototype.toSakuraScript = function() {
	      return "\\t";
	    };
	
	    return TimeCritical;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.WaitClick = (function(superClass) {
	    extend(WaitClick, superClass);
	
	    function WaitClick() {}
	
	    WaitClick.prototype.toSakuraScript = function() {
	      return "\\x";
	    };
	
	    return WaitClick;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.NoChoiceTimeout = (function(superClass) {
	    extend(NoChoiceTimeout, superClass);
	
	    function NoChoiceTimeout() {}
	
	    NoChoiceTimeout.prototype.toSakuraScript = function() {
	      return "\\*";
	    };
	
	    return NoChoiceTimeout;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.EventChoice = (function(superClass) {
	    extend(EventChoice, superClass);
	
	    function EventChoice(text, event, references) {
	      this.text = text;
	      this.event = event;
	      this.references = references;
	    }
	
	    EventChoice.prototype.toSakuraScript = function() {
	      return "\\q[" + (joinargs([this.text, this.event].concat(this.references))) + "]";
	    };
	
	    return EventChoice;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.ReferencesChoice = (function(superClass) {
	    extend(ReferencesChoice, superClass);
	
	    function ReferencesChoice(text, references) {
	      this.text = text;
	      this.references = references;
	    }
	
	    ReferencesChoice.prototype.toSakuraScript = function() {
	      return "\\q[" + (joinargs([this.text].concat(this.references))) + "]";
	    };
	
	    return ReferencesChoice;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.ScriptChoice = (function(superClass) {
	    extend(ScriptChoice, superClass);
	
	    function ScriptChoice(text, script1) {
	      this.text = text;
	      this.script = script1;
	    }
	
	    ScriptChoice.prototype.toSakuraScript = function() {
	      return "\\q[" + (joinargs([this.text, "script:" + this.script])) + "]";
	    };
	
	    return ScriptChoice;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.OldReferenceChoice = (function(superClass) {
	    extend(OldReferenceChoice, superClass);
	
	    function OldReferenceChoice(text, reference, view) {
	      this.text = text;
	      this.reference = reference;
	      this.view = view;
	    }
	
	    OldReferenceChoice.prototype.toSakuraScript = function() {
	      return "\\q" + (this.view || '') + "[" + (joinargs([this.reference])) + "][" + (joinargs([this.text])) + "]";
	    };
	
	    return OldReferenceChoice;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.BeginEventChoice = (function(superClass) {
	    extend(BeginEventChoice, superClass);
	
	    function BeginEventChoice(event, references) {
	      this.event = event;
	      this.references = references;
	    }
	
	    BeginEventChoice.prototype.toSakuraScript = function() {
	      return "\\__q[" + (joinargs([this.event].concat(this.references))) + "]";
	    };
	
	    return BeginEventChoice;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.BeginReferencesChoice = (function(superClass) {
	    extend(BeginReferencesChoice, superClass);
	
	    function BeginReferencesChoice(references) {
	      this.references = references;
	    }
	
	    BeginReferencesChoice.prototype.toSakuraScript = function() {
	      return "\\__q[" + (joinargs(this.references)) + "]";
	    };
	
	    return BeginReferencesChoice;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.BeginScriptChoice = (function(superClass) {
	    extend(BeginScriptChoice, superClass);
	
	    function BeginScriptChoice(script1) {
	      this.script = script1;
	    }
	
	    BeginScriptChoice.prototype.toSakuraScript = function() {
	      return "\\__q[" + (joinargs(["script:" + this.script])) + "]";
	    };
	
	    return BeginScriptChoice;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.EndChoice = (function(superClass) {
	    extend(EndChoice, superClass);
	
	    function EndChoice() {}
	
	    EndChoice.prototype.toSakuraScript = function() {
	      return "\\__q";
	    };
	
	    return EndChoice;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.BeginEventAnchor = (function(superClass) {
	    extend(BeginEventAnchor, superClass);
	
	    function BeginEventAnchor(event, references) {
	      this.event = event;
	      this.references = references;
	    }
	
	    BeginEventAnchor.prototype.toSakuraScript = function() {
	      return "\\_a[" + (joinargs([this.event].concat(this.references))) + "]";
	    };
	
	    return BeginEventAnchor;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.BeginReferencesAnchor = (function(superClass) {
	    extend(BeginReferencesAnchor, superClass);
	
	    function BeginReferencesAnchor(references) {
	      this.references = references;
	    }
	
	    BeginReferencesAnchor.prototype.toSakuraScript = function() {
	      return "\\_a[" + (joinargs(this.references)) + "]";
	    };
	
	    return BeginReferencesAnchor;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.BeginScriptAnchor = (function(superClass) {
	    extend(BeginScriptAnchor, superClass);
	
	    function BeginScriptAnchor(script1) {
	      this.script = script1;
	    }
	
	    BeginScriptAnchor.prototype.toSakuraScript = function() {
	      return "\\_a[" + (joinargs(["script:" + this.script])) + "]";
	    };
	
	    return BeginScriptAnchor;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.EndAnchor = (function(superClass) {
	    extend(EndAnchor, superClass);
	
	    function EndAnchor() {}
	
	    EndAnchor.prototype.toSakuraScript = function() {
	      return "\\_a";
	    };
	
	    return EndAnchor;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.LineBreak = (function(superClass) {
	    extend(LineBreak, superClass);
	
	    function LineBreak() {}
	
	    LineBreak.prototype.toSakuraScript = function() {
	      return "\\n";
	    };
	
	    return LineBreak;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.HalfLineBreak = (function(superClass) {
	    extend(HalfLineBreak, superClass);
	
	    function HalfLineBreak() {}
	
	    HalfLineBreak.prototype.toSakuraScript = function() {
	      return "\\n[half]";
	    };
	
	    return HalfLineBreak;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.PercentLineBreak = (function(superClass) {
	    extend(PercentLineBreak, superClass);
	
	    function PercentLineBreak(percent) {
	      this.percent = percent;
	    }
	
	    PercentLineBreak.prototype.toSakuraScript = function() {
	      return "\\n[" + this.percent + "]";
	    };
	
	    return PercentLineBreak;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.ToggleNoAutoLineBreak = (function(superClass) {
	    extend(ToggleNoAutoLineBreak, superClass);
	
	    function ToggleNoAutoLineBreak() {}
	
	    ToggleNoAutoLineBreak.prototype.toSakuraScript = function() {
	      return "\\_n";
	    };
	
	    return ToggleNoAutoLineBreak;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Location = (function(superClass) {
	    extend(Location, superClass);
	
	    function Location(x1, y1) {
	      this.x = x1;
	      this.y = y1;
	    }
	
	    Location.prototype.toSakuraScript = function() {
	      return "\\_l[" + ([this.x, this.y].join(',')) + "]";
	    };
	
	    return Location;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Image = (function(superClass) {
	    extend(Image, superClass);
	
	    function Image(path, x1, y1, args1) {
	      this.path = path;
	      this.x = x1;
	      this.y = y1;
	      this.args = args1;
	    }
	
	    Image.prototype.toSakuraScript = function() {
	      return "\\_b[" + ([this.path, this.x, this.y].concat(this.args).join(',')) + "]";
	    };
	
	    return Image;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.InlineImage = (function(superClass) {
	    extend(InlineImage, superClass);
	
	    function InlineImage(path, x1, y1, args1) {
	      this.path = path;
	      this.x = x1;
	      this.y = y1;
	      this.args = args1;
	    }
	
	    InlineImage.prototype.toSakuraScript = function() {
	      return "\\_b[" + ([this.path, 'inline'].concat(this.args).join(',')) + "]";
	    };
	
	    return InlineImage;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Font = (function(superClass) {
	    extend(Font, superClass);
	
	    function Font(name, args1) {
	      this.name = name;
	      this.args = args1;
	    }
	
	    Font.prototype.toSakuraScript = function() {
	      return "\\f[" + (joinargs([this.name].concat(this.args))) + "]";
	    };
	
	    return Font;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.BeFar = (function(superClass) {
	    extend(BeFar, superClass);
	
	    function BeFar() {}
	
	    BeFar.prototype.toSakuraScript = function() {
	      return "\\4";
	    };
	
	    return BeFar;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.BeNear = (function(superClass) {
	    extend(BeNear, superClass);
	
	    function BeNear() {}
	
	    BeNear.prototype.toSakuraScript = function() {
	      return "\\5";
	    };
	
	    return BeNear;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Clear = (function(superClass) {
	    extend(Clear, superClass);
	
	    function Clear() {}
	
	    Clear.prototype.toSakuraScript = function() {
	      return "\\c";
	    };
	
	    return Clear;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.End = (function(superClass) {
	    extend(End, superClass);
	
	    function End() {}
	
	    End.prototype.toSakuraScript = function() {
	      return "\\e";
	    };
	
	    return End;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.OldChoiceEnd = (function(superClass) {
	    extend(OldChoiceEnd, superClass);
	
	    function OldChoiceEnd() {}
	
	    OldChoiceEnd.prototype.toSakuraScript = function() {
	      return "\\z";
	    };
	
	    return OldChoiceEnd;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.OpenCommunicateBox = (function(superClass) {
	    extend(OpenCommunicateBox, superClass);
	
	    function OpenCommunicateBox() {}
	
	    OpenCommunicateBox.prototype.toSakuraScript = function() {
	      return "\\__c";
	    };
	
	    return OpenCommunicateBox;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.OpenTeachBox = (function(superClass) {
	    extend(OpenTeachBox, superClass);
	
	    function OpenTeachBox() {}
	
	    OpenTeachBox.prototype.toSakuraScript = function() {
	      return "\\__t";
	    };
	
	    return OpenTeachBox;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Halt = (function(superClass) {
	    extend(Halt, superClass);
	
	    function Halt() {}
	
	    Halt.prototype.toSakuraScript = function() {
	      return "\\-";
	    };
	
	    return Halt;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Marker = (function(superClass) {
	    extend(Marker, superClass);
	
	    function Marker() {}
	
	    Marker.prototype.toSakuraScript = function() {
	      return "\\![*]";
	    };
	
	    return Marker;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Char = (function(superClass) {
	    extend(Char, superClass);
	
	    function Char(char) {
	      this.char = char;
	    }
	
	    Char.prototype.toSakuraScript = function() {
	      return this.char;
	    };
	
	    return Char;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.EscapeChar = (function(superClass) {
	    extend(EscapeChar, superClass);
	
	    function EscapeChar() {}
	
	    EscapeChar.prototype.toSakuraScript = function() {
	      return "\\\\";
	    };
	
	    return EscapeChar;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.UCSChar = (function(superClass) {
	    extend(UCSChar, superClass);
	
	    function UCSChar(char) {
	      this.char = char;
	    }
	
	    UCSChar.prototype.toSakuraScript = function() {
	      return "\\_u[0x" + (this.char.toString(16)) + "]";
	    };
	
	    return UCSChar;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.AsciiChar = (function(superClass) {
	    extend(AsciiChar, superClass);
	
	    function AsciiChar(char) {
	      this.char = char;
	    }
	
	    AsciiChar.prototype.toSakuraScript = function() {
	      return "\\_m[0x" + (this.char.toString(16)) + "]";
	    };
	
	    return AsciiChar;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.EntityChar = (function(superClass) {
	    extend(EntityChar, superClass);
	
	    function EntityChar(char) {
	      this.char = char;
	    }
	
	    EntityChar.prototype.toSakuraScript = function() {
	      return "\\&[" + this.char + "]";
	    };
	
	    return EntityChar;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Animation = (function(superClass) {
	    extend(Animation, superClass);
	
	    function Animation(command, id, args1) {
	      this.command = command;
	      this.id = id;
	      this.args = args1;
	    }
	
	    Animation.prototype.toSakuraScript = function() {
	      return "\\![anim," + (joinargs([this.command, this.id].concat(this.args))) + "]";
	    };
	
	    return Animation;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Bind = (function(superClass) {
	    extend(Bind, superClass);
	
	    function Bind(category, parts, dress_up) {
	      this.category = category;
	      this.parts = parts;
	      this.dress_up = dress_up;
	    }
	
	    Bind.prototype.toSakuraScript = function() {
	      return "\\![bind," + (joinargs([this.category, this.parts, this.dress_up])) + "]";
	    };
	
	    return Bind;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.LockRepaint = (function(superClass) {
	    extend(LockRepaint, superClass);
	
	    function LockRepaint() {}
	
	    LockRepaint.prototype.toSakuraScript = function() {
	      return "\\![lock,repaint]";
	    };
	
	    return LockRepaint;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.UnlockRepaint = (function(superClass) {
	    extend(UnlockRepaint, superClass);
	
	    function UnlockRepaint() {}
	
	    UnlockRepaint.prototype.toSakuraScript = function() {
	      return "\\![unlock,repaint]";
	    };
	
	    return UnlockRepaint;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Move = (function(superClass) {
	    extend(Move, superClass);
	
	    function Move(x1, y1, duration, origin_type, source_origin, target_origin) {
	      this.x = x1;
	      this.y = y1;
	      this.duration = duration;
	      this.origin_type = origin_type;
	      this.source_origin = source_origin;
	      this.target_origin = target_origin;
	    }
	
	    Move.prototype.toSakuraScript = function() {
	      return "\\![move," + (joinargs([this.x, this.y, this.duration, this.origin_type, this.source_origin, this.target_origin])) + "]";
	    };
	
	    return Move;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.MoveAsync = (function(superClass) {
	    extend(MoveAsync, superClass);
	
	    function MoveAsync() {
	      return MoveAsync.__super__.constructor.apply(this, arguments);
	    }
	
	    MoveAsync.prototype.toSakuraScript = function() {
	      return "\\![moveasync," + (joinargs([this.x, this.y, this.duration, this.origin_type, this.source_origin, this.target_origin])) + "]";
	    };
	
	    return MoveAsync;
	
	  })(SakuraScriptToken.Move);
	
	  SakuraScriptToken.MoveAsyncCancel = (function(superClass) {
	    extend(MoveAsyncCancel, superClass);
	
	    function MoveAsyncCancel() {}
	
	    MoveAsyncCancel.prototype.toSakuraScript = function() {
	      return "\\![moveasync,cancel]";
	    };
	
	    return MoveAsyncCancel;
	
	  })(SakuraScriptToken.Move);
	
	  SakuraScriptToken.Raise = (function(superClass) {
	    extend(Raise, superClass);
	
	    function Raise(event, references) {
	      this.event = event;
	      this.references = references;
	    }
	
	    Raise.prototype.toSakuraScript = function() {
	      return "\\![raise," + (joinargs([this.event].concat(this.references))) + "]";
	    };
	
	    return Raise;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Set = (function(superClass) {
	    extend(Set, superClass);
	
	    function Set(id, args1) {
	      this.id = id;
	      this.args = args1;
	    }
	
	    Set.prototype.toSakuraScript = function() {
	      return "\\![set," + (joinargs([this.id].concat(this.args))) + "]";
	    };
	
	    return Set;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.Open = (function(superClass) {
	    extend(Open, superClass);
	
	    function Open(id, args1) {
	      this.id = id;
	      this.args = args1;
	    }
	
	    Open.prototype.toSakuraScript = function() {
	      return "\\![open," + (joinargs([this.id].concat(this.args))) + "]";
	    };
	
	    return Open;
	
	  })(SakuraScriptToken);
	
	  SakuraScriptToken.NotImplemented = (function(superClass) {
	    extend(NotImplemented, superClass);
	
	    function NotImplemented(str1) {
	      this.str = str1;
	    }
	
	    NotImplemented.prototype.toSakuraScript = function() {
	      return this.str;
	    };
	
	    return NotImplemented;
	
	  })(SakuraScriptToken);
	
	  SakuraScript.tags = [
	    {
	      re: /^\\([h0])/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Scope(0, group[1]);
	      }
	    }, {
	      re: /^\\([u1])/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Scope(1, group[1]);
	      }
	    }, {
	      re: /^\\p\[(\d+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Scope(Number(group[1]), "bracket");
	      }
	    }, {
	      re: /^\\p(\d)/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Scope(Number(group[1]), "nobracket");
	      }
	    }, {
	      re: /^\\s(\d)/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Surface(Number(group[1]), "nobracket");
	      }
	    }, {
	      re: /^\\s\[([^\]]+)\]/,
	      match: function(group, state) {
	        if (isNaN(group[1])) {
	          return new SakuraScriptToken.SurfaceAlias(group[1]);
	        } else {
	          return new SakuraScriptToken.Surface(Number(group[1]), "bracket");
	        }
	      }
	    }, {
	      re: /^\\b(\d)/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Balloon(Number(group[1]), "nobracket");
	      }
	    }, {
	      re: /^\\b\[([^\]]+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Balloon(Number(group[1]), "bracket");
	      }
	    }, {
	      re: /^\\i(\d)/,
	      match: function(group, state) {
	        return new SakuraScriptToken.PlayAnimation(Number(group[1]), "nobracket");
	      }
	    }, {
	      re: /^\\i\[(\d+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.PlayAnimation(Number(group[1]), "bracket");
	      }
	    }, {
	      re: /^\\i\[(\d+),wait\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.PlayAnimationWait(Number(group[1]));
	      }
	    }, {
	      re: /^\\w(\d)/,
	      match: function(group, state) {
	        return new SakuraScriptToken.SimpleWait(Number(group[1]));
	      }
	    }, {
	      re: /^\\_w\[(\d+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.PreciseWait(Number(group[1]));
	      }
	    }, {
	      re: /^\\__w\[animation,(\d+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.WaitAnimationEnd(Number(group[1]));
	      }
	    }, {
	      re: /^\\__w\[clear\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.ResetBeginning();
	      }
	    }, {
	      re: /^\\__w\[(\d+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.WaitFromBeginning(Number(group[1]));
	      }
	    }, {
	      re: /^\\_q/,
	      match: function(group, state) {
	        return new SakuraScriptToken.ToggleQuick();
	      }
	    }, {
	      re: /^\\_s\[([^\]]+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.ToggleSynchronize(splitargs(group[1]).map(function(n) {
	          return Number(n);
	        }));
	      }
	    }, {
	      re: /^\\_s/,
	      match: function(group, state) {
	        return new SakuraScriptToken.ToggleSynchronize();
	      }
	    }, {
	      re: /^\\t/,
	      match: function(group, state) {
	        return new SakuraScriptToken.TimeCritical();
	      }
	    }, {
	      re: /^\\x/,
	      match: function(group, state) {
	        return new SakuraScriptToken.WaitClick();
	      }
	    }, {
	      re: /^\\\*/,
	      match: function(group, state) {
	        return new SakuraScriptToken.NoChoiceTimeout();
	      }
	    }, {
	      re: /^\\q\[((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        if (/^On/.test(args[1])) {
	          return new SakuraScriptToken.EventChoice(args[0], args[1], args.slice(2));
	        } else if (/^script:/.test(args[1])) {
	          return new SakuraScriptToken.ScriptChoice(args[0], args[1].replace(/^script:/, ''));
	        } else {
	          return new SakuraScriptToken.ReferencesChoice(args[0], args.slice(1));
	        }
	      }
	    }, {
	      re: /^\\__q\[((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        if (/^On/.test(args[0])) {
	          return new SakuraScriptToken.BeginEventChoice(args[0], args.slice(1));
	        } else if (/^script:/.test(args[0])) {
	          return new SakuraScriptToken.BeginScriptChoice(args[0].replace(/^script:/, ''));
	        } else {
	          return new SakuraScriptToken.BeginReferencesChoice(args);
	        }
	      }
	    }, {
	      re: /^\\__q/,
	      match: function(group, state) {
	        return new SakuraScriptToken.EndChoice();
	      }
	    }, {
	      re: /^\\q(\d*)\[((?:\\\\|\\\]|[^\]])+)\]\[((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.OldReferenceChoice(group[3], group[2], group[1]);
	      }
	    }, {
	      re: /^\\_a\[((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        if (/^On/.test(args[0])) {
	          return new SakuraScriptToken.BeginEventAnchor(args[0], args.slice(1));
	        } else if (/^script:/.test(args[0])) {
	          return new SakuraScriptToken.BeginScriptAnchor(args[0].replace(/^script:/, ''));
	        } else {
	          return new SakuraScriptToken.BeginReferencesAnchor(args);
	        }
	      }
	    }, {
	      re: /^\\_a/,
	      match: function(group, state) {
	        return new SakuraScriptToken.EndAnchor();
	      }
	    }, {
	      re: /^\\n\[half\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.HalfLineBreak();
	      }
	    }, {
	      re: /^\\n\[(\d+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.PercentLineBreak(Number(group[1]));
	      }
	    }, {
	      re: /^\\n/,
	      match: function(group, state) {
	        return new SakuraScriptToken.LineBreak();
	      }
	    }, {
	      re: /^\\_n/,
	      match: function(group, state) {
	        return new SakuraScriptToken.ToggleNoAutoLineBreak();
	      }
	    }, {
	      re: /^\\_l\[([^\]]+)\]/,
	      match: function(group, state) {
	        var ref, x, y;
	        ref = splitargs(group[1]), x = ref[0], y = ref[1];
	        return new SakuraScriptToken.Location(x, y);
	      }
	    }, {
	      re: /^\\_b\[((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        if (args[1] === "inline") {
	          return new SakuraScriptToken.InlineImage(args[0], args.slice(2));
	        } else {
	          return new SakuraScriptToken.Image(args[0], args[1], args[2], args.slice(3));
	        }
	      }
	    }, {
	      re: /^\\f\[([^\]]+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        return new SakuraScriptToken.Font(args[0], args.slice(1));
	      }
	    }, {
	      re: /^\\4/,
	      match: function(group, state) {
	        return new SakuraScriptToken.BeFar();
	      }
	    }, {
	      re: /^\\5/,
	      match: function(group, state) {
	        return new SakuraScriptToken.BeNear();
	      }
	    }, {
	      re: /^\\c/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Clear();
	      }
	    }, {
	      re: /^\\e/,
	      match: function(group, state) {
	        return new SakuraScriptToken.End();
	      }
	    }, {
	      re: /^\\z/,
	      match: function(group, state) {
	        return new SakuraScriptToken.OldChoiceEnd();
	      }
	    }, {
	      re: /^\\-/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Halt();
	      }
	    }, {
	      re: /^\\\\/,
	      match: function(group, state) {
	        return new SakuraScriptToken.EscapeChar();
	      }
	    }, {
	      re: /^\\!\[anim,((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        return new SakuraScriptToken.Animation(args[0], args[1], args.slice(2));
	      }
	    }, {
	      re: /^\\!\[bind,((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        return new SakuraScriptToken.Bind(args[0], args[1], args[2]);
	      }
	    }, {
	      re: /^\\!\[moveasync,cancel\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.MoveAsyncCancel();
	      }
	    }, {
	      re: /^\\!\[move(async)?,((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args, use_class;
	        use_class = group[1] ? SakuraScriptToken.MoveAsync : SakuraScriptToken.Move;
	        args = splitargs(group[2]);
	        return new use_class(args[0], args[1], args[2], args[3], args[4], args[5]);
	      }
	    }, {
	      re: /^\\!\[lock,repaint\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.LockRepaint();
	      }
	    }, {
	      re: /^\\!\[unlock,repaint\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.UnlockRepaint();
	      }
	    }, {
	      re: /^\\!\[set,((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        return new SakuraScriptToken.Set(args[0], args.slice(1));
	      }
	    }, {
	      re: /^\\!\[open,((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        return new SakuraScriptToken.Open(args[0], args.slice(1));
	      }
	    }, {
	      re: /^\\__c/,
	      match: function(group, state) {
	        return new SakuraScriptToken.OpenCommunicateBox();
	      }
	    }, {
	      re: /^\\__t/,
	      match: function(group, state) {
	        return new SakuraScriptToken.OpenTeachBox();
	      }
	    }, {
	      re: /^\\!\[\s*raise\s*,\s*((?:\\\\|\\\]|[^\]])+)\]/,
	      match: function(group, state) {
	        var args;
	        args = splitargs(group[1]);
	        return new SakuraScriptToken.Raise(args[0], args.slice(1));
	      }
	    }, {
	      re: /^\\!\[\*\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.Marker();
	      }
	    }, {
	      re: /^\\_u\[([A-Fa-fXx0-9]+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.UCSChar(Number(group[1]));
	      }
	    }, {
	      re: /^\\_m\[([A-Fa-fXx0-9]+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.AsciiChar(Number(group[1]));
	      }
	    }, {
	      re: /^\\&\[([A-Za-z0-9]+)\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.EntityChar(group[1]);
	      }
	    }, {
	      re: /^\\[C67+v8]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.NotImplemented(group[0]);
	      }
	    }, {
	      re: /^\\_[+V]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.NotImplemented(group[0]);
	      }
	    }, {
	      re: /^\\[8j]\[.*?\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.NotImplemented(group[0]);
	      }
	    }, {
	      re: /^\\_[!?v]\[.*?\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.NotImplemented(group[0]);
	      }
	    }, {
	      re: /^\\!\[.*?\]/,
	      match: function(group, state) {
	        return new SakuraScriptToken.NotImplemented(group[0]);
	      }
	    }, {
	      re: /^./,
	      match: function(group, state) {
	        return new SakuraScriptToken.Char(group[0]);
	      }
	    }
	  ];
	
	  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
	    module.exports = {
	      SakuraScript: SakuraScript,
	      SakuraScriptToken: SakuraScriptToken
	    };
	  } else {
	    this.SakuraScript = SakuraScript;
	    this.SakuraScriptToken = SakuraScriptToken;
	  }
	
	}).call(this);
	
	//# sourceMappingURL=sakurascript.js.map
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(189)(module)))

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(__webpack_module_template_argument_0__);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(__webpack_module_template_argument_0__)
	  , enumBugKeys = __webpack_require__(__webpack_module_template_argument_1__);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__) {

	var has          = __webpack_require__(__webpack_module_template_argument_0__)
	  , toIObject    = __webpack_require__(__webpack_module_template_argument_1__)
	  , arrayIndexOf = __webpack_require__(__webpack_module_template_argument_2__)(false)
	  , IE_PROTO     = __webpack_require__(__webpack_module_template_argument_3__)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(__webpack_module_template_argument_0__)
	  , defined = __webpack_require__(__webpack_module_template_argument_1__);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(__webpack_module_template_argument_0__);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(__webpack_module_template_argument_0__)
	  , toLength  = __webpack_require__(__webpack_module_template_argument_1__)
	  , toIndex   = __webpack_require__(__webpack_module_template_argument_2__);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(__webpack_module_template_argument_0__)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	var toInteger = __webpack_require__(__webpack_module_template_argument_0__)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	var shared = __webpack_require__(__webpack_module_template_argument_0__)('keys')
	  , uid    = __webpack_require__(__webpack_module_template_argument_1__);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	var global = __webpack_require__(__webpack_module_template_argument_0__)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(__webpack_module_template_argument_0__);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	var dP         = __webpack_require__(__webpack_module_template_argument_0__)
	  , createDesc = __webpack_require__(__webpack_module_template_argument_1__);
	module.exports = __webpack_require__(__webpack_module_template_argument_2__) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__) {

	var anObject       = __webpack_require__(__webpack_module_template_argument_0__)
	  , IE8_DOM_DEFINE = __webpack_require__(__webpack_module_template_argument_1__)
	  , toPrimitive    = __webpack_require__(__webpack_module_template_argument_2__)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(__webpack_module_template_argument_3__) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	var isObject = __webpack_require__(__webpack_module_template_argument_0__);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	module.exports = !__webpack_require__(__webpack_module_template_argument_0__) && !__webpack_require__(__webpack_module_template_argument_1__)(function(){
	  return Object.defineProperty(__webpack_require__(__webpack_module_template_argument_2__)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(__webpack_module_template_argument_0__)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	var isObject = __webpack_require__(__webpack_module_template_argument_0__)
	  , document = __webpack_require__(__webpack_module_template_argument_1__).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(__webpack_module_template_argument_0__);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(__webpack_module_template_argument_0__)
	  , toObject    = __webpack_require__(__webpack_module_template_argument_1__)
	  , IE_PROTO    = __webpack_require__(__webpack_module_template_argument_2__)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__, __webpack_module_template_argument_5__, __webpack_module_template_argument_6__, __webpack_module_template_argument_7__, __webpack_module_template_argument_8__, __webpack_module_template_argument_9__) {

	'use strict';
	var LIBRARY        = __webpack_require__(__webpack_module_template_argument_0__)
	  , $export        = __webpack_require__(__webpack_module_template_argument_1__)
	  , redefine       = __webpack_require__(__webpack_module_template_argument_2__)
	  , hide           = __webpack_require__(__webpack_module_template_argument_3__)
	  , has            = __webpack_require__(__webpack_module_template_argument_4__)
	  , Iterators      = __webpack_require__(__webpack_module_template_argument_5__)
	  , $iterCreate    = __webpack_require__(__webpack_module_template_argument_6__)
	  , setToStringTag = __webpack_require__(__webpack_module_template_argument_7__)
	  , getPrototypeOf = __webpack_require__(__webpack_module_template_argument_8__)
	  , ITERATOR       = __webpack_require__(__webpack_module_template_argument_9__)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__) {

	'use strict';
	var create         = __webpack_require__(__webpack_module_template_argument_0__)
	  , descriptor     = __webpack_require__(__webpack_module_template_argument_1__)
	  , setToStringTag = __webpack_require__(__webpack_module_template_argument_2__)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(__webpack_module_template_argument_3__)(IteratorPrototype, __webpack_require__(__webpack_module_template_argument_4__)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__, __webpack_module_template_argument_5__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(__webpack_module_template_argument_0__)
	  , dPs         = __webpack_require__(__webpack_module_template_argument_1__)
	  , enumBugKeys = __webpack_require__(__webpack_module_template_argument_2__)
	  , IE_PROTO    = __webpack_require__(__webpack_module_template_argument_3__)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(__webpack_module_template_argument_4__)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(__webpack_module_template_argument_5__).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__) {

	var dP       = __webpack_require__(__webpack_module_template_argument_0__)
	  , anObject = __webpack_require__(__webpack_module_template_argument_1__)
	  , getKeys  = __webpack_require__(__webpack_module_template_argument_2__);
	
	module.exports = __webpack_require__(__webpack_module_template_argument_3__) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	module.exports = __webpack_require__(__webpack_module_template_argument_0__).document && document.documentElement;

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	var def = __webpack_require__(__webpack_module_template_argument_0__).f
	  , has = __webpack_require__(__webpack_module_template_argument_1__)
	  , TAG = __webpack_require__(__webpack_module_template_argument_2__)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	var store      = __webpack_require__(__webpack_module_template_argument_0__)('wks')
	  , uid        = __webpack_require__(__webpack_module_template_argument_1__)
	  , Symbol     = __webpack_require__(__webpack_module_template_argument_2__).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__) {

	'use strict';
	var addToUnscopables = __webpack_require__(__webpack_module_template_argument_0__)
	  , step             = __webpack_require__(__webpack_module_template_argument_1__)
	  , Iterators        = __webpack_require__(__webpack_module_template_argument_2__)
	  , toIObject        = __webpack_require__(__webpack_module_template_argument_3__);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(__webpack_module_template_argument_4__)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	exports.f = __webpack_require__(__webpack_module_template_argument_0__);

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__) {

	__webpack_require__(__webpack_module_template_argument_0__);
	__webpack_require__(__webpack_module_template_argument_1__);
	__webpack_require__(__webpack_module_template_argument_2__);
	__webpack_require__(__webpack_module_template_argument_3__);
	module.exports = __webpack_require__(__webpack_module_template_argument_4__).Symbol;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__, __webpack_module_template_argument_5__, __webpack_module_template_argument_6__, __webpack_module_template_argument_7__, __webpack_module_template_argument_8__, __webpack_module_template_argument_9__, __webpack_module_template_argument_10__, __webpack_module_template_argument_11__, __webpack_module_template_argument_12__, __webpack_module_template_argument_13__, __webpack_module_template_argument_14__, __webpack_module_template_argument_15__, __webpack_module_template_argument_16__, __webpack_module_template_argument_17__, __webpack_module_template_argument_18__, __webpack_module_template_argument_19__, __webpack_module_template_argument_20__, __webpack_module_template_argument_21__, __webpack_module_template_argument_22__, __webpack_module_template_argument_23__, __webpack_module_template_argument_24__, __webpack_module_template_argument_25__, __webpack_module_template_argument_26__, __webpack_module_template_argument_27__, __webpack_module_template_argument_28__, __webpack_module_template_argument_29__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(__webpack_module_template_argument_0__)
	  , has            = __webpack_require__(__webpack_module_template_argument_1__)
	  , DESCRIPTORS    = __webpack_require__(__webpack_module_template_argument_2__)
	  , $export        = __webpack_require__(__webpack_module_template_argument_3__)
	  , redefine       = __webpack_require__(__webpack_module_template_argument_4__)
	  , META           = __webpack_require__(__webpack_module_template_argument_5__).KEY
	  , $fails         = __webpack_require__(__webpack_module_template_argument_6__)
	  , shared         = __webpack_require__(__webpack_module_template_argument_7__)
	  , setToStringTag = __webpack_require__(__webpack_module_template_argument_8__)
	  , uid            = __webpack_require__(__webpack_module_template_argument_9__)
	  , wks            = __webpack_require__(__webpack_module_template_argument_10__)
	  , wksExt         = __webpack_require__(__webpack_module_template_argument_11__)
	  , wksDefine      = __webpack_require__(__webpack_module_template_argument_12__)
	  , keyOf          = __webpack_require__(__webpack_module_template_argument_13__)
	  , enumKeys       = __webpack_require__(__webpack_module_template_argument_14__)
	  , isArray        = __webpack_require__(__webpack_module_template_argument_15__)
	  , anObject       = __webpack_require__(__webpack_module_template_argument_16__)
	  , toIObject      = __webpack_require__(__webpack_module_template_argument_17__)
	  , toPrimitive    = __webpack_require__(__webpack_module_template_argument_18__)
	  , createDesc     = __webpack_require__(__webpack_module_template_argument_19__)
	  , _create        = __webpack_require__(__webpack_module_template_argument_20__)
	  , gOPNExt        = __webpack_require__(__webpack_module_template_argument_21__)
	  , $GOPD          = __webpack_require__(__webpack_module_template_argument_22__)
	  , $DP            = __webpack_require__(__webpack_module_template_argument_23__)
	  , $keys          = __webpack_require__(__webpack_module_template_argument_24__)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(__webpack_module_template_argument_25__).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(__webpack_module_template_argument_26__).f  = $propertyIsEnumerable;
	  __webpack_require__(__webpack_module_template_argument_27__).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(__webpack_module_template_argument_28__)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(__webpack_module_template_argument_29__)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__) {

	var META     = __webpack_require__(__webpack_module_template_argument_0__)('meta')
	  , isObject = __webpack_require__(__webpack_module_template_argument_1__)
	  , has      = __webpack_require__(__webpack_module_template_argument_2__)
	  , setDesc  = __webpack_require__(__webpack_module_template_argument_3__).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(__webpack_module_template_argument_4__)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__) {

	var global         = __webpack_require__(__webpack_module_template_argument_0__)
	  , core           = __webpack_require__(__webpack_module_template_argument_1__)
	  , LIBRARY        = __webpack_require__(__webpack_module_template_argument_2__)
	  , wksExt         = __webpack_require__(__webpack_module_template_argument_3__)
	  , defineProperty = __webpack_require__(__webpack_module_template_argument_4__).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	var getKeys   = __webpack_require__(__webpack_module_template_argument_0__)
	  , toIObject = __webpack_require__(__webpack_module_template_argument_1__);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(__webpack_module_template_argument_0__)
	  , gOPS    = __webpack_require__(__webpack_module_template_argument_1__)
	  , pIE     = __webpack_require__(__webpack_module_template_argument_2__);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(__webpack_module_template_argument_0__);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(__webpack_module_template_argument_0__)
	  , gOPN      = __webpack_require__(__webpack_module_template_argument_1__).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(__webpack_module_template_argument_0__)
	  , hiddenKeys = __webpack_require__(__webpack_module_template_argument_1__).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__, __webpack_module_template_argument_2__, __webpack_module_template_argument_3__, __webpack_module_template_argument_4__, __webpack_module_template_argument_5__, __webpack_module_template_argument_6__) {

	var pIE            = __webpack_require__(__webpack_module_template_argument_0__)
	  , createDesc     = __webpack_require__(__webpack_module_template_argument_1__)
	  , toIObject      = __webpack_require__(__webpack_module_template_argument_2__)
	  , toPrimitive    = __webpack_require__(__webpack_module_template_argument_3__)
	  , has            = __webpack_require__(__webpack_module_template_argument_4__)
	  , IE8_DOM_DEFINE = __webpack_require__(__webpack_module_template_argument_5__)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(__webpack_module_template_argument_6__) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	__webpack_require__(__webpack_module_template_argument_0__)('asyncIterator');

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__) {

	__webpack_require__(__webpack_module_template_argument_0__)('observable');

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__, __webpack_module_template_argument_0__, __webpack_module_template_argument_1__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(__webpack_module_template_argument_0__)
	  , TAG = __webpack_require__(__webpack_module_template_argument_1__)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }
/******/ ])));
//# sourceMappingURL=named-kernel-manager.js.map