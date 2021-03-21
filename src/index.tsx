/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

ReactDOM.render(
  <HelloMessage name="test" />,
  document.getElementById('app')
);
