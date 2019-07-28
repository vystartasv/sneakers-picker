import React from "react";
export default class Sneaker extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
    const data = await fetch(
      "https://all.data.alexbooster.com/json/sneakers.json"
    );
    const [
      { allSizes, allColors, allImages, bySize, byColor }
    ] = await data.json();
    this.setState({
      allSizes,
      allColors,
      allImages,
      bySize,
      byColor
    });
    this.handleSelect({ color: this.getMostAvailableColor(), size: 9 });
  }
  getMostAvailableColor() {
    return Object.entries(this.state.byColor)
      .filter(color => color[1].includes(9))
      .reduce((a, b) => (a[1].length < b[1].length ? (a = b) : a))[0];
  }
  handleSelect(props) {
    const color = props.color ? props.color : this.state.bySize[props.size][0];
    const size = props.size ? props.size : this.state.byColor[props.color][0];
    const selectedColorSizes = props.color
      ? this.state.byColor[props.color]
      : this.state.allSizes;
    const selectedSizeColors = props.size
      ? this.state.bySize[props.size]
      : this.state.allColors;
    this.setState({
      selectedColor: color,
      selectedSize: size,
      selectedImage: this.state.allImages[color],
      selectedColorSizes,
      selectedSizeColors
    });
  }
  render() {
    return (
      <div>
        <h2>Sneakers</h2>
        <p>Select the desired colour or size below</p>
        <div>
          <div>
            {this.state.selectedImage ? (
              <img
                width="400"
                src={this.state.selectedImage}
                alt={`${this.state.selectedColor} Sneaker`}
              />
            ) : null}
          </div>
          <div>
            <div>
              <label htmlFor="size-options">Size:</label>
              <select
                name="sizeOptions"
                id="size-options"
                onChange={e => this.handleSelect({ size: e.target.value })}
                value={this.state.selectedSize}
              >
                {this.state.selectedColorSizes
                  ? this.state.selectedColorSizes.map(size => (
                      <option key={size}>{size}</option>
                    ))
                  : null}
              </select>
            </div>
            <div>
              <label htmlFor="color-options">Colour:</label>
              <select
                name="colorOptions"
                id="color-options"
                onChange={e => this.handleSelect({ color: e.target.value })}
                value={this.state.selectedColor}
                style={{ textTransform: "capitalize" }}
              >
                {this.state.selectedSizeColors
                  ? this.state.selectedSizeColors.map(color => (
                      <option key={color}>{color}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
