import Rx, { Observable, BehaviorSubject } from 'rx';



let targetValue = (e) => e.target.value;
let presence = (v) => !!v.length;
let and = (a, b) => a && b;


let usernameEnabled = Observable.fromEvent(document.querySelector('input[name=username]'), 'keyup')
  .map(targetValue)
  .map(presence);

let fullnameEnabled = Observable.fromEvent(document.querySelector('input[name=fullname]'), 'keyup')
  .map(targetValue)
  .map(presence);


let button = document.querySelector('button');
let bothEnabled = Observable.combineLatest(usernameEnabled, fullnameEnabled, and);


let buttonEnabled = new BehaviorSubject(false);
bothEnabled.subscribe(buttonEnabled);
buttonEnabled.subscribe((enabled) => button.disabled = !enabled);
