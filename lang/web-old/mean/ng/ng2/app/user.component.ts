import {Component} from 'angular2/core'
import {UserSvc}   from './user.svc'

@Component({
  selector    : 'user-list'
, templateUrl : 'app/user.html'
, providers   : [UserSvc]
})

export class UserComponent {
  firstName = 'zac'
  lastName  = 'anger'
  users     : string[] = []

  constructor() {

  }

  changeUserName() {
    this.lastName = 'whatever'
  }

  getUsers() {
    this.users = UserSvc.getUsers()
  }
}

