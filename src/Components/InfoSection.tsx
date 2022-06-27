import React, { useEffect } from "react";
import "../Style/InfoSection.css";
import { DateTime } from "luxon";
import { useFetchReducer } from "./UseReducerHook";
import { KEY } from "../Constants/Constants";
import ErrorSection from "./ErrorSection";

type HoursOfSun = {
  sunrise: number;
  sunset: number;
};

type Info = {
  name: string;
  temperatureCelsius: number;
  hoursOfSun: HoursOfSun;
  icon: string;
};

type Error = {
  statusCode: number;
  message: string;
};

type SearchProps = {
  searchValue: string;
  toggled: boolean;
  onChangeStatus: (status: string) => void;
};

function InfoSection({ searchValue, toggled, onChangeStatus }: SearchProps) {
  const [state, dispatch] = useFetchReducer<Info, Error>(null);

  let fahrenheit = 0;

  if (state.data) {
    fahrenheit = Math.round(state.data?.temperatureCelsius * 1.8 + 32);
  }

  useEffect(() => {
    dispatch({ type: "FETCH" });
    onChangeStatus("loading");
    async function getWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${KEY}`
      );

      if (response.status === 200) {
        const data = await response.json();
        dispatch({
          type: "RESOLVE",
          data: {
            name: data.name,
            temperatureCelsius: data.main.temp,
            hoursOfSun: { sunrise: data.sys.sunrise, sunset: data.sys.sunset },
            icon: data.weather[0].icon,
          },
        });
        onChangeStatus("success");

        return;
      } else {
        dispatch({
          type: "REJECT",
          error: { statusCode: response.status, message: response.statusText },
        });
        onChangeStatus("error");
      }
    }

    getWeather();
  }, [searchValue, dispatch, onChangeStatus]);

  return (
    <>
      {state.status === "failure" ? (
        <ErrorSection message={state.error.message} />
      ) : null}
      {state.data ? (
        <div className="infoWrapper">
          {toggled ? (
            <p className="temperature-info">{Math.ceil(fahrenheit)} ºF</p>
          ) : (
            <p className="temperature-info">
              {Math.ceil(state.data?.temperatureCelsius)} ºC
            </p>
          )}

          <section>
            <img
              src={`http://openweathermap.org/img/wn/${state.data?.icon}@2x.png`}
              alt="icon-weather"
              className="icon"
            ></img>
          </section>
        </div>
      ) : null}
      {state.data ? (
        <div className="hoursContainer">
          <section className="hoursSun">
            <p>
              Sunrise:{" "}
              {DateTime.fromSeconds(state.data?.hoursOfSun.sunrise)
                .toISOTime()
                .slice(0, 5)}
            </p>
            <p>
              Sunset:{" "}
              {DateTime.fromSeconds(state.data?.hoursOfSun.sunset)
                .toISOTime()
                .slice(0, 5)}
            </p>
          </section>
        </div>
      ) : null}
    </>
  );
}

export default InfoSection;
