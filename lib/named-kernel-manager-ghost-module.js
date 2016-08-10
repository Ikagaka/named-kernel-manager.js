/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamedKernelManagerGhostModule = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _shiorif = require('shiorif');

var _ghostKernel = require('ghost-kernel');

var _namedKernelManager = require('./named-kernel-manager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(namedId, profile, routes, controllers, GhostViewClass) {
        var kernel;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isKernelExists(namedId)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('ghost [' + namedId + '] already exists');

              case 2:
                _context.next = 4;
                return this._getGhostKernelAsProfile(namedId, profile, routes, controllers, GhostViewClass);

              case 4:
                kernel = _context.sent;

                this.registerKernel(namedId, kernel);
                return _context.abrupt('return', kernel);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadGhost(_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
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
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(namedId, profile) {
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
                return this.components.NanikaStorage.ghost_profile(namedId);

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

      function _get_ghost_profile(_x6, _x7) {
        return _ref2.apply(this, arguments);
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
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(namedId, profile, routes, controllers, GhostViewClass) {
        var _profile;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._get_ghost_profile(namedId, profile);

              case 2:
                _profile = _context3.sent;
                _context3.next = 5;
                return this._get_ghost_kernel(namedId, _profile.shell_name, _profile.balloon_name, routes, controllers, GhostViewClass);

              case 5:
                return _context3.abrupt('return', _context3.sent);

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _getGhostKernelAsProfile(_x8, _x9, _x10, _x11, _x12) {
        return _ref3.apply(this, arguments);
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
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(namedId, shellname, balloonname, routes, controllers, GhostViewClass) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', _promise2.default.all([this._get_ghost(namedId, this.components.NanikaStorage), this._get_shell(namedId, shellname, this.components.NanikaStorage, GhostViewClass), this._get_balloon(balloonname, this.components.NanikaStorage, GhostViewClass)]).then(function (_ref5) {
                  var _ref6 = (0, _slicedToArray3.default)(_ref5, 3);

                  var shiori = _ref6[0];
                  var shell = _ref6[1];
                  var balloon = _ref6[2];

                  var shiorif = new _shiorif.Shiorif(shiori);
                  var named = namedmanager.materialize2(shell, balloon);
                  return new _ghostKernel.GhostKernel({
                    Shiorif: shiorif,
                    Named: named,
                    NamedKernelManager: _this,
                    TimerEventSource: _this.components.TimerEventSource
                  }, routes, controllers);
                }));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _get_ghost_kernel(_x13, _x14, _x15, _x16, _x17, _x18) {
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
    key: '_canondirpath',
    value: function _canondirpath(dirpath) {
      var path_separator = dirpath.match(/[\\\/]/)[0];
      return dirpath.replace(new RegExp('\\' + path_separator + '?$'), path_separator);
    }

    /**
     * get ghost(shiori) instance
     * @param {string} namedId - named id
     * @return {Promise<Shiori>} ghost(shiori) instance
     */

  }, {
    key: '_get_ghost',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(namedId) {
        var dirpath, ghost;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.emit('ghost_load', namedId);
                dirpath = this._get_ghost_directory_path(namedId);
                _context5.next = 4;
                return this._load_ghost(this.components.NanikaStorage.backend.fs, dirpath);

              case 4:
                ghost = _context5.sent;

                this.emit('ghost_loaded', namedId);
                return _context5.abrupt('return', ghost);

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _get_ghost(_x19) {
        return _ref7.apply(this, arguments);
      }

      return _get_ghost;
    }()

    /**
     * get ghost directory path
     * @param {string} namedId - named id
     * @return {string} ghost directory path
     */

  }, {
    key: '_get_ghost_directory_path',
    value: function _get_ghost_directory_path(namedId) {
      return this._canondirpath(this.components.NanikaStorage.ghost_master_path(namedId));
    }

    /**
     * load ghost(shiori)
     * @param {NanikaDirectory} ghost directory contents
     * @return {Promise<Shiori>} ghost(shiori) instance
     */

  }, {
    key: '_load_ghost',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(fs, dirpath) {
        var shiori;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return ShioriLoader.detect_shiori(fs, dirpath);

              case 2:
                shiori = _context6.sent;
                _context6.next = 5;
                return shiori.load(dirpath);

              case 5:
                return _context6.abrupt('return', _context6.sent);

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _load_ghost(_x20, _x21) {
        return _ref8.apply(this, arguments);
      }

      return _load_ghost;
    }()

    /**
     * get shell instance
     * @param {string} namedId - named id
     * @param {string} shellname - shellname
     * @param {cuttlebone} [GhostViewClass] ghost view class
     * @return {Promise<Shell>} shell instance
     */

  }, {
    key: '_get_shell',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(namedId, shellname, GhostViewClass) {
        var directory, shell;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.emit('load_shell_files', namedId, shellname);
                _context7.next = 3;
                return this._get_shell_directory(namedId, shellname);

              case 3:
                directory = _context7.sent;

                this.emit('shell_load', namedId, shellname, directory);
                _context7.next = 7;
                return this._load_shell(directory, GhostViewClass);

              case 7:
                shell = _context7.sent;

                this.emit('shell_loaded', namedId, shellname, shell);
                return _context7.abrupt('return', shell);

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _get_shell(_x22, _x23, _x24) {
        return _ref9.apply(this, arguments);
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
      var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(namedId, shellname) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.components.NanikaStorage.shell(namedId, shellname);

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _get_shell_directory(_x25, _x26) {
        return _ref10.apply(this, arguments);
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
    key: '_load_shell',
    value: function _load_shell(directory) {
      var GhostViewClass = arguments.length <= 1 || arguments[1] === undefined ? this.GhostViewClass : arguments[1];

      var shell = new GhostViewClass.Shell(directory.asArrayBuffer());
      return shell.load();
    }

    /**
     * get balloon instance
     * @param {string} balloonname - balloonname
     * @param {cuttlebone} [GhostViewClass] ghost view class
     * @return {Promise<Balloon>} balloon instance
     */

  }, {
    key: '_get_balloon',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(balloonname, GhostViewClass) {
        var directory, balloon;
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.emit('load_balloon_files', balloonname);
                _context9.next = 3;
                return this._get_balloon_directory(balloonname);

              case 3:
                directory = _context9.sent;

                this.emit('balloon_load', balloonname, directory);
                _context9.next = 7;
                return this._load_balloon(directory, GhostViewClass);

              case 7:
                balloon = _context9.sent;

                this.emit('balloon_loaded', balloonname, shell);
                return _context9.abrupt('return', balloon);

              case 10:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _get_balloon(_x28, _x29) {
        return _ref11.apply(this, arguments);
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
      var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(balloonname) {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.components.NanikaStorage.balloon(balloonname);

              case 2:
                return _context10.abrupt('return', _context10.sent);

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _get_balloon_directory(_x30) {
        return _ref12.apply(this, arguments);
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
    key: '_load_balloon',
    value: function _load_balloon(directory) {
      var GhostViewClass = arguments.length <= 1 || arguments[1] === undefined ? this.GhostViewClass : arguments[1];

      var balloon = new GhostViewClass.Balloon(directory.asArrayBuffer());
      return balloon.load();
    }

    /**
     * install named
     * @param {Blob | URL | string} target install target resource (file, url or some)
     * @param {NamedKernel | string} [from] who handled the target? kernel or named id
     * @return {Promise}
     */

  }, {
    key: 'installNar',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(target) {
        var from = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var nanikaStorage, nar, dirpath, sakuraname, install_results, ghost_result, balloon_result, profile;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                nanikaStorage = this.components.NanikaStorage;

                this.emit('install_begin', target);
                nar = void 0;
                _context11.prev = 3;

                if (!(target instanceof Blob)) {
                  _context11.next = 10;
                  break;
                }

                _context11.next = 7;
                return NarLoader.loadFromBlob(target);

              case 7:
                nar = _context11.sent;
                _context11.next = 17;
                break;

              case 10:
                if (!(target instanceof URL || target instanceof String || typeof target === 'string')) {
                  _context11.next = 16;
                  break;
                }

                _context11.next = 13;
                return NarLoader.loadFromURL(target);

              case 13:
                nar = _context11.sent;
                _context11.next = 17;
                break;

              case 16:
                throw new Error('target is not Blob or URL : ' + (target.name || target));

              case 17:
                // TODO: typed error

                this.emit('install_nar_loaded', target, nar);
                dirpath = typeof from === 'string' || from instanceof String ? from : this.namedId(from);
                // TODO: fromの他形式対応

                sakuraname = nanikaStorage.ghost_descript(dirpath)['sakura.name'];
                _context11.next = 22;
                return nanikaStorage.install_nar(nar, dirpath, sakuraname);

              case 22:
                install_results = _context11.sent;

                if (install_results) {
                  _context11.next = 26;
                  break;
                }

                this.emit('install_not_accepted', target, nar);
                return _context11.abrupt('return');

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
                  _context11.next = 36;
                  break;
                }

                _context11.next = 31;
                return nanikaStorage.ghost_profile(ghost_result.directory);

              case 31:
                profile = _context11.sent;

                if (!profile.shellname) profile.shellname = 'master';
                if (!profile.balloonname) {
                  if (balloon_result) {
                    // 同梱バルーンを初期設定
                    profile.balloonname = balloon_result.directory;
                  } else {
                    profile.balloonname = 'origin'; // TODO: 設定を読む
                  }
                }
                _context11.next = 36;
                return nanikaStorage.ghost_profile(ghost_result.directory, profile);

              case 36:
                this.emit('install_succeed', target, nar);
                _context11.next = 43;
                break;

              case 39:
                _context11.prev = 39;
                _context11.t0 = _context11['catch'](3);

                this.emit('install_failure', _context11.t0);
                throw _context11.t0;

              case 43:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[3, 39]]);
      }));

      function installNar(_x32, _x33) {
        return _ref13.apply(this, arguments);
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
//# sourceMappingURL=named-kernel-manager-ghost-module.js.map
