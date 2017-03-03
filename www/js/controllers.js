angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CoursesCtrl', function($scope, $localStorage) {
  $scope.courses = $localStorage.courses
})

.controller('SubjectsCtrl', function($scope, $stateParams, $localStorage) {
  var courses = $localStorage.courses
  $scope.courseName = $stateParams.courseName
  $scope.subjects = getCourse(courses, $scope.courseName).subjects || [];
})

.controller('SubjectCtrl', function($scope, $stateParams) {
  $scope.courseName = $stateParams.courseName
  $scope.subjectName = $stateParams.subjectName
})

.controller('ReviewCtrl', function($scope, $stateParams, $localStorage) {
  var courses = $localStorage.courses
  var courseName = $scope.courseName = $stateParams.courseName
  var subjectName = $scope.subjectName = $stateParams.subjectName

  $scope.reviewInProgress = true
  $scope.questionNumber = 0
  $scope.showAnswer = false
  $scope.questions = shuffle(getQuestions(courses, courseName, subjectName))

  $scope.setShowAnswer = function(show) {
    $scope.showAnswer = show
  }

  $scope.nextQuestion = function() {
    $scope.questionNumber < $scope.questions.length - 1
      ? $scope.questionNumber += 1
      : $scope.reviewInProgress = false

    $scope.setShowAnswer(false)
  }
})

.controller('QuizCtrl', function($scope, $stateParams, $interval, $localStorage) {
  var courses = $localStorage.courses
  var courseName = $scope.courseName = $stateParams.courseName
  var subjectName = $scope.subjectName = $stateParams.subjectName

  $scope.quizInProgress = true
  $scope.fullDetailsMode = false
  $scope.questionNumber = 0
  $scope.questions = shuffle(getQuestions(courses, courseName, subjectName))
  $scope.score = 0
  $scope.timer = 20
  $scope.choice = {
    key: ''
  }

  var timer = $interval(function() {
    if ($scope.timer > 0) {
      $scope.timer -= 1
    } else {
      $scope.nextQuestion(true)
    }
  }, 1000);

  $scope.nextQuestion = function(skip) {
    if (skip !== true && $scope.choice.key === '') {
      return
    }
    if ($scope.choice.key.toLowerCase() === $scope.questions[$scope.questionNumber].answer.toLowerCase()) {
      $scope.score += 1;
    }
    $scope.questions[$scope.questionNumber].userAnswer = $scope.choice.key
    $scope.questionNumber < $scope.questions.length - 1
      ? $scope.questionNumber += 1
      : $scope.endQuiz()
    $scope.choice.key = ''
    $scope.timer = 21
  }

  $scope.endQuiz = function() {
    $scope.quizInProgress = false
    $interval.cancel(timer);
  }

  $scope.showFullDetails = function() {
    $scope.fullDetailsMode = true
  }

  $scope.$on('$destroy', function() {
    $interval.cancel(timer);
  });
});

function getCourse(courses, acronym) {
  return courses.find(function(course) {
    return course.acronym === acronym;
  });
}

function getQuestions(courses, courseName, subjectName) {
  var subject = getCourse(courses, courseName).subjects;
  var questions = subject.find(function(_subject) {
    return _subject.name === subjectName
  }).questions

  return angular.copy(questions) || []
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
