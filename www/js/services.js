angular.module('starter.services', [])
  .service('Sets', function ($resource) {
    return $resource('http://imemoapi.eu-2.evennode.com/api/imemosets/:id')
  })
