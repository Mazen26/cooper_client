angular.module('starter.controllers', ['ionic'])

  .controller('AppCtrl', function ($rootScope,
                                   $scope,
                                   $ionicModal,
                                   $timeout,
                                   $auth,
                                   $window,
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
      $ionicLoading.show({
        template: 'Logging out...'
      });
      $auth.signOut()
        .then(function (resp) {
          $ionicLoading.hide();
          $window.location.href = '/';

        })
        .catch(function (resp) {
          // handle error response
          $ionicLoading.hide();
          $scope.errorMessage = error;
        });
    };
  })

  .controller('UserRegistrationsCtrl', function ($rootScope,
                                                 $scope,
                                                 $timeout,
                                                 $auth,
                                                 $location,
                                                 $window,
                                                 $ionicHistory,
                                                 $state,
                                                 $ionicLoading) {

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    // Form data for the login modal
    $scope.signUpData = {};

    $scope.doSignUp = function () {
      console.log('Signing Up', $scope.signUpData);
      $ionicLoading.show({
        template: 'Signing Up ...'
      });
        $auth.submitRegistration($scope.signUpData)
          .then(
          function(){
            var params = {email: $scope.signUpData.email, password: $scope.signUpData.password};
            $scope.doLogin(params);
            $state.go('app.test');
            $ionicLoading.hide();
          }
        ).catch(function(error){
          $scope.errorMessage = error;
          $ionicLoading.hide();

        });
      };

    $scope.doLogin = function(params){
      $auth.submitLogin(params).then(
        function(response){
          console.log(response);
        }
      ).catch(
        function(error){
          $scope.errorMessage = error;
          console.log(error);
        }
      );
    }
  })

  //     $auth.submitRegistration($scope.registrationForm);
  //     $auth.submitLogin({
  //         email: $scope.registrationForm.email,
  //         password: $scope.registrationForm.password
  //       })
  //
  //       .then(function (resp) {
  //         // handle success response
  //         $ionicLoading.hide();
  //         $window.location.href = '/templates/test/test.html';
  //       })
  //       .catch(function (resp) {
  //         // handle error response
  //       });
  //   };
  // })

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
