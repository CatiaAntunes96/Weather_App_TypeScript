import React from "react";

import "../Style/Select.css";

type SelectProps = {
  cities: Array<string>;
  onChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  status: string;
};

function Select(props: SelectProps) {
  return (
    <div className="selectWrapper">
      <select
        onChange={props.onChangeHandler}
        disabled={props.status === "loading" ? true : false}
      >
        {props.cities.map((city, index) => (
          <option key={index} value={city} className="selectItems">
            {city}
          </option>
        ))}
      </select>
      <span className="focus"></span>
    </div>
  );
}

export default Select;
