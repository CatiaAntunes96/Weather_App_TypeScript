import React from "react";

import "../Style/Slider.css";

type sliderProps = {
  onChangeSlider: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Slider({ onChangeSlider }: sliderProps) {
  return (
    <label className="inputContainer">
      <p className="labelParagraph">ºC</p>
      <input type="checkbox" onChange={onChangeSlider} />
      <span className="slider" />
      <p className="labelParagraph">ºF</p>
    </label>
  );
}

export default Slider;
