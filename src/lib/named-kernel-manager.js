import mixin from './mixin';
import {RoutableComponent, RoutableComponentRoutes} from 'routable-component';
import {NamedKernelManagerGhostModule} from './named-kernel-manager-ghost-module';

// shim
require('core-js/fn/array/iterator');
require('core-js/fn/symbol');
require('core-js/fn/reflect');

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
   * @param {Hash<NamedKernelManagerController>} [controllers] - コントローラ
   */
  constructor(components, routes = new RoutableComponentRoutes(NamedKernelManagerRoutings), controllers = NamedKernelManagerControllers) {
    super(components);
    this.components.NamedKernelManager = this;

    /** @type {NamedKernel[]} */
    this._named_kernels = {};

    this._routes = routes;
    this.routes.setup_to(this, controllers);
  }

  /**
   * Kernel event routes
   * @type {RoutableComponentRoutes}
   */
  get routes() { return this._routes; }

  /**
   * existing named ids
   * @return {Array<string>} named ids
   */
  named_ids() {
    return Object.keys(this._named_kernels);
  }

  /**
   * named instance exists or not
   * @param {string} named_id - named id
   * @return {boolean} exists or not
   */
  is_kernel_exists(named_id) {
    // in や [] 等ではprototypeのものも認識するため
    return this._named_kernels.hasOwnProperty(named_id);
  }

  /**
   * named kernel instance
   * @param {string} named_id - named id
   * @return {NamedKernel} named instance
   */
  kernel(named_id) {
    return this.is_kernel_exists(named_id) ? this._named_kernels[named_id].kernel : null;
  }

  /**
   * find named id of a kernel
   * @param {NamedKernel} kernel - named kernel
   * @return {string} named id
   */
  named_id(kernel) {
    return Object.keys(this._named_kernels).find((named_id) => this.kernel(named_id) === kernel);
  }

  /**
   * register named kernel
   * @param {string} named_id - named id
   * @param {NamedKernel} kernel - kernel
   * @return {NamedKernel} kernel
   */
  register_kernel(named_id, kernel) {
    if (this.is_kernel_exists(named_id)) {
      throw new Error(`kernel [${named_id}] already exists`);
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
  unregister_kernel(named_id) {
    if (!this.is_kernel_exists(named_id)) {
      throw new Error(`kernel [${named_id}] not exists`);
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
  send_communication(from_id, to_id, content) {
  }

  /**
   * send notice
   * @param {string} from_id - from named id
   * @param {string} to_id - to named id
   * @param {any} content - communication content
   * @return {Promise<transactionlike>} transaction
   */
  send_notice(from_id, to_id, content) {
    // other close etc
  }
}

mixin(NamedKernelManager, NamedKernelManagerGhostModule);
