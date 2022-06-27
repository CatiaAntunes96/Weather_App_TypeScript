import React from "react";

import "../Style/Title.css";

type TitleProps = {
  title: string;
};

function Title(props: TitleProps) {
  return (
    <div className="titleWrapper">
      <h1>{props.title}</h1>
    </div>
  );
}

export default Title;
