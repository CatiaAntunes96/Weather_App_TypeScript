import React, { useState } from "react";

import "../Style/Container.css";
import Title from "../Components/Title";
import Slider from "../Components/Slider";
import { cities } from "../Constants/Constants";
import Select from "../Components/Select";
import InfoSection from "../Components/InfoSection";

function WeatherGadget() {
  const [toggled, setToggled] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("Lisboa");
  const [status, setStatus] = useState<string>("");

  const handleSearchValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="container">
      <Title title="Weather App" />
      <div className="containerWrapper">
        <div className="topSection">
          <Select
            cities={cities}
            onChangeHandler={handleSearchValue}
            status={status}
          />

          <Slider
            onChangeSlider={(event: React.ChangeEvent<HTMLInputElement>) =>
              setToggled(event.target.checked)
            }
          />
        </div>

        <InfoSection
          toggled={toggled}
          searchValue={searchValue}
          onChangeStatus={setStatus}
        />
      </div>
    </div>
  );
}

export default WeatherGadget;
