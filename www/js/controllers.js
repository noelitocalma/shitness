angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

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

  $scope.slideOptions = {
    loop: true
  }

  $scope.username = $localStorage.iMemoUsername
})

.controller('CreateSetCtrl', function($scope, $state, $stateParams, $localStorage, $ionicPopup) {
  var choiceKeys = 'abcdefghijklmnopqrstuvwxyz'
  $scope.editMode = $state.current.name === 'app.editsets'
  let id = convertIndexOf($stateParams.id)
  let indexOfSet = !$scope.editMode ? null : $localStorage.customSets.map((v) => v.id).indexOf(id)

  if (!$scope.editMode) {
    $scope.set = {
      name: '',
      acronym: '',
      logo: '',
      questions: [],
      timer: ''
    }
  } else {
    $scope.set = angular.copy($localStorage.customSets[indexOfSet])
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

    if ($scope.question.choices.map((v) => v.toLowerCase())
      .indexOf($scope.question.newChoice.toLowerCase()) !== -1) {
      $scope.showValidationErrorAlert($scope.question.newChoice + ' is already added')
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
    if (!$scope.question.answer || !$scope.question.question) {
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

      var answer = $scope.question.choices.indexOf($scope.question.answer)
      var choices = {}

      if (answer === -1) {
        $scope.showValidationErrorAlert('Answer can\'t be empty')
        return
      }

      $scope.question.choices.forEach(function(choice, i) {
        choices[choiceKeys.charAt(i)] = choice
      })

      $scope.question.answer = choiceKeys.charAt($scope.question.choices.indexOf($scope.question.answer))
      $scope.question.choices = choices
    }

    delete $scope.question.newChoice
    delete $scope.question.answerType

    if (!$scope.editQuestionMode) {
      $scope.set.questions.push($scope.question)
    } else {
      $scope.set.questions[$scope.editCurrentQuestionIndex] = $scope.question
      $ionicPopup.alert({
        title: 'Question Updated',
        cssClass: 'popup-success',
        template: 'Question successfully updated',
        okType: 'button-balanced'
      });
    }

    $scope.question = {
      newChoice: '',
      answerType: 'text',
      question: '',
      choices: [],
      answer: ''
    }
    $scope.editQuestionMode = false
  }

  $scope.deleteQuestion = function (question) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Question',
      template: 'Are you sure you want to delete this question?',
      cssClass: 'popup-assertive',
      cancelType: 'button-calm',
      cancelText: 'No',
      okType: 'button-assertive',
      okText: 'Yes'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.set.questions.splice(
          $scope.set.questions.indexOf(question), 1
        )
        $ionicPopup.alert({
          title: 'Question Deleted',
          cssClass: 'popup-success',
          template: 'Question successfully deleted',
          okType: 'button-balanced'
        });
      }
    });
  }

  $scope.cancelEditQuestion = function () {
    $scope.editQuestionMode = false
    $scope.question = {
      newChoice: '',
      answerType: 'text',
      question: '',
      choices: [],
      answer: ''
    }
  }

  $scope.editQuestion = function (question) {
    $scope.editQuestionMode = true
    $scope.question = angular.copy(question)
    $scope.editCurrentQuestionIndex = $scope.set.questions.indexOf(question)

    if ($scope.question.hasOwnProperty('choices')) {
      let answerKey = angular.copy($scope.question.answer)
      let choices = angular.copy($scope.question.choices)
      $scope.question.answerType = 'choices'
      $scope.question.answer = choices[answerKey]
      $scope.question.choices = []
      Object.keys(choices).forEach(function(key) {
        $scope.question.choices.push(choices[key])
      })
    }
  }

  $scope.cancelEditSet = function () {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Cancel Edit',
      template: 'Are you sure you want to cancel editing this set?',
      cssClass: 'popup-assertive',
      cancelType: 'button-calm',
      cancelText: 'No',
      okType: 'button-assertive',
      okText: 'Yes'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $state.go('app.mysets')
      }
    });
  }

  $scope.addSet = function() {
    if (!$scope.set.name || $scope.set.questions.length === 0) {
      let content = !$scope.set.name
        ? `Set name can't be empty` : `Add atleast 1 question`
      $scope.showValidationErrorAlert(content)
      return
    } else if ($scope.set.timer && ($scope.set.timer < 5 || $scope.set.timer % 1 !== 0)) {
      $scope.showValidationErrorAlert('Timer should be a whole number and atleast 5 seconds')
      return
    }

    var words = $scope.set.name.split(' ')
    var acronym = ''

    words.forEach(function(word) {
      acronym += word.charAt(0)
    })

    if (!$scope.editMode) {
      $scope.set.acronym = acronym.toUpperCase()
      $scope.set.id = new Date().getTime()
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
        if(!res) $state.go('app.mysets')
      });
    } else {
      $localStorage.customSets[indexOfSet] = angular.copy($scope.set)
      var alertPopup = $ionicPopup.alert({
        title: 'Set Updated',
        cssClass: 'popup-success',
        template: 'Set successfully updated.',
        okType: 'button-balanced'
      });
      alertPopup.then(function(res) {
        if(res) {
          $state.go('app.subject', {
            type: 'custom',
            subjectName: $scope.set.id
          }, { reload: true })
        }
      });
    };
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

.controller('SettingsCtrl', function($scope, $state, $localStorage, $ionicPopup) {
  $scope.isUsernameSet = $localStorage.iMemoUsername !== undefined
  $scope.username = $localStorage.iMemoUsername
    ? angular.copy($localStorage.iMemoUsername) : ''
  // $scope.timer = $localStorage.iMemoTimer
  //  ? angular.copy($localStorage.iMemoTimer) : ''

  $scope.informUsername = function () {
    if (!$scope.isUsernameSet) return
    var alertPopup = $ionicPopup.alert({
      title: 'Username',
      cssClass: 'popup-assertive',
      template: 'Nickname cannot be changed.',
      okType: 'button-assertive'
    });
  }

  $scope.saveSettings = function (username) {
    if (!username) {
      var alertPopup = $ionicPopup.alert({
        title: 'Validation Error',
        cssClass: 'popup-assertive',
        template: 'Username can\'t be empty',
        okType: 'button-assertive'
      });
      return
    }

    // if (!timer) {
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Default Values',
    //     cssClass: 'popup-assertive',
    //     template: 'No value for timer. Default value of 20 seconds will be used.',
    //     okType: 'button-assertive'
    //   });
    // }
    //
    // if (timer && (timer < 10 || timer > 90)) {
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Validation Error',
    //     cssClass: 'popup-assertive',
    //     template: 'Allowed values for the timer is 10 to 90 seconds',
    //     okType: 'button-assertive'
    //   });
    //   return
    // }

    var alertPopup = $ionicPopup.alert({
      title: 'Settings Saved',
      cssClass: 'popup-success',
      template: 'Your settings was updated',
      okType: 'button-balanced'
    });

    $scope.isUsernameSet = true
    $localStorage.iMemoUsername = username
    // $localStorage.iMemoTimer = timer
  }
})

.controller('MySetsCtrl', function($scope, $state, $localStorage) {
  $scope.sets = $localStorage.customSets

  $scope.gotoLink = function (type, subject) {
    $state.go('app.subject', {
      type: type,
      subjectName: subject,
    })
  }
})

.controller('DownloadSetsCtrl', function($scope, $state, $localStorage, $ionicModal, $ionicPopup, Sets) {
  // gets all uploaded sets
  Sets.query(function (data) {
    $scope.sets = data
  })

  $scope.uploadedByUser = function (set) {
    if ($localStorage.customSets.length <= 0) return false
    let index = $localStorage.customSets.map((s) => s.id).indexOf(set.origId)
    return index > -1 ? true : false
  }

  $scope.downloadSet = function (id, origId) {
    let index = $localStorage.customSets.map((s) => s.id).indexOf(origId)
    let isUploadedByUser = $scope.uploadedByUser($scope.sets[$scope.sets.map((s) => s.origId).indexOf(origId)])

    if (isUploadedByUser) {
      $ionicPopup.alert({
        title: 'Download Error',
        cssClass: 'popup-assertive',
        template: 'You uploaded this set.',
        okType: 'button-assertive'
      }).then(function () {
        $scope.closeModal()
      })
    } else {
      if (index > -1) {
        $ionicPopup.alert({
          title: 'Download Confirm',
          cssClass: 'popup-assertive',
          template: 'You already have this set.',
          okType: 'button-assertive',
          okText: 'Close'
        }).then(function (res) {
          if (res) $scope.closeModal()
        })
      } else {
        Sets.get({id: id}, function (data) {
          let sets = $localStorage.customSets
          sets.push(JSON.parse(JSON.stringify(data)))
          $ionicPopup.confirm({
            title: 'Download Successful',
            cssClass: 'popup-success',
            template: 'Set downloaded successfully. Download more?',
            okType: 'button-balanced',
            okText: 'Yes',
            cancelText: 'No',
            cancelType: 'button-calm'
          }).then(function (res) {
            if (!res) {
              $scope.closeModal()
              $state.go('app.mysets')
            }
          })
        })
      }
    }
  }

  $ionicModal.fromTemplateUrl('download-set.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.viewSet =  function (set) {
    $scope.set = set
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('SubjectsCtrl', function($scope, $stateParams, $localStorage) {
  $scope.subjects = $localStorage.subjects
})

.controller('SubjectCtrl', function($scope, $state, $stateParams, $localStorage, $ionicPopup, Sets) {
  var subjects = $stateParams.type !== 'custom'
    ? $localStorage.subjects : $localStorage.customSets

  $scope.type = $stateParams.type === 'custom' ? $stateParams.type : 'default'
  $scope.subjectName = getCustomName($localStorage.customSets, $stateParams.subjectName) || $stateParams.subjectName

  if ($stateParams.type !== 'custom') {
    $scope.questions = getQuestions(subjects, $scope.subjectName)
  } else {
    let subjectName = convertIndexOf($stateParams.subjectName)
    let sets = $localStorage.customSets[$localStorage.customSets.map((v) => v.id ).indexOf(subjectName)]
    if (sets) {
      $scope.timer = sets.timer
      $scope.questions = sets.questions
    } else {
      window.location = '/#/app/mysets'
    }
  }

  if ($scope.subjectName !== $stateParams.subjecName) {
    $scope.customId = $stateParams.subjectName
  }

  $scope.uploadSets = function (id) {
    let _id = convertIndexOf(id)
    let index = $localStorage.customSets.map((v) => v.id).indexOf(_id)
    let set = $localStorage.customSets[index]

    if (!set.uploadedDate) {
      set.author = $localStorage.iMemoUsername
      set.uploadedDate = new Date()
      upload(set)
    } else {
      Sets.query(function (data) {
        if (!data) return
        $scope.uploadedSets = data

        if ($scope.uploadedSets.map((s) => s.id).indexOf(set.id) === -1 ) {
          upload(set)
        } else {
          $ionicPopup.confirm({
            title: 'Upload Error',
            cssClass: 'popup-assertive',
            template: 'You already uploaded this set. Do you want to upload it again?',
            okType: 'button-balanced',
            okText: 'Yes',
            cancelType: 'button-assertive',
            cancelText: 'No'
          }).then(function (res) {
            if (res) {
              upload(set)
            }
          })
        }
      })
    }

    function upload (set) {
      delete set.id
      Sets.save(set, function (data) {
        set.id = data.id
        $ionicPopup.alert({
          title: 'Upload Successfull',
          cssClass: 'popup-success',
          template: 'Your set was uploaded successfully.',
          okType: 'button-balanced'
        });
        window.location = '#/app/subjects/custom/' + set.id
      })
    }
  }

  $scope.editSets = function (id) {
    $state.go('app.editsets', { id: id })
  }

  $scope.deleteSets = function (id) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Set',
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
        $state.go('app.mysets')
      }
    });
  }
})

.controller('ReviewCtrl', function($scope, $ionicPopup, $stateParams, $localStorage) {
  $scope.calcData = {
    result: 0,
    func: ''
  };
  $scope.type = $stateParams.type
  var subjects = $localStorage.subjects
  var subjectName = $scope.subjectName = $stateParams.subjectName

  if ($stateParams.type !== 'custom') {
    $scope.questions = shuffle(getQuestions(subjects, subjectName))
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

  $scope.openCalculator = function () {
    openCalculator($ionicPopup)
  }
})

.controller('QuizCtrl', function($scope, $ionicPopup, $stateParams, $interval, $localStorage) {
  $scope.calcData = {
    result: 0,
    func: ''
  };
  $scope.type = $stateParams.type
  var subjects = $localStorage.subjects
  var subjectName = $scope.subjectName = $stateParams.subjectName
  var set = $localStorage.customSets[$localStorage.customSets.map((v) => v.id ).indexOf(convertIndexOf(subjectName))]

  if ($stateParams.type !== 'custom') {
    $scope.questions = shuffle(getQuestions(subjects, subjectName))
  } else {
    $scope.questions = shuffle(getCustomQuestions($localStorage.customSets, $stateParams.subjectName))
  }

  $scope.quizInProgress = true
  $scope.fullDetailsMode = false
  $scope.questionNumber = 0
  $scope.score = 0
  $scope.timer = set.timer >= 5 ? set.timer : 20
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
    $scope.timer = $localStorage.iMemoTimer || 20
  }

  $scope.endQuiz = function() {
    $scope.quizInProgress = false
    $interval.cancel(timer);
  }

  $scope.openCalculator = function () {
    openCalculator($ionicPopup)
  }

  $scope.showFullDetails = function() {
    $scope.fullDetailsMode = true
  }

  $scope.$on('$destroy', function() {
    $interval.cancel(timer);
  });
});

function convertIndexOf (index) {
  return /^[0-9]+$/.test(index) ? parseInt(index) : index
}

function getQuestions(subjects, subjectName) {
  var questions = subjects.find(function(_subject) {
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

function openCalculator ($ionicPopup) {
  var alertPopup = $ionicPopup.alert({
    title: 'Calculator',
    cssClass: 'popup-success popup-calc',
    template: '<div ez-calc="calcDatadata"></div>',
    okText: 'Close',
    okType: 'button-balanced'
  });
}
