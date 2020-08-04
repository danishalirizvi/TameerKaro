(function () {
    'use strict';
    angular
        .module('app', [
            'app.customer',
            'app.vendor',
            'app.admin',
            'ui.router',
            'ngCookies',
            'ui.bootstrap'
        ]);
})();