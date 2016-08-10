/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamedKernelManagerController = exports.NamedKernelManager = exports.NamedKernelManagerControllers = exports.NamedKernelManagerRoutings = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
   * @param {Hash<NamedKernelManagerController>} [controllers_classes] - コントローラ
   */

  function NamedKernelManager(components) {
    var routes = arguments.length <= 1 || arguments[1] === undefined ? new _routableComponent.RoutableComponentRoutes(NamedKernelManagerRoutings) : arguments[1];
    var controllerClasses = arguments.length <= 2 || arguments[2] === undefined ? NamedKernelManagerControllers : arguments[2];
    (0, _classCallCheck3.default)(this, NamedKernelManager);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NamedKernelManager).call(this, components, routes, controllerClasses));

    _this.registerComponent('NamedKernelManager', _this);

    /** @type {NamedKernel[]} */
    _this._namedKernels = {};
    return _this;
  }

  /**
   * start manager (emits start event)
   * @return {void}
   */


  (0, _createClass3.default)(NamedKernelManager, [{
    key: 'start',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.emit('start');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()

    /**
     * close manager (emits close event)
     * @return {void}
     */

  }, {
    key: 'close',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.emit('close');

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function close() {
        return _ref2.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: 'profile',
    value: function profile(newProfile) {
      return this.components.NanikaStorage.base_profile(newProfile);
    }

    /**
     * existing named ids
     * @return {Array<string>} named ids
     */

  }, {
    key: 'namedIds',
    value: function namedIds() {
      return (0, _keys2.default)(this._namedKernels);
    }

    /**
     * named instance exists or not
     * @param {string} namedId - named id
     * @return {boolean} exists or not
     */

  }, {
    key: 'isKernelExists',
    value: function isKernelExists(namedId) {
      // in や [] 等ではprototypeのものも認識するため
      return this._namedKernels.hasOwnProperty(namedId);
    }

    /**
     * named kernel instance
     * @param {string} namedId - named id
     * @return {NamedKernel} named instance
     */

  }, {
    key: 'kernel',
    value: function kernel(namedId) {
      return this.isKernelExists(namedId) ? this._namedKernels[namedId].kernel : null;
    }

    /**
     * find named id of a kernel
     * @param {NamedKernel} kernel - named kernel
     * @return {string} named id
     */

  }, {
    key: 'namedId',
    value: function namedId(kernel) {
      var _this2 = this;

      return (0, _keys2.default)(this._namedKernels).find(function (namedId) {
        return _this2.kernel(namedId) === kernel;
      });
    }

    /**
     * register named kernel
     * @param {string} namedId - named id
     * @param {NamedKernel} kernel - kernel
     * @return {NamedKernel} kernel
     */

  }, {
    key: 'registerKernel',
    value: function registerKernel(namedId, kernel) {
      if (this.isKernelExists(namedId)) {
        throw new Error('kernel [' + namedId + '] already exists');
      }
      this._namedKernels[namedId] = kernel;
      this.emit('kernel_registered', namedId);
      return kernel;
    }

    /**
     * unregister named kernel
     * @param {string} namedId - named id
     * @return {void}
     */

  }, {
    key: 'unregisterKernel',
    value: function unregisterKernel(namedId) {
      if (!this.isKernelExists(namedId)) {
        throw new Error('kernel [' + namedId + '] not exists');
      }
      delete this._namedKernels[namedId];
      this.emit('kernel_unregistered', namedId);
    }

    /**
     * send communication
     * @param {string} fromId - from named id
     * @param {string} toId - to named id
     * @param {any} content - communication content
     * @return {Promise<transactionlike>} transaction
     */

  }, {
    key: 'sendCommunication',
    value: function sendCommunication(fromId, toId, content) {}

    /**
     * send notice
     * @param {string} fromId - from named id
     * @param {string} toId - to named id
     * @param {any} content - communication content
     * @return {Promise<transactionlike>} transaction
     */

  }, {
    key: 'sendNotice',
    value: function sendNotice(fromId, toId, content) {}
    // other close etc


    /**
     * install named
     * @param {any} target install target resource (file, url or some)
     * @param {NamedKernel} from who handled the target?
     * @return {Promise<any>}
     */

  }, {
    key: 'installNamed',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(target, from) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.installNar(target, from);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function installNamed(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return installNamed;
    }()
  }]);
  return NamedKernelManager;
}(_routableComponent.RoutableComponent);

(0, _mixin2.default)(NamedKernelManager, _namedKernelManagerGhostModule.NamedKernelManagerGhostModule);

/**
 * マネージャ用のコントローラ
 * @implements {RoutableComponentController}
 */

var NamedKernelManagerController = exports.NamedKernelManagerController = function () {
  /**
   * コンストラクタ
   * @param {NamedKernelManager} manager マネージャ
   */

  function NamedKernelManagerController(manager) {
    (0, _classCallCheck3.default)(this, NamedKernelManagerController);

    this._manager = manager;
  }

  /**
   * マネージャ
   * @type {NamedKernelManager}
   */


  (0, _createClass3.default)(NamedKernelManagerController, [{
    key: 'manager',
    get: function get() {
      return this._manager;
    }
  }]);
  return NamedKernelManagerController;
}();
//# sourceMappingURL=named-kernel-manager.js.map
