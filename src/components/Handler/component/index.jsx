/* global window */
import React from 'react';
import ColorPickerCircleWrapper from '../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../components-styled/ColorPickerTargetWrapper';
import validatePosition from '../utils/position-validation';
import getPosition from '../../../utils/position';

const propTypes = {
  dragging: React.PropTypes.bool.isRequired,
  position: React.PropTypes.number.isRequired,
  positionLeft: React.PropTypes.number.isRequired,
  positionRight: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onDraggingChanged: React.PropTypes.func.isRequired,
  onPositionChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class Handler extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onGestureResponderStart = this.onGestureResponderStart.bind(this);
    this.onMouseResponderMove = this.onMouseResponderMove.bind(this);
    this.onTouchResponderMove = this.onTouchResponderMove.bind(this);
    this.onGestureResponderEnd = this.onGestureResponderEnd.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseResponderMove, true);
    window.addEventListener('touchmove', this.onTouchResponderMove, true);
    window.addEventListener('mouseup', this.onGestureResponderEnd);
    window.addEventListener('touchend', this.onGestureResponderEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseResponderMove, true);
    window.removeEventListener('touchmove', this.onTouchResponderMove, true);
    window.removeEventListener('mouseup', this.onGestureResponderEnd);
    window.removeEventListener('touchend', this.onGestureResponderEnd);
  }

  onGestureResponderStart(e) {
    // prevent selecting text
    e.preventDefault();
    // parents don't need to know about this event
    e.stopPropagation();
    this.props.onDraggingChanged(true);
  }

  onMouseResponderMove(e) {
    const { dragging, positionLeft, positionRight, onPositionChanged } = this.props;
    if (!dragging) {
      return;
    }
    // prevent selecting text
    e.preventDefault();
    // prevent any other movement
    e.stopImmediatePropagation();
    const position = getPosition(
      positionLeft,
      e.clientX,
      positionRight - positionLeft,
    );
    validatePosition(position, onPositionChanged);
  }

  onTouchResponderMove(e) {
    const { dragging, positionLeft, positionRight, onPositionChanged } = this.props;
    if (!dragging) {
      return;
    }
    // prevent selecting text
    e.preventDefault();
    // prevent any other movement
    e.stopImmediatePropagation();
    const position = getPosition(
      positionLeft,
      e.changedTouches[0].clientX,
      positionRight - positionLeft,
    );
    validatePosition(position, onPositionChanged);
  }

  onGestureResponderEnd() {
    this.props.onDraggingChanged(false);
  }

  render() {
    const { width } = this.props;
    const { position, size } = this.props;
    const halfSize = size / 2;
    // NOTE: pass real width to make it work when component is scaled
    return (
      <ColorPickerCircleWrapper
        style={{
          height: size,
          width: size,
          top: 0,
          left: 0,
          transform: `translate3d(${Math.round(position * width) - halfSize}px, 0, 0)`,
        }}
        onMouseDown={this.onGestureResponderStart}
        onTouchStart={this.onGestureResponderStart}
      >
        <ColorPickerTargetWrapper
          style={{
            height: halfSize,
            width: halfSize,
          }}
        />
      </ColorPickerCircleWrapper>
    );
  }
}

Handler.propTypes = propTypes;
Handler.defaultProps = defaultProps;