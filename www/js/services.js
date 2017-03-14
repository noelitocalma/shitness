angular.module('starter.services', [])
  .service('Sets', function ($resource) {
    return $resource('http://localhost:3000/api/imemosets/:id')
  })
