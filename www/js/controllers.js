angular.module('starter.controllers', ['ionic'])

  .controller('AppCtrl', function ($rootScope,
                                   $scope,
                                   $ionicModal,
                                   $timeout,
                                   $auth,
                                   $ionicLoading) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $rootScope.$on('auth:login-success', function (ev, user) {
      $scope.currentUser = angular.extend(user, $auth.retrieveData('auth_headers'));

    });

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };


    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);
      $ionicLoading.show({
        template: 'Logging in...'
      });
      $auth.submitLogin($scope.loginData)
        .then(function (resp) {
          // handle success response
          $ionicLoading.hide();
          $scope.closeLogin();
        })
        .catch(function (error) {
          $ionicLoading.hide();
          $scope.errorMessage = error;
        });
    };
    $scope.logout = function () {
      $auth.signOut();
      // redirectTo: '/'
    };
  })

  .controller('UserRegistrationsCtrl', ['$scope', '$location', '$auth', function ($rootScope,
                                                                                  $scope,
                                                                                  $ionicModal,
                                                                                  $timeout,
                                                                                  $auth,
                                                                                  $location,
                                                                                  $ionicLoading) {




    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.signUp = function () {
      $scope.modal.show();
    };

    $scope.closeSignUp = function () {
      $scope.modal.hide();
    };

    // Form data for the login modal
    $scope.registrationForm = {};

    $scope.registration = function () {
      $auth.submitRegistration($scope.registrationForm);
      console.log($scope.registrationForm);
      $scope.handleRegBtnClick = function () {
        $auth.submitRegistration($scope.registrationForm)
          .then(function () {
            $auth.submitLogin({
              email: $scope.registrationForm.email,
              password: $scope.registrationForm.password
            });
          });
      };
    };


  }])

  .controller('TestController', function ($scope) {
    $scope.gender = ['Male', 'Female']
    $scope.ageValues = {
      min: 20,
      max: 60,
      value: 20
    };
    $scope.distanceValues = {
      min: 1000,
      max: 3500,
      value: 1000
    };
    $scope.data = {};
    $scope.calculateCooper = function () {
      var person = new Person({
        gender: $scope.data.gender,
        age: $scope.data.age,
        distance: $scope.data.distance
      });
      person.assessCooper($scope.data.distance);
      $scope.person = person;
      console.log($scope.person)
    };
  })

  .controller('PerformanceCtrl', function ($scope, performaceData, $ionicLoading, $state, $ionicPopup) {
    $scope.saveData = function (person) {
      var data = {performance_data: {data: {message: person.cooperMessage, distance: person.distance}}};
      console.log('Data:' + person.cooperMessage + $scope.data.distance);

      $ionicLoading.show({
        template: 'Saving...'
      });
      console.log($scope.currentUser);
      performaceData.save(data, function (response) {
        $ionicLoading.hide();
        $scope.showAlert('Sucess', response.message);
      }, function (error) {
        $ionicLoading.hide();
        $scope.showAlert('Failure', error.statusText);
      })
    };
    $scope.showAlert = function (message, content) {
      var alertPopup = $ionicPopup.alert({
        title: message,
        template: content
      });
      alertPopup.then(function (res) {
        // Place some action here if needed...
      });
    };
    $scope.retrieveData = function () {
      $ionicLoading.show({
        template: 'Retrieving data...'
      });
      performaceData.query({}, function (response) {
        $state.go('app.data', {savedDataCollection: response.entries});
        $ionicLoading.hide();
      }, function (error) {
        $ionicLoading.hide();
        $scope.showAlert('Failure', error.statusText);
      })
    };
  })

  .controller('DataCtrl', function ($scope, $stateParams) {
    $scope.$on('$ionicView.enter', function () {
      $scope.savedDataCollection = $stateParams.savedDataCollection;
      $scope.labels = getLabels($scope.savedDataCollection);
      $scope.data = [];
      angular.forEach($scope.labels, function (label) {
        $scope.data.push(getCount($scope.savedDataCollection, label));
      });
      $scope.radardata = [$scope.data];
    });

    function getLabels(collection) {
      var uniqueLabels = [];
      for (i = 0; i < collection.length; i++) {
        if (collection[i].data.message && uniqueLabels.indexOf(collection[i].data.message) === -1) {
          uniqueLabels.push(collection[i].data.message);
        }
      }
      return uniqueLabels;
    }

    function getCount(arr, value) {
      var count = 0;
      angular.forEach(arr, function (entry) {
        count += entry.data.message == value ? 1 : 0;
      });
      return count;
    }
  })
