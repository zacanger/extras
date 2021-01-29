import {Component}     from 'angular2/core'
import {UserComponent} from './user.component'

@Component({
	selector : 'ng-app'
, template : `
    <h3>loaded!</h3>
    <br>
    <user-list></user-list>
  `
, directives : [UserComponent]
})

export class AppComponent {

}

