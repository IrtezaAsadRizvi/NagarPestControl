// ANGULAR APP + CONTROLLER
var app = angular.module('npc',['ngRoute'])
var $submit = false;

// ROUTING
app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl: "pages/home.html"
  })
  $routeProvider.when('/cockroach-control',{
    templateUrl: "pages/cockroach-control.html"
  })
  $routeProvider.when('/rodent-control',{
    templateUrl: "pages/rodent-control.html"
  })
  $routeProvider.when('/mosquito-control',{
    templateUrl: "pages/mosquito-control.html"
  })
  $routeProvider.when('/termite-control',{
    templateUrl: "pages/termite-control.html"
  })
  $routeProvider.when('/bed-bugs-control',{
    templateUrl: "pages/bed-bugs-control.html"
  })
  $routeProvider.when('/ant-control',{
    templateUrl: "pages/ant-control.html"
  })
  $routeProvider.when('/fumigation-service',{
    templateUrl: "pages/fumigation-service.html"
  })
  $routeProvider.when('/service-pricing',{
    templateUrl: "pages/service-pricing.html"
  })
  $routeProvider.when('/our-clients',{
    templateUrl: "pages/our-clients.html"
  })
  $routeProvider.when('/about-us',{
    templateUrl: "pages/about-us.html"
  })
  $routeProvider.when('/contact',{
    templateUrl: "pages/contact.html"
  })
  $routeProvider.when('/blog',{
    templateUrl: "pages/blog.html"
  })
  $routeProvider.when('/admin',{
    templateUrl: "pages/admin.html"
  })
  $routeProvider.otherwise({
     redirectTo: "/"
  })
})

app.run(['$rootScope','$http',function ($rootScope,$http) {
  $rootScope.selectedLang = 0
  $rootScope.$on('$viewContentLoaded', function(){
   console.log("dom is loaded");
  });
  $http.get("select.php").then((response)=>{
    $rootScope.msgs = response.data
  })
  // LOADER
  $rootScope.$on('$locationChangeStart',function(e,oldval,newva){
      $rootScope.stateIsLoading = true;
  });
  $rootScope.$on('$routeChangeSuccess',function(e,oldval,newva){
      $rootScope.stateIsLoading = false;
  });
}])

app.controller('npcCtrl',['$scope','$rootScope','$location','$window','$http',function($scope,$rootScope,$location,$window,$http) {

  $scope.domLoaded = 0

  $scope.$watch('$viewContentLoaded', function(){
    $scope.domLoaded = 1
  });

  // METHODS
  $scope.langSelect = (lang)=>{
    $rootScope.selectedLang = lang
  }
  $scope.link = (path)=>{
    $location.path(path)
    $window.scrollTo(0, 0)
  }
  //CUSTOMER HANDLE
  $scope.customer = {}
  $scope.submitForm = function() {
    if (!$submit) {
      var para = document.createElement("p")
      para.innerHTML = "Message received, we'll contact you as soon as possible!"
      document.getElementsByClassName("wrapper")[0].appendChild(para)
      window.$submit = true;
      console.log($scope.customer)
      $http.post('insert.php',$scope.customer).then((data)=>{
        console.log(data)
        $scope.getmsgs()
      })
    }
	}
  $scope.getmsgs = ()=>{
    $http.get("select.php").then((response)=>{
      $rootScope.msgs = response.data
    })
  }
  // MESSAGES LIST
  $scope.modalMsg = {}
  $scope.viewmsg = (msg)=>{
    $scope.modalMsg = msg
    console.log($scope.modalMsg)
  }
  $scope.deletemsg = (msgid)=>{
    $http.post('delete.php',{'id': msgid}).then((response)=>{
      console.log(response)
      $scope.getmsgs()
    })
  }
}])

app.directive('compare', function() {
	var o = {};
	o.strict = 'AE';
	o.scope = {
		orgText: '=compare'
	};
	o.require = 'ngModel';
	o.link = function(sco, ele, attr, con) {
		con.$validators.compare = function(v) {
			return v == sco.orgText;
		}

		sco.$watch('orgText', function() {
			con.$validate();
		});
	}
	return o;
});
