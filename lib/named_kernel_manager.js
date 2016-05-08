/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamedKernelManager = exports.NamedKernelManagerControllers = exports.NamedKernelManagerRoutings = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _routableComponent = require('routable-component');

var _namedKernelManagerGhostModule = require('./named-kernel-manager-ghost-module');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('power-assert');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits(NamedKernelManager, _RoutableComponent);

  /**
   * constructor
   * @param {Object} event_source - Event source
   * @param {NanikaStorage} event_source.storage - storage
   * @param {NamedManager} event_source.named_manager - named manager
   * @param {TimerEventSource} event_source.time - Timer event source
   * @param {RoutableComponentRoutes} [routes] - ルーティング
   * @param {Hash<NamedKernelManagerController>} [controllers] - コントローラ
   */

  function NamedKernelManager(_ref) {
    var storage = _ref.storage;
    var named_manager = _ref.named_manager;
    var time = _ref.time;
    var routes = arguments.length <= 1 || arguments[1] === undefined ? new _routableComponent.RoutableComponentRoutes(NamedKernelManagerRoutings) : arguments[1];
    var controllers = arguments.length <= 2 || arguments[2] === undefined ? NamedKernelManagerControllers : arguments[2];
    assert((typeof event_source === 'undefined' ? 'undefined' : _typeof(event_source)) === "object", 'typeof event_source === "object"');
    assert(typeof NanikaStorage === "undefined" || event_source.storage instanceof NanikaStorage, '(typeof NanikaStorage === "undefined" || event_source.storage instanceof NanikaStorage)');
    assert(typeof NamedManager === "undefined" || event_source.named_manager instanceof NamedManager, '(typeof NamedManager === "undefined" || event_source.named_manager instanceof NamedManager)');
    assert(typeof TimerEventSource === "undefined" || event_source.time instanceof TimerEventSource, '(typeof TimerEventSource === "undefined" || event_source.time instanceof TimerEventSource)');

    _classCallCheck(this, NamedKernelManager);

    /** @type {NamedKernel[]} */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NamedKernelManager).call(this));

    _this._named_kernels = {};
    _this._named_id_by_kernels = {};

    _this._storage = storage;
    _this._named_manager = named_manager;

    _this._routes = routes;
    _this.routes.setup_to(_this, controllers);
    return _this;
  }

  /**
   * Storage
   * @type {NanikaStorage}
   */


  _createClass(NamedKernelManager, [{
    key: 'named_ids',


    /**
     * existing named ids
     * @return {Array<string>} named ids
     */
    value: function named_ids() {
      return Object.keys(this._named_kernels);
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

      return Object.keys(this._named_kernels).find(function (named_id) {
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
    key: 'storage',
    get: function get() {
      return this._storage;
    }

    /**
     * Named Manager
     * @type {NamedManager}
     */

  }, {
    key: 'named_manager',
    get: function get() {
      return this._named_manager;
    }
  }]);

  return NamedKernelManager;
}(_routableComponent.RoutableComponent);

mixin(NamedKernelManager, _namedKernelManagerGhostModule.NamedKernelManagerGhostModule);
//# sourceMappingURL=named_kernel_manager.js.map
