import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  RkConfig
} from '../../config/config';

import {
  RkRadioButton
} from './RadioButton';


export class RkRadioGroup extends Component {
  static propTypes = {
    style: View.propTypes.style,
    selectedIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex == undefined ? -1 : props.selectedIndex
    }
  }

  render() {
    let children = this._processChildren();
    return (
      <View style={this.props.style}>
        {children}
      </View>
    );
  }

  _onSelect(index) {
    if(index == this.state.selectedIndex){
      index = -1;
    }
    this.setState({
      selectedIndex: index
    });
    this.props.onChange && this.props.onChange(index);
  }

  _processChildren(){
    let index = 0;
    let selectedIndex = this.state.selectedIndex;
    let process = (child) => {
      if (child.type === RkRadioButton) {
        let radioIndex = index++;
        return React.cloneElement(child, {
          onPress: () => this._onSelect(radioIndex),
          selected: radioIndex === selectedIndex
        });
      } else if(child.props.children){
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, process)
        });
      }
    };
    return React.Children.map(this.props.children, process);
  }




}
