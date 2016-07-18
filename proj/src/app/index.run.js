(function() {
  'use strict';

  angular
    .module('proj')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
