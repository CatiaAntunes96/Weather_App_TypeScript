import React from "react";

import "../Style/InfoSection.css";

type ErrorProps = {
  message: string;
};

function ErrorSection(props: ErrorProps) {
  return (
    <section className="errorWrapper">
      <p>Error fetching the data: {props.message}</p>
    </section>
  );
}

export default ErrorSection;
