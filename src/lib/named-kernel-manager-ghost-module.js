import {Shiorif} from 'shiorif';
import {GhostKernel} from 'ghost-kernel';
import {NamedKernelManager} from './named-kernel-manager';

export class NamedKernelManagerGhostModule {
  /**
   * デフォルトのゴーストのビュークラス
   * @type {cuttlebone}
   */
  static get GhostViewClass() { return NamedKernelManager._GhostViewClass; }

  /**
   * デフォルトのゴーストのビュークラス
   * @type {cuttlebone}
   */
  static set GhostViewClass(value) { NamedKernelManager._GhostViewClass = value; }

  /**
   * ゴーストのビュークラス
   * @type {cuttlebone}
   */
  get GhostViewClass() { return this._GhostViewClass || NamedKernelManager._GhostViewClass; }

  /**
   * ゴーストのビュークラス
   * @type {cuttlebone}
   */
  set GhostViewClass(value) { this._GhostViewClass = value; }

  /**
   * load ghost
   * @param {string} namedId - named id
   * @param {GhostProfile} [profile] - profile
   * @param {RoutableComponentRoutes} [routes] - ルーティング
   * @param {Hash<GhostKernelController>} [controllers] - コントローラ
   * @param {cuttlebone} [GhostViewClass] ghost view class
   * @return {Promise<GhostKernel>} ghost kernel instance
   */
  async loadGhost(namedId, profile, routes, controllers, GhostViewClass) {
    if (this.isKernelExists(namedId)) {
      throw new Error(`ghost [${namedId}] already exists`);
    }

    const kernel = await this._getGhostKernelAsProfile(namedId, profile, routes, controllers, GhostViewClass);
    this.registerKernel(namedId, kernel);
    return kernel;
  }

  /**
   * load ghost
   * @param {string} namedId - named id
   * @param {GhostProfile} [profile] - profile
   */
  async _get_ghost_profile(namedId, profile) {
    return profile || await this.components.NanikaStorage.ghost_profile(namedId);
  }

  /**
   * load ghost
   * @param {string} namedId - named id
   * @param {GhostProfile} [profile] - profile
   * @param {RoutableComponentRoutes} [routes] - ルーティング
   * @param {Hash<GhostKernelController>} [controllers] - コントローラ
   * @param {cuttlebone} [GhostViewClass] ghost view class
   */
  async _getGhostKernelAsProfile(namedId, profile, routes, controllers, GhostViewClass) {
    const _profile = await this._get_ghost_profile(namedId, profile);
    return await this._get_ghost_kernel(namedId, _profile.shellname, _profile.balloonname, routes, controllers, GhostViewClass);
  }

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
  async _get_ghost_kernel(namedId, shellname, balloonname, routes, controllers, GhostViewClass) {
    return Promise.all([
      this._get_ghost(namedId),
      this._get_shell(namedId, shellname, GhostViewClass),
      this._get_balloon(balloonname, GhostViewClass),
    ]).then(
      ([shiori, shell, balloon]) => {
        const shiorif = new Shiorif(shiori);
        const named = this.components.NamedManager.materialize2(shell, balloon);
        return new GhostKernel({
          Shiorif: shiorif,
          Named: named,
          NanikaStorage: this.components.NanikaStorage,
          NamedKernelManager: this,
          TimerEventSource: this.components.TimerEventSource,
        }, routes, controllers);
      }
    )
  }

  /**
   * ensure path separator at dirpath' end
   * @param {string} dirpath - dirpath
   * @return {string} dirpath that ends with path separator
   */
  _canondirpath(dirpath) {
    const path_separator = dirpath.match(/[\\\/]/)[0];
    return dirpath.replace(
      new RegExp('\\' + path_separator + '?$'),
      path_separator
    );
  }

  /**
   * get ghost(shiori) instance
   * @param {string} namedId - named id
   * @return {Promise<Shiori>} ghost(shiori) instance
   */
  async _get_ghost(namedId) {
    this.emit('ghost_load', namedId);
    const dirpath = this._get_ghost_directory_path(namedId);
    const ghost = await this._load_ghost(this.components.NanikaStorage.backend.fs, dirpath);
    this.emit('ghost_loaded', namedId);
    return ghost;
  }

  /**
   * get ghost directory path
   * @param {string} namedId - named id
   * @return {string} ghost directory path
   */
  _get_ghost_directory_path(namedId) {
    return this._canondirpath(this.components.NanikaStorage.ghost_master_path(namedId));
  }

  /**
   * load ghost(shiori)
   * @param {NanikaDirectory} ghost directory contents
   * @return {Promise<Shiori>} ghost(shiori) instance
   */
  async _load_ghost(fs, dirpath) {
    const shiori = await ShioriLoader.detect_shiori(fs, dirpath);
    return await shiori.load(dirpath);
  }

  /**
   * get shell instance
   * @param {string} namedId - named id
   * @param {string} shellname - shellname
   * @param {cuttlebone} [GhostViewClass] ghost view class
   * @return {Promise<Shell>} shell instance
   */
  async _get_shell(namedId, shellname, GhostViewClass) {
    this.emit('load_shell_files', namedId, shellname);
    const directory = await this._get_shell_directory(namedId, shellname);
    this.emit('shell_load', namedId, shellname, directory);
    const shell = await this._load_shell(directory, GhostViewClass);
    this.emit('shell_loaded', namedId, shellname, shell);
    return shell;
  }

  /**
   * get shell directory contents
   * @param {string} namedId - named id
   * @param {string} shellname - shellname
   * @return {Promise<NanikaDirectory>} shell directory contents
   */
  async _get_shell_directory(namedId, shellname) {
    return await this.components.NanikaStorage.shell(namedId, shellname);
  }

  /**
   * load shell
   * @param {NanikaDirectory} shell directory contents
   * @param {cuttlebone} [GhostViewClass] ghost view class
   * @return {Promise<Shell>} shell instance
   */
  _load_shell(directory, GhostViewClass = this.GhostViewClass) {
    const shell = new GhostViewClass.Shell(directory.asArrayBuffer());
    return shell.load();
  }

  /**
   * get balloon instance
   * @param {string} balloonname - balloonname
   * @param {cuttlebone} [GhostViewClass] ghost view class
   * @return {Promise<Balloon>} balloon instance
   */
  async _get_balloon(balloonname, GhostViewClass) {
    this.emit('load_balloon_files', balloonname);
    const directory = await this._get_balloon_directory(balloonname);
    this.emit('balloon_load', balloonname, directory);
    const balloon = await this._load_balloon(directory, GhostViewClass);
    this.emit('balloon_loaded', balloonname, balloon);
    return balloon;
  }

  /**
   * get balloon directory contents
   * @param {string} balloonname - balloonname
   * @return {Promise<NanikaDirectory>} balloon directory contents
   */
  async _get_balloon_directory(balloonname) {
    return await this.components.NanikaStorage.balloon(balloonname);
  }

  /**
   * load balloon
   * @param {NanikaDirectory} balloon directory contents
   * @param {cuttlebone} [GhostViewClass] ghost view class
   * @return {Promise<Balloon>} balloon instance
   */
  _load_balloon(directory, GhostViewClass = this.GhostViewClass) {
    const balloon = new GhostViewClass.Balloon(directory.asArrayBuffer());
    return balloon.load();
  }

  /**
   * install named
   * @param {Blob | URL | string} target install target resource (file, url or some)
   * @param {NamedKernel | string} [from] who handled the target? kernel or named id
   * @return {Promise}
   */
  async installNar(target, from = null) {
    const nanikaStorage = this.components.NanikaStorage;
    this.emit('install_begin', target);
    let nar;
    try {
      if (target instanceof Blob) {
        nar = await NarLoader.loadFromBlob(target);
      } else if (target instanceof URL || target instanceof String || typeof target === 'string') {
        nar = await NarLoader.loadFromURL(target);
      } else {
        throw new Error(`target is not Blob or URL : ${target.name || target}`); // TODO: typed error
      }
      this.emit('install_nar_loaded', target, nar);
      let dirpath, sakuraname;
      if (from) { // from が指定された場合
        dirpath = typeof from === 'string' || from instanceof String ? from : this.namedId(from);
        // TODO: fromの他形式対応
        sakuraname = nanikaStorage.ghost_descript(dirpath)['sakura.name'];
      }
      const install_results = await nanikaStorage.install_nar(nar, dirpath, sakuraname);
      if (!install_results) {
        this.emit('install_not_accepted', target, nar);
        return;
      }
      let ghost_result, balloon_result;
      install_results.forEach((install_result) => {
        if (install_result.type === 'ghost') {
          ghost_result = install_result;
        } else if (install_result.type === 'balloon') {
          balloon_result = install_result;
        }
      });
      if (ghost_result) {
        // 初期profileを設定
        // TODO: vanish回数など
        const profile = await nanikaStorage.ghost_profile(ghost_result.directory);
        if (!profile.shellname) profile.shellname = 'master';
        if (!profile.balloonname) {
          if (balloon_result) {
            // 同梱バルーンを初期設定
            profile.balloonname = balloon_result.directory;
          } else {
            profile.balloonname = 'origin'; // TODO: 設定を読む
          }
        }
        await nanikaStorage.ghost_profile(ghost_result.directory, profile);
      }
      this.emit('install_succeed', target, nar);
    } catch (error) {
      this.emit('install_failure', error);
      throw error;
    }
  }
}
