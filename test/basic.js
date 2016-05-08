import {NamedKernelManager} from '../src/lib/named-kernel-manager';

import assert from 'power-assert';

/** @test {NamedKernelManager} */
describe('NamedKernelManager', function() {
  lazy('instance', function() { return new NamedKernelManager({}) });
  /** @test {NamedKernelManager#constructor} */
  context('constructor', function() {
    it('basic', function() { assert(this.instance instanceof NamedKernelManager) });
  });
});
