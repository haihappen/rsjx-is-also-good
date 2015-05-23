import Rx, { Observable, BehaviorSubject } from 'rx';



let targetValue = (e) => e.target.value;
let presence = (v) => !!v.length;
let and = (a, b) => a && b;


let usernamePresence = Observable.fromEvent(document.querySelector('input[name=username]'), 'keyup')
  .map(targetValue)
  .map(presence);

let fullnamePresence = Observable.fromEvent(document.querySelector('input[name=fullname]'), 'keyup')
  .map(targetValue)
  .map(presence);


let button = document.querySelector('button');
let bothPresence = Observable.combineLatest(usernamePresence, fullnamePresence, and);


let buttonEnabled = new BehaviorSubject(false);
bothPresence.subscribe(buttonEnabled);
buttonEnabled.subscribe((enabled) => button.disabled = !enabled);
