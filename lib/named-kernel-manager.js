/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamedKernelManagerController = exports.NamedKernelManagerGhostModule = exports.NamedKernelManager = exports.NamedKernelManagerControllers = exports.NamedKernelManagerRoutings = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _shiorif = require('shiorif');

var _ghostKernel = require('ghost-kernel');

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

var NamedKernelManagerGhostModule = exports.NamedKernelManagerGhostModule = function () {
  function NamedKernelManagerGhostModule() {
    (0, _classCallCheck3.default)(this, NamedKernelManagerGhostModule);
  }

  (0, _createClass3.default)(NamedKernelManagerGhostModule, [{
    key: 'loadGhost',


    /**
     * load ghost
     * @param {string} namedId - named id
     * @param {GhostProfile} [profile] - profile
     * @param {RoutableComponentRoutes} [routes] - ルーティング
     * @param {Hash<GhostKernelController>} [controllers] - コントローラ
     * @param {cuttlebone} [GhostViewClass] ghost view class
     * @return {Promise<GhostKernel>} ghost kernel instance
     */
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(namedId, profile, routes, controllers, GhostViewClass) {
        var kernel;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.isKernelExists(namedId)) {
                  _context4.next = 2;
                  break;
                }

                throw new Error('ghost [' + namedId + '] already exists');

              case 2:
                _context4.next = 4;
                return this._getGhostKernelAsProfile(namedId, profile, routes, controllers, GhostViewClass);

              case 4:
                kernel = _context4.sent;

                this.registerKernel(namedId, kernel);
                return _context4.abrupt('return', kernel);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadGhost(_x5, _x6, _x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
      }

      return loadGhost;
    }()

    /**
     * load ghost
     * @param {string} namedId - named id
     * @param {GhostProfile} [profile] - profile
     */

  }, {
    key: '_get_ghost_profile',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(namedId, profile) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = profile;

                if (_context5.t0) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 4;
                return this.storage.ghost_profile(namedId);

              case 4:
                _context5.t0 = _context5.sent;

              case 5:
                return _context5.abrupt('return', _context5.t0);

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _get_ghost_profile(_x10, _x11) {
        return _ref5.apply(this, arguments);
      }

      return _get_ghost_profile;
    }()

    /**
     * load ghost
     * @param {string} namedId - named id
     * @param {GhostProfile} [profile] - profile
     * @param {RoutableComponentRoutes} [routes] - ルーティング
     * @param {Hash<GhostKernelController>} [controllers] - コントローラ
     * @param {cuttlebone} [GhostViewClass] ghost view class
     */

  }, {
    key: '_getGhostKernelAsProfile',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(namedId, profile, routes, controllers, GhostViewClass) {
        var _profile;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._get_ghost_profile(namedId, defaultProfile);

              case 2:
                _profile = _context6.sent;
                _context6.next = 5;
                return this._get_ghost_kernel(namedId, _profile.shell_name, _profile.balloon_name, routes, controllers, GhostViewClass);

              case 5:
                return _context6.abrupt('return', _context6.sent);

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _getGhostKernelAsProfile(_x12, _x13, _x14, _x15, _x16) {
        return _ref6.apply(this, arguments);
      }

      return _getGhostKernelAsProfile;
    }()

    /**
     * build ghost kernel
     * @param {string} namedId - named id
     * @param {string} shellname - shellname
     * @param {string} balloonname - balloonname
     * @param {RoutableComponentRoutes} [routes] - ルーティング
     * @param {Hash<GhostKernelController>} [controllers] - コントローラ
     * @param {cuttlebone} [GhostViewClass] ghost view class
     * @return {Promise<GhostKernel>} ghost kernel instance
     */

  }, {
    key: '_get_ghost_kernel',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(namedId, shellname, balloonname, routes, controllers, GhostViewClass) {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt('return', _promise2.default.all([this._get_ghost(namedId, storage), this._get_shell(namedId, shellname, storage, GhostViewClass), this._get_balloon(balloonname, storage, GhostViewClass)]).then(function (_ref8) {
                  var _ref9 = (0, _slicedToArray3.default)(_ref8, 3);

                  var shiori = _ref9[0];
                  var shell = _ref9[1];
                  var balloon = _ref9[2];

                  var shiorif = new _shiorif.Shiorif(shiori);
                  var named = namedmanager.materialize2(shell, balloon);
                  return new _ghostKernel.GhostKernel({
                    Shiorif: shiorif,
                    Named: named,
                    NamedKernelManager: _this3,
                    TimerEventSource: _this3.components.TimerEventSource
                  }, routes, controllers);
                }));

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _get_ghost_kernel(_x17, _x18, _x19, _x20, _x21, _x22) {
        return _ref7.apply(this, arguments);
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
     * @param {string} namedId - named id
     * @return {Promise<Shiori>} ghost(shiori) instance
     */
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(namedId) {
        var dirpath, ghost;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.emit('ghost_load', namedId);
                dirpath = NamedKernelManager._get_ghost_directory_path(namedId);
                _context8.next = 4;
                return NamedKernelManager._load_ghost(storage.backend.fs, dirpath);

              case 4:
                ghost = _context8.sent;

                this.emit('ghost_loaded', namedId);
                return _context8.abrupt('return', ghost);

              case 7:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _get_ghost(_x23) {
        return _ref10.apply(this, arguments);
      }

      return _get_ghost;
    }()

    /**
     * get ghost directory path
     * @param {string} namedId - named id
     * @return {string} ghost directory path
     */

  }, {
    key: '_get_shell',


    /**
     * get shell instance
     * @param {string} namedId - named id
     * @param {string} shellname - shellname
     * @param {cuttlebone} [GhostViewClass] ghost view class
     * @return {Promise<Shell>} shell instance
     */
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(namedId, shellname, GhostViewClass) {
        var directory, shell;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.emit('load_shell_files', namedId, shellname);
                _context9.next = 3;
                return this._get_shell_directory(namedId, shellname);

              case 3:
                directory = _context9.sent;

                this.emit('shell_load', namedId, shellname, directory);
                _context9.next = 7;
                return NamedKernelManager._load_shell(directory, GhostViewClass);

              case 7:
                shell = _context9.sent;

                this.emit('shell_loaded', namedId, shellname, shell);
                return _context9.abrupt('return', shell);

              case 10:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _get_shell(_x24, _x25, _x26) {
        return _ref11.apply(this, arguments);
      }

      return _get_shell;
    }()

    /**
     * get shell directory contents
     * @param {string} namedId - named id
     * @param {string} shellname - shellname
     * @return {Promise<NanikaDirectory>} shell directory contents
     */

  }, {
    key: '_get_shell_directory',
    value: function () {
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(namedId, shellname) {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.storage.shell(namedId, shellname);

              case 2:
                return _context10.abrupt('return', _context10.sent);

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _get_shell_directory(_x27, _x28) {
        return _ref12.apply(this, arguments);
      }

      return _get_shell_directory;
    }()

    /**
     * load shell
     * @param {NanikaDirectory} shell directory contents
     * @param {cuttlebone} [GhostViewClass] ghost view class
     * @return {Promise<Shell>} shell instance
     */

  }, {
    key: '_get_balloon',


    /**
     * get balloon instance
     * @param {string} balloonname - balloonname
     * @param {cuttlebone} [GhostViewClass] ghost view class
     * @return {Promise<Balloon>} balloon instance
     */
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(balloonname, GhostViewClass) {
        var directory, balloon;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.emit('load_balloon_files', balloonname);
                _context11.next = 3;
                return this._get_balloon_directory(balloonname);

              case 3:
                directory = _context11.sent;

                this.emit('balloon_load', balloonname, directory);
                _context11.next = 7;
                return NamedKernelManager._load_balloon(directory, GhostViewClass);

              case 7:
                balloon = _context11.sent;

                this.emit('balloon_loaded', balloonname, shell);
                return _context11.abrupt('return', balloon);

              case 10:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _get_balloon(_x29, _x30) {
        return _ref13.apply(this, arguments);
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
      var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(balloonname) {
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.storage.balloon(balloonname);

              case 2:
                return _context12.abrupt('return', _context12.sent);

              case 3:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _get_balloon_directory(_x31) {
        return _ref14.apply(this, arguments);
      }

      return _get_balloon_directory;
    }()

    /**
     * load balloon
     * @param {NanikaDirectory} balloon directory contents
     * @param {cuttlebone} [GhostViewClass] ghost view class
     * @return {Promise<Balloon>} balloon instance
     */

  }, {
    key: 'installNar',


    /**
     * install named
     * @param {Blob | URL | string} target install target resource (file, url or some)
     * @param {NamedKernel | string} [from] who handled the target? kernel or named id
     * @return {Promise}
     */
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13(target) {
        var from = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var nanikaStorage, nar, dirpath, sakuraname, install_results, ghost_result, balloon_result, profile;
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                nanikaStorage = this.components.NanikaStorage;

                this.emit('install_begin', target);
                nar = void 0;
                _context13.prev = 3;

                if (!(target instanceof Blob)) {
                  _context13.next = 10;
                  break;
                }

                _context13.next = 7;
                return NarLoader.loadFromBlob(target);

              case 7:
                nar = _context13.sent;
                _context13.next = 17;
                break;

              case 10:
                if (!(target instanceof URL || target instanceof String || typeof target === 'string')) {
                  _context13.next = 16;
                  break;
                }

                _context13.next = 13;
                return NarLoader.loadFromURL(target);

              case 13:
                nar = _context13.sent;
                _context13.next = 17;
                break;

              case 16:
                throw new Error('target is not Blob or URL : ' + (target.name || target));

              case 17:
                // TODO: typed error

                this.emit('install_nar_loaded', target, nar);
                dirpath = typeof from === 'string' || from instanceof String ? from : this.namedId(from);
                // TODO: fromの他形式対応

                sakuraname = nanikaStorage.ghost_descript(dirpath)['sakura.name'];
                _context13.next = 22;
                return nanikaStorage.install_nar(nar, dirpath, sakuraname);

              case 22:
                install_results = _context13.sent;

                if (install_results) {
                  _context13.next = 26;
                  break;
                }

                this.emit('install_not_accepted', target, nar);
                return _context13.abrupt('return');

              case 26:
                ghost_result = void 0, balloon_result = void 0;

                install_results.forEach(function (install_result) {
                  if (install_result.type === 'ghost') {
                    ghost_result = install_result;
                  } else if (install_result.type === 'balloon') {
                    balloon_result = install_result;
                  }
                });

                if (!ghost_result) {
                  _context13.next = 36;
                  break;
                }

                _context13.next = 31;
                return nanikaStorage.ghost_profile(ghost_result.directory);

              case 31:
                profile = _context13.sent;

                if (!profile.shellname) profile.shellname = 'master';
                if (!profile.balloonname) {
                  if (balloon_result) {
                    // 同梱バルーンを初期設定
                    profile.balloonname = balloon_result.directory;
                  } else {
                    profile.balloonname = 'origin'; // TODO: 設定を読む
                  }
                }
                _context13.next = 36;
                return nanikaStorage.ghost_profile(ghost_result.directory, profile);

              case 36:
                this.emit('install_succeed', target, nar);
                _context13.next = 43;
                break;

              case 39:
                _context13.prev = 39;
                _context13.t0 = _context13['catch'](3);

                this.emit('install_failure', _context13.t0);
                throw _context13.t0;

              case 43:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[3, 39]]);
      }));

      function installNar(_x32, _x33) {
        return _ref15.apply(this, arguments);
      }

      return installNar;
    }()
  }, {
    key: 'GhostViewClass',


    /**
     * ゴーストのビュークラス
     * @type {cuttlebone}
     */
    get: function get() {
      return this._GhostViewClass || NamedKernelManager._GhostViewClass;
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
    value: function _get_ghost_directory_path(namedId) {
      return NamedKernelManager._canondirpath(this.storage.ghost_master_path(namedId));
    }

    /**
     * load ghost(shiori)
     * @param {NanikaDirectory} ghost directory contents
     * @return {Promise<Shiori>} ghost(shiori) instance
     */

  }, {
    key: '_load_ghost',
    value: function () {
      var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14(fs, dirpath) {
        var shiori;
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return ShioriLoader.detect_shiori(fs, dirpath);

              case 2:
                shiori = _context14.sent;
                _context14.next = 5;
                return shiori.load(dirpath);

              case 5:
                return _context14.abrupt('return', _context14.sent);

              case 6:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function _load_ghost(_x35, _x36) {
        return _ref16.apply(this, arguments);
      }

      return _load_ghost;
    }()
  }, {
    key: '_load_shell',
    value: function _load_shell(directory) {
      var GhostViewClass = arguments.length <= 1 || arguments[1] === undefined ? this.GhostViewClass : arguments[1];

      var shell = new GhostViewClass.Shell(directory.asArrayBuffer());
      return shell.load();
    }
  }, {
    key: '_load_balloon',
    value: function _load_balloon(directory) {
      var GhostViewClass = arguments.length <= 1 || arguments[1] === undefined ? this.GhostViewClass : arguments[1];

      var balloon = new GhostViewClass.Balloon(directory.asArrayBuffer());
      return balloon.load();
    }
  }, {
    key: 'GhostViewClass',

    /**
     * デフォルトのゴーストのビュークラス
     * @type {cuttlebone}
     */
    get: function get() {
      return NamedKernelManager._GhostViewClass;
    }

    /**
     * デフォルトのゴーストのビュークラス
     * @type {cuttlebone}
     */
    ,
    set: function set(value) {
      NamedKernelManager._GhostViewClass = value;
    }
  }]);
  return NamedKernelManagerGhostModule;
}();

(0, _mixin2.default)(NamedKernelManager, NamedKernelManagerGhostModule);

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
