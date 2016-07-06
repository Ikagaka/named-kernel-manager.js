/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamedKernelManager = exports.NamedKernelManagerControllers = exports.NamedKernelManagerRoutings = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var _routableComponent = require('routable-component');

var _namedKernelManagerGhostModule = require('./named-kernel-manager-ghost-module');

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
//# sourceMappingURL=named-kernel-manager.js.map
