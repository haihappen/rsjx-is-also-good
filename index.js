import Rx, { Observable, BehaviourSubject } from 'rx';


let username = Observable.fromEvent(document.querySelector('input[name=username]'), 'keyup');
username = username.map((e) => e.target.value)
let usernameEnabled = username.map((v) => v.length > 0)


let fullname = Observable.fromEvent(document.querySelector('input[name=fullname]'), 'keyup');
fullname = fullname.map((e) => e.target.value)
let fullnameEnabled = fullname.map((v) => v.length > 0)


let button = document.querySelector('button');
let bothEnabled = Observable.combineLatest(usernameEnabled, fullnameEnabled, (a, b) => a && b);


let buttonEnabled = new Rx.BehaviorSubject(false);
bothEnabled.subscribe(buttonEnabled)

buttonEnabled.subscribe((enabled) => button.disabled = !enabled);
