'use strict';

app.factory('lableService',[
    '$http',
    'baseServiceUrl',
    'authenticationService',
    function ($http,baseServiceUrl,authenticationService) {
        var lableService = {};
        lableService.getLabels = function(filter){
            return $http({
                method: 'GET',
                url: baseServiceUrl + 'labels?filter=' + filter,
                headers: authenticationService.getHeaders()
            })
        };


        return lableService;
    }]);