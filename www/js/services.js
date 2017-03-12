angular.module('starter.services', [])
  .service('Sets', function ($resource) {
    return $resource('http://192.168.0.23:3000/api/imemosets/:id')
  })
