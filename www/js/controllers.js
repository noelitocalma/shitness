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

.controller('CreateSetCtrl', function($scope, $localStorage, $ionicPopup) {
  var choiceKeys = 'abcdefghijklmnopqrstuvwxyz'

  $scope.set = {
    name: '',
    acronym: '',
    logo: '',
    questions: []
  }

  $scope.question = {
    newChoice: '',
    answerType: 'text',
    question: '',
    choices: [],
    answer: ''
  }

  $scope.addChoice = function() {
    if (!$scope.question.newChoice) {
      $scope.showValidationErrorAlert('Choice can\'t be empty')
      return
    }

    $scope.question.choices.push($scope.question.newChoice)
    $scope.question.newChoice = ''
  }

  $scope.deleteChoice = function (choice) {
    $scope.question.choices.splice(
      $scope.question.choices.indexOf(choice), 1
    )
  }

  $scope.addQuestion = function() {
    if (!$scope.question.answer || !$scope.question) {
      let content = !$scope.question.question
        ? 'Question can\'t be empty' : 'Answer can\'t be empty'
      $scope.showValidationErrorAlert(content)
      return
    }
    if ($scope.question.answerType === 'text') {
      delete $scope.question.choices
    } else if ($scope.question.answerType === 'choices') {
      if ($scope.question.choices.length < 2) {
        $scope.showValidationErrorAlert('Add atleast 2 choices')
        return
      }
      var choices = {}
      $scope.question.choices.forEach(function(choice, i) {
        choices[choiceKeys.charAt(i)] = choice
      })
      $scope.question.choices = choices
    }

    delete $scope.question.newChoice
    delete $scope.question.answerType

    $scope.set.questions.push($scope.question)

    $scope.question = {
      newChoice: '',
      answerType: 'text',
      question: '',
      choices: [],
      answer: ''
    }
  }

  $scope.deleteQuestion = function (question) {
    $scope.set.questions.splice(
      $scope.set.questions.indexOf(question), 1
    )
  }

  $scope.addSet = function() {
    if (!$scope.set.name || $scope.set.questions.length === 0) {
      let content = !$scope.set.name
        ? `Set name can't be empty` : `Add atleast 1 question`
      $scope.showValidationErrorAlert(content)
      return
    }
    var words = $scope.set.name.split(' ')
    var acronym = ''

    words.forEach(function(word) {
      acronym += word.charAt(0)
    })

    $scope.set.acronym = acronym.toUpperCase()
    $scope.set.id = Math.round(Math.random() * 100000)
    $localStorage.customSets.push(angular.copy($scope.set))

    $scope.set = {
      name: '',
      acronym: '',
      logo: '',
      questions: []
    }

    var onSetCreatedPopup = $ionicPopup.confirm({
      title: 'Set Created',
      cssClass: 'popup-success',
      template: 'Do you want to create another?',
      cancelText: 'No',
      cancelType: 'button-calm',
      okText: 'Yes',
      okType: 'button-balanced'
    });

    onSetCreatedPopup.then(function(res) {
      if(!res) {
        window.location.href = window.location.origin + '#/app/mysets'
      }
    });
  }

  $scope.showValidationErrorAlert = function(content) {
    var alertPopup = $ionicPopup.alert({
      title: 'Validation Error',
      cssClass: 'popup-assertive',
      template: content,
      okType: 'button-assertive'
    });
  };
})

.controller('MySetsCtrl', function($scope, $localStorage) {
  $scope.sets = $localStorage.customSets

  $scope.gotoLink = function (link) {
    window.location.href = window.location.origin + link
  }
})

.controller('SubjectsCtrl', function($scope, $stateParams, $localStorage) {
  var courses = $localStorage.courses
  $scope.courseName = $stateParams.courseName
  $scope.subjects = getCourse(courses, $scope.courseName).subjects || [];
})

.controller('SubjectCtrl', function($scope, $stateParams, $localStorage, $ionicPopup) {
  var courses = $stateParams.courseName !== 'custom'
    ? $localStorage.courses : $localStorage.customSets

  $scope.courseName = $stateParams.courseName
  $scope.subjectName = getCustomName($localStorage.customSets, $stateParams.subjectName) || $stateParams.subjectName

  if ($stateParams.courseName !== 'custom') {
    $scope.questions = getQuestions(courses, $scope.courseName, $scope.subjectName)
  } else {
    let sets = $localStorage.customSets[$localStorage.customSets.map((v) => v.id ).indexOf(parseInt($stateParams.subjectName))]
     $scope.questions = sets.questions
  }

  if ($scope.subjectName !== $stateParams.subjecName) {
    $scope.customId = $stateParams.subjectName
  }

  $scope.deleteSets = function (id) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Are you sure you want to delete this set?',
      cssClass: 'popup-assertive',
      cancelType: 'button-calm',
      okText: 'Delete',
      okType: 'button-assertive'
    });

    confirmPopup.then(function(res) {
      if(res) {
        let index = $localStorage.customSets.map((v) => v.id).indexOf(parseInt(id))
        let sets = $localStorage.customSets
        sets.splice(index, 1)
        window.location.href = window.location.origin + '#/app/mysets'
      }
    });
  }
})

.controller('ReviewCtrl', function($scope, $stateParams, $localStorage) {
  var courses = $localStorage.courses
  var courseName = $scope.courseName = $stateParams.courseName
  var subjectName = $scope.subjectName = $stateParams.subjectName

  if ($stateParams.courseName !== 'custom') {
    $scope.questions = shuffle(getQuestions(courses, courseName, subjectName))
  } else {
    $scope.questions = shuffle(getCustomQuestions($localStorage.customSets, $stateParams.subjectName))
  }

  $scope.reviewInProgress = true
  $scope.questionNumber = 0
  $scope.showAnswer = false

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

  if ($stateParams.courseName !== 'custom') {
    $scope.questions = shuffle(getQuestions(courses, courseName, subjectName))
  } else {
    $scope.questions = shuffle(getCustomQuestions($localStorage.customSets, $stateParams.subjectName))
  }

  $scope.quizInProgress = true
  $scope.fullDetailsMode = false
  $scope.questionNumber = 0
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

function getCustomName(sets, id) {
  var set = sets.find(function(set) {
    return set.id.toString() === id
  }) || {}

  return angular.copy(set.name) || undefined
}

function getCustomQuestions(sets, id) {
  var questions = sets.find(function(set) {
    return set.id.toString() === id
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
