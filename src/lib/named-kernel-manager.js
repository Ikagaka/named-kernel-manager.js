import mixin from './mixin';
import {RoutableComponent, RoutableComponentRoutes} from 'routable-component';
import {NamedKernelManagerGhostModule} from './named-kernel-manager-ghost-module';

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
   * boot named (emits boot event)
   * @param {string} namedId named id
   * @return {void}
   */
  async bootNamed(namedId) {
    this.emit('boot_named', namedId);
  }

  /**
   * close named (emits close event)
   * @param {string} namedId named id
   * @return {void}
   */
  async closeNamed(namedId) {
    this.emit('close_named', namedId);
  }

  /**
   * change named (emits change event)
   * @param {string} namedId named id
   * @return {void}
   */
  async changeNamed(oldNamedId, newNamedId) {
    this.emit('change_named', oldNamedId, newNamedId);
  }

  /**
   * close manager (emits close event)
   * @return {void}
   */
  async close() {
    this.emit('close');
  }

  /**
   * halt manager (emits halt event)
   * @return {void}
   */
  async halt() {
    this.emit('halt');
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
    this._namedKernels[namedId] = {kernel};
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
