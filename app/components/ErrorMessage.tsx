import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return !children ? null : <p className="text-red-500 text-sm">{children}</p>;
};

export default ErrorMessage;
