import Rx, { Observable, BehaviorSubject } from 'rx';
import React, { Component, PropTypes } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: new BehaviorSubject('') };
  }


  render() {
    return (
      <div>
        <TextInput text={this.state.text} />
        <Label text={this.state.text} />
        <InvertedLabel text={this.state.text} />
      </div>
    );
  }
}


class TextInput extends Component {
  static propTypes = {
    text: PropTypes.instanceOf(BehaviorSubject).isRequired
  }


  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  render() {
    return <input
              type="text"
              ref="input"
              value={this.state.text}
              onChange={()=>this.handleChange()}
            />;
  }


  handleChange() {
    let text = React.findDOMNode(this.refs.input).value;

    this.setState({ text });
    this.props.text.onNext(text);
  }
}


class Label extends React.Component {
  static propTypes = {
    text: PropTypes.instanceOf(BehaviorSubject).isRequired
  }


  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  componentWillMount() {
    this.props.text.subscribe((text) => {
      this.setState({ text });
    });
  }


  render() {
    return <p>{this.state.text}</p>;
  }
}


class InvertedLabel extends Label {
  static propTypes = {
    text: PropTypes.instanceOf(BehaviorSubject).isRequired
  }


  componentWillMount() {
    let reverse = (string) => string.split('').reverse().join('');

    this.props.text.map(reverse).subscribe((text) => {
      this.setState({ text });
    });
  }
}


React.render(<App />, document.body);
