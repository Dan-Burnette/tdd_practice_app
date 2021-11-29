import React from "react";

// errorMessage() {
//   const { errorMessage } = this.state;
//   const shouldDisplay = this.state.errorMessage.length > 0;
//   return shouldDisplay ? <p role="alert">{errorMessage}</p> : null;
// }

function ErrorMessage(props: { message: string }) {
  const { message } = props;
  return <p role="alert">{message}</p>;
}

export default ErrorMessage;
