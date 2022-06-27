import React from "react";

import "../Style/ErrorSection.css";

type ErrorProps = {
  message: string;
};

function ErrorSection(props: ErrorProps) {
  return (
    <section className="errorWrapper">
      <p>Erro fetching the data: {props.message}</p>
    </section>
  );
}

export default ErrorSection;
