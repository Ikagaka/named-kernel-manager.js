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

var _sakurascript = require('sakurascript');

var _namedKernelManager = require('./named-kernel-manager');

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
//# sourceMappingURL=named-kernel-manager-ghost-module.js.map
