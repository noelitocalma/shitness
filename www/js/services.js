angular.module('starter.services', [])
  .factory('Sets', function ($resource) {
    return $resource('http://imemoapi2.us-1.evennode.com/api/imemosets/:id')
  })
