import React from "react";
import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className=" w-full flex justify-center items-center">
        <ExclamationTriangleIcon className=" text-destructive" />
      </div>
    </CardWrapper>
  );
}

export default ErrorCard;
