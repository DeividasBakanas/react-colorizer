import React from 'react';
import autobind from 'autobind-decorator';
import { Color } from '../utils/color';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';
import { colorPickerGradient, colorPickerHueGradient } from '../utils/styles';

const propTypes = {
  height: React.PropTypes.any.isRequired,
  color: React.PropTypes.any,
  onBaseColorChanged: React.PropTypes.any,
};

const defaultProps = {};

export class BaseColorPickerComponent extends React.Component {

  @autobind
  onPositionChanged(position) {
    const color = new Color(0, 0, 0);
    const colors = [
      new Color(0, 169, 224),
      new Color(50, 52, 144),
      new Color(234, 22, 136),
      new Color(235, 46, 46),
      new Color(253, 233, 45),
      new Color(0, 158, 84),
      new Color(0, 158, 84),
    ];
    const index = position * 5;
    const index1 = Math.floor(index);
    const index2 = index1 + 1;
    const percent = index - index1;
    color.r = colors[index1].r + (colors[index2].r - colors[index1].r) * percent;
    color.g = colors[index1].g + (colors[index2].g - colors[index1].g) * percent;
    color.b = colors[index1].b + (colors[index2].b - colors[index1].b) * percent;
    this.props.onBaseColorChanged(color);
  }

  render() {
    const style = Object.assign({}, colorPickerGradient, colorPickerHueGradient, {
      height: `${this.props.height}px`,
    });

    return (
      <div style={style} >
        <ColorPickerCircleComponent
          size={this.props.height / 2}
          position={0.5}
          top={this.props.height / 4}
          onPositionChanged={this.onPositionChanged}
        />
      </div>
    );
  }
}

BaseColorPickerComponent.propTypes = propTypes;
BaseColorPickerComponent.defaultProps = defaultProps;
