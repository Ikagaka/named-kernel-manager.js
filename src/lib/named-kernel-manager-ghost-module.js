import {Shiorif} from 'shiorif';
import {SakuraScriptExecuter} from 'sakurascript';
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
   * @param {string} named_id - named id
   * @param {GhostProfile} [profile] - profile
   * @param {RoutableComponentRoutes} [routes] - ルーティング
   * @param {Hash<GhostKernelController>} [controllers] - コントローラ
   * @return {Promise<GhostKernel>} ghost kernel instance
   */
  async load_ghost(named_id, profile, routes, controllers) {
    if (this.is_kernel_exists(named_id)) {
      throw new Error(`ghost [${named_id}] already exists`);
    }

    const kernel = await this._get_ghost_kernel_as_profile(named_id, profile, routes, controllers);
    this.register_kernel(named_id, kernel);
    return kernel;
  }
  // then kernel.start()

  /**
   * load ghost
   * @param {string} named_id - named id
   * @param {GhostProfile} [profile] - profile
   */
  async _get_ghost_profile(named_id, profile) {
    return profile || await this.storage.ghost_profile(named_id);
  }

  /**
   * load ghost
   * @param {string} named_id - named id
   * @param {GhostProfile} [default_profile] - profile
   * @param {RoutableComponentRoutes} [routes] - ルーティング
   * @param {Hash<GhostKernelController>} [controllers] - コントローラ
   */
  async _get_ghost_kernel_as_profile(named_id, default_profile, routes, controllers) {
    const profile = await this._get_ghost_profile(named_id, default_profile);
    return await this._get_ghost_kernel(named_id, profile.shell_name, profile.balloon_name, routes, controllers);
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
  async _get_ghost_kernel(named_id, shellname, balloonname, routes, controllers) {
    return Promise.all([
      this._get_ghost(named_id, storage),
      this._get_shell(named_id, shellname, storage),
      this._get_balloon(balloonname, storage),
    ]).then(
      ([shiori, shell, balloon]) => {
        const shiorif = new Shiorif(shiori);
        const named = namedmanager.materialize2(shell, balloon);
        const ssp = new SakuraScriptExecuter(named);
        return new GhostKernel({
          shiorif,
          view: named,
          ssp,
          manager: this,
          time: this.time
        }, routes, controllers);
      }
    )
  }

  /**
   * ensure path separator at dirpath' end
   * @param {string} dirpath - dirpath
   * @return {string} dirpath that ends with path separator
   */
  static _canondirpath(dirpath) {
    const path_separator = dirpath.match(/[\\\/]/)[0];
    return dirpath.replace(
      new RegExp('\\' + path_separator + '?$'),
      path_separator
    );
  }

  /**
   * get ghost(shiori) instance
   * @param {string} named_id - named id
   * @return {Promise<Shiori>} ghost(shiori) instance
   */
  async _get_ghost(named_id) {
    this.emit('ghost_load', named_id);
    const dirpath = NamedKernelManager._get_ghost_directory_path(named_id);
    const ghost = await NamedKernelManager._load_ghost(storage.backend.fs, dirpath);
    this.emit('ghost_loaded', named_id);
    return ghost;
  }

  /**
   * get ghost directory path
   * @param {string} named_id - named id
   * @return {string} ghost directory path
   */
  static _get_ghost_directory_path(named_id) {
    return NamedKernelManager._canondirpath(this.storage.ghost_master_path(named_id));
  }

  /**
   * load ghost(shiori)
   * @param {NanikaDirectory} ghost directory contents
   * @return {Promise<Shiori>} ghost(shiori) instance
   */
  static async _load_ghost(fs, dirpath) {
    const shiori = await ShioriLoader.detect_shiori(fs, dirpath);
    return await shiori.load(dirpath);
  }

  /**
   * get shell instance
   * @param {string} named_id - named id
   * @param {string} shellname - shellname
   * @return {Promise<Shell>} shell instance
   */
  async _get_shell(named_id, shellname) {
    this.emit('load_shell_files', named_id, shellname);
    const directory = await this._get_shell_directory(named_id, shellname);
    this.emit('shell_load', named_id, shellname, directory);
    const shell = await NamedKernelManager._load_shell(directory);
    this.emit('shell_loaded', named_id, shellname, shell);
    return shell;
  }

  /**
   * get shell directory contents
   * @param {string} named_id - named id
   * @param {string} shellname - shellname
   * @return {Promise<NanikaDirectory>} shell directory contents
   */
  async _get_shell_directory(named_id, shellname) {
    return await this.storage.shell(named_id, shellname);
  }

  /**
   * load shell
   * @param {NanikaDirectory} shell directory contents
   * @return {Promise<Shell>} shell instance
   */
  static _load_shell(directory) {
    const shell = new this.GhostViewClass.Shell(directory.asArrayBuffer());
    return shell.load();
  }

  /**
   * get balloon instance
   * @param {string} balloonname - balloonname
   * @return {Promise<Balloon>} balloon instance
   */
  async _get_balloon(balloonname) {
    this.emit('load_balloon_files', balloonname);
    const directory = await this._get_balloon_directory(balloonname);
    this.emit('balloon_load', balloonname, directory);
    const balloon = await NamedKernelManager._load_balloon(directory);
    this.emit('balloon_loaded', balloonname, shell);
    return balloon;
  }

  /**
   * get balloon directory contents
   * @param {string} balloonname - balloonname
   * @return {Promise<NanikaDirectory>} balloon directory contents
   */
  async _get_balloon_directory(balloonname) {
    return await this.storage.balloon(balloonname);
  }

  /**
   * load balloon
   * @param {NanikaDirectory} balloon directory contents
   * @return {Promise<Balloon>} balloon instance
   */
  static _load_balloon(directory) {
    const balloon = new this.GhostViewClass.Balloon(directory.asArrayBuffer());
    return balloon.load();
  }
}
