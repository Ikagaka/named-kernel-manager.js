/* (C) 2016 Narazaka : Licensed under The MIT License - https://narazaka.net/license/MIT?2016 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NamedKernelManagerGhostModule = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shiorif = require('shiorif');

var _sakurascript = require('sakurascript');

var _namedKernelManager = require('./named-kernel-manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NamedKernelManagerGhostModule = exports.NamedKernelManagerGhostModule = function () {
  function NamedKernelManagerGhostModule() {
    _classCallCheck(this, NamedKernelManagerGhostModule);
  }

  _createClass(NamedKernelManagerGhostModule, [{
    key: 'load_ghost',


    /**
     * load ghost
     * @param {string} named_id - named id
     * @param {GhostProfile} [profile] - profile
     * @param {RoutableComponentRoutes} [routes] - ルーティング
     * @param {Hash<GhostKernelController>} [controllers] - コントローラ
     * @return {Promise<GhostKernel>} ghost kernel instance
     */
    value: function load_ghost(named_id, profile, routes, controllers) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.is_kernel_exists(named_id)) {
          return reject(new Error('ghost [' + named_id + '] already exists'));
        }

        var kernel = _this._get_ghost_kernel_as_profile(named_id, profile, routes, controllers);
        _this.register_kernel(named_id, kernel);
        resolve(kernel);
      });
    }
    // then kernel.start()

    /**
     * load ghost
     * @param {string} named_id - named id
     * @param {GhostProfile} [profile] - profile
     */

  }, {
    key: '_get_ghost_profile',
    value: function _get_ghost_profile(named_id, profile) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        return resolve(profile || _this2.storage.ghost_profile(named_id));
      });
    }

    /**
     * load ghost
     * @param {string} named_id - named id
     * @param {GhostProfile} [profile] - profile
     * @param {RoutableComponentRoutes} [routes] - ルーティング
     * @param {Hash<GhostKernelController>} [controllers] - コントローラ
     */

  }, {
    key: '_get_ghost_kernel_as_profile',
    value: function _get_ghost_kernel_as_profile(named_id, profile, routes, controllers) {
      var _this3 = this;

      return this._get_ghost_profile(named_id, profile).then(function (profile) {
        return _this3._get_ghost_kernel(named_id, profile.shell_name, profile.balloon_name, routes, controllers);
      });
    }

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
    value: function _get_ghost_kernel(named_id, shellname, balloonname, routes, controllers) {
      var _this4 = this;

      return Promise.all([this._get_ghost(named_id, storage), this._get_shell(named_id, shellname, storage), this._get_balloon(balloonname, storage)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3);

        var shiori = _ref2[0];
        var shell = _ref2[1];
        var balloon = _ref2[2];

        var shiorif = new _shiorif.Shiorif(shiori);
        var named = namedmanager.materialize2(shell, balloon);
        var ssp = new _sakurascript.SakuraScriptExecuter(named);
        return new GhostKernel({
          shiorif: shiorif,
          view: named,
          ssp: ssp,
          manager: _this4,
          time: _this4.time
        }, routes, controllers);
      });
    }

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
    value: function _get_ghost(named_id) {
      var _this5 = this;

      this.emit('ghost_load', named_id);
      var dirpath = _namedKernelManager.NamedKernelManager._get_ghost_directory_path(named_id);
      return _namedKernelManager.NamedKernelManager._load_ghost(storage.backend.fs, dirpath).then(function (ghost) {
        _this5.emit('ghost_loaded', named_id);
        return ghost;
      });
    }

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
    value: function _get_shell(named_id, shellname) {
      var _this6 = this;

      this.emit('load_shell_files', named_id, shellname);
      return this._get_shell_directory(named_id, shellname).then(function (directory) {
        _this6.emit('shell_load', named_id, shellname, directory);
        return _namedKernelManager.NamedKernelManager._load_shell(directory);
      }).then(function (shell) {
        _this6.emit('shell_loaded', named_id, shellname, shell);
        return shell;
      });
    }

    /**
     * get shell directory contents
     * @param {string} named_id - named id
     * @param {string} shellname - shellname
     * @return {Promise<NanikaDirectory>} shell directory contents
     */

  }, {
    key: '_get_shell_directory',
    value: function _get_shell_directory(named_id, shellname) {
      return this.storage.shell(named_id, shellname);
    }

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
    value: function _get_balloon(balloonname) {
      var _this7 = this;

      this.emit('load_balloon_files', balloonname);
      return this._get_balloon_directory(balloonname).then(function (directory) {
        _this7.emit('balloon_load', balloonname, directory);
        return _namedKernelManager.NamedKernelManager._load_balloon(directory);
      }).then(function (balloon) {
        _this7.emit('balloon_loaded', balloonname, shell);
        return balloon;
      });
    }

    /**
     * get balloon directory contents
     * @param {string} balloonname - balloonname
     * @return {Promise<NanikaDirectory>} balloon directory contents
     */

  }, {
    key: '_get_balloon_directory',
    value: function _get_balloon_directory(balloonname) {
      return this.storage.balloon(balloonname);
    }

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
    value: function _load_ghost(fs, dirpath) {
      return ShioriLoader.detect_shiori(fs, dirpath).then(function (shiori) {
        return shiori.load(dirpath);
      });
    }
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
