angular.module('starter.services', [])
  .service('Sets', function ($resource) {
    return $resource('http://192.168.254.100:3000/api/imemosets/:id')
  })
