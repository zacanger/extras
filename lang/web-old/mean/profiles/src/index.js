import angular        from 'angular'
import uiRouter       from 'angular-ui-router'
import routing        from './routing'
import profileCtrl    from './components/Profile/profileCtrl'
import newProfileCtrl from './components/NewProfile/newProfileCtrl'
import rootCtrl       from './components/rootCtrl'
import Profile        from './components/Profile/Profile'
import NewProfile     from './components/NewProfile/NewProfile'
import profileService from './components/profileService'
import './styles/style.css'

angular.module('profiles', [uiRouter])
.config(routing)
.controller('profileCtrl', profileCtrl)
.controller('newProfileCtrl', newProfileCtrl)
.controller('rootCtrl', rootCtrl)
.directive('profile', Profile)
.directive('newProfile', NewProfile)
.service('profileService', profileService)

