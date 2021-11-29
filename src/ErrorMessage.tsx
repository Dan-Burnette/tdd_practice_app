function ErrorMessage(props: { message: string }) {
  const { message } = props;
  return <p role="alert">{message}</p>;
}

export default ErrorMessage;
