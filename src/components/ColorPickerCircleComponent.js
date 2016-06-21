import React from 'react';
import autobind from 'autobind-decorator';
import { colorPickerCircle } from '../utils/styles';

const propTypes = {
  size: React.PropTypes.any.isRequired,
  position: React.PropTypes.any,
  top: React.PropTypes.any,
  onPositionChanged: React.PropTypes.any,
};

const defaultProps = {};

export class ColorPickerCircleComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      parentWidth: 0,
      parentLeft: 0,
      position: props.position,
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchend', this.onMouseUp);
  }

  @autobind
  onMouseDown(e) {
    this.setState({
      dragging: true,
      parentWidth: e.target.parentElement.clientWidth,
      parentLeft: e.target.parentElement.getBoundingClientRect().left,
    });
  }

  @autobind
  onMouseMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.stopImmediatePropagation();
    this.setPosition(e.pageX);
    this.validatePosition();
  }

  @autobind
  onTouchMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.stopImmediatePropagation();
    this.setPosition(e.changedTouches[0].pageX);
    this.validatePosition();
  }

  @autobind
  onMouseUp() {
    this.setState({
      dragging: false,
    });
  }

  setPosition(pageX) {
    this.setState({
      position: (pageX - this.state.parentLeft) / this.state.parentWidth,
    });
  }

  validatePosition() {
    if (this.state.position > 1) {
      this.setState({
        position: 1,
      });
    }
    if (this.state.position < 0) {
      this.setState({
        position: 0,
      });
    }
    this.props.onPositionChanged(this.state.position);
  }

  render() {
    const { size, top } = this.props;
    const style = Object.assign({}, colorPickerCircle, {
      height: `${size}px`,
      width: `${size}px`,
      top: `${top}px`,
      marginLeft: `${- size / 2}px`,
      left: `${this.state.position * 100}%`,
    });
    return (
      <div
        style={style}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
      >
      </div>
    );
  }
}

ColorPickerCircleComponent.propTypes = propTypes;
ColorPickerCircleComponent.defaultProps = defaultProps;
