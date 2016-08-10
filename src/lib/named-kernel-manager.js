import mixin from './mixin';
import {RoutableComponent, RoutableComponentRoutes} from 'routable-component';

/**
 * ルーティング設定クラスのリスト
 * @type {RoutableComponentRouting[]}
 */
export const NamedKernelManagerRoutings = [];

/**
 * コントローラクラスの連想配列
 * @type {Hash<NamedKernelManagerController>}
 */
export const NamedKernelManagerControllers = {};

/** Ukagaka baseware named manager */
export class NamedKernelManager extends RoutableComponent {
  /**
   * constructor
   * @param {Object} components - Event source
   * @param {NanikaStorage} components.NanikaStorage - storage
   * @param {NamedManager} components.NamedManager - named manager
   * @param {TimerEventSource} components.TimerEventSource - Timer event source
   * @param {RoutableComponentRoutes} [routes] - ルーティング
   * @param {Hash<NamedKernelManagerController>} [controllers_classes] - コントローラ
   */
  constructor(components, routes = new RoutableComponentRoutes(NamedKernelManagerRoutings), controllerClasses = NamedKernelManagerControllers) {
    super(components, routes, controllerClasses);
    this.registerComponent('NamedKernelManager', this);

    /** @type {NamedKernel[]} */
    this._namedKernels = {};
  }

  /**
   * start manager (emits start event)
   * @return {void}
   */
  async start() {
    this.emit('start');
  }

  /**
   * close manager (emits close event)
   * @return {void}
   */
  async close() {
    this.emit('close');
  }

  profile(newProfile) {
    return this.components.NanikaStorage.base_profile(newProfile);
  }

  /**
   * existing named ids
   * @return {Array<string>} named ids
   */
  namedIds() {
    return Object.keys(this._namedKernels);
  }

  /**
   * named instance exists or not
   * @param {string} namedId - named id
   * @return {boolean} exists or not
   */
  isKernelExists(namedId) {
    // in や [] 等ではprototypeのものも認識するため
    return this._namedKernels.hasOwnProperty(namedId);
  }

  /**
   * named kernel instance
   * @param {string} namedId - named id
   * @return {NamedKernel} named instance
   */
  kernel(namedId) {
    return this.isKernelExists(namedId) ? this._namedKernels[namedId].kernel : null;
  }

  /**
   * find named id of a kernel
   * @param {NamedKernel} kernel - named kernel
   * @return {string} named id
   */
  namedId(kernel) {
    return Object.keys(this._namedKernels).find((namedId) => this.kernel(namedId) === kernel);
  }

  /**
   * register named kernel
   * @param {string} namedId - named id
   * @param {NamedKernel} kernel - kernel
   * @return {NamedKernel} kernel
   */
  registerKernel(namedId, kernel) {
    if (this.isKernelExists(namedId)) {
      throw new Error(`kernel [${namedId}] already exists`);
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
  unregisterKernel(namedId) {
    if (!this.isKernelExists(namedId)) {
      throw new Error(`kernel [${namedId}] not exists`);
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
  sendCommunication(fromId, toId, content) {
  }

  /**
   * send notice
   * @param {string} fromId - from named id
   * @param {string} toId - to named id
   * @param {any} content - communication content
   * @return {Promise<transactionlike>} transaction
   */
  sendNotice(fromId, toId, content) {
    // other close etc
  }

  /**
   * install named
   * @param {any} target install target resource (file, url or some)
   * @param {NamedKernel} from who handled the target?
   * @return {Promise<any>}
   */
  async installNamed(target, from) {
    // TODO: 他形式対応
    return await this.installNar(target, from);
  }
}

import {Shiorif} from 'shiorif';
import {GhostKernel} from 'ghost-kernel';

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
    return profile || await this.storage.ghost_profile(namedId);
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
    const _profile = await this._get_ghost_profile(namedId, defaultProfile);
    return await this._get_ghost_kernel(namedId, _profile.shell_name, _profile.balloon_name, routes, controllers, GhostViewClass);
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
      this._get_ghost(namedId, storage),
      this._get_shell(namedId, shellname, storage, GhostViewClass),
      this._get_balloon(balloonname, storage, GhostViewClass),
    ]).then(
      ([shiori, shell, balloon]) => {
        const shiorif = new Shiorif(shiori);
        const named = namedmanager.materialize2(shell, balloon);
        return new GhostKernel({
          Shiorif: shiorif,
          Named: named,
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
  static _canondirpath(dirpath) {
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
    const dirpath = NamedKernelManager._get_ghost_directory_path(namedId);
    const ghost = await NamedKernelManager._load_ghost(storage.backend.fs, dirpath);
    this.emit('ghost_loaded', namedId);
    return ghost;
  }

  /**
   * get ghost directory path
   * @param {string} namedId - named id
   * @return {string} ghost directory path
   */
  static _get_ghost_directory_path(namedId) {
    return NamedKernelManager._canondirpath(this.storage.ghost_master_path(namedId));
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
   * @param {string} namedId - named id
   * @param {string} shellname - shellname
   * @param {cuttlebone} [GhostViewClass] ghost view class
   * @return {Promise<Shell>} shell instance
   */
  async _get_shell(namedId, shellname, GhostViewClass) {
    this.emit('load_shell_files', namedId, shellname);
    const directory = await this._get_shell_directory(namedId, shellname);
    this.emit('shell_load', namedId, shellname, directory);
    const shell = await NamedKernelManager._load_shell(directory, GhostViewClass);
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
    return await this.storage.shell(namedId, shellname);
  }

  /**
   * load shell
   * @param {NanikaDirectory} shell directory contents
   * @param {cuttlebone} [GhostViewClass] ghost view class
   * @return {Promise<Shell>} shell instance
   */
  static _load_shell(directory, GhostViewClass = this.GhostViewClass) {
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
    const balloon = await NamedKernelManager._load_balloon(directory, GhostViewClass);
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
   * @param {cuttlebone} [GhostViewClass] ghost view class
   * @return {Promise<Balloon>} balloon instance
   */
  static _load_balloon(directory, GhostViewClass = this.GhostViewClass) {
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
      const dirpath = typeof from === 'string' || from instanceof String ? from : this.namedId(from);
      // TODO: fromの他形式対応
      const sakuraname = nanikaStorage.ghost_descript(dirpath)['sakura.name']
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

mixin(NamedKernelManager, NamedKernelManagerGhostModule);

/**
 * マネージャ用のコントローラ
 * @implements {RoutableComponentController}
 */
export class NamedKernelManagerController {
  /**
   * コンストラクタ
   * @param {NamedKernelManager} manager マネージャ
   */
  constructor(manager) {
    this._manager = manager;
  }

  /**
   * マネージャ
   * @type {NamedKernelManager}
   */
  get manager() { return this._manager; }
}
