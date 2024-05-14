"use client";

import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>("");
  const [successMsg, setSuccessMsg] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (successMsg || error) return;

    // setError("");
    // setSuccessMsg("");

    if (!token) {
      setError("Missing token");
      return;
    }

    try {
      const data = await newVerification(token);
      setError(data.error);
      setSuccessMsg(data.success);
    } catch (error) {
      setError("Something went wrong!");
    }
  }, [token, successMsg, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Email verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex justify-center items-center w-full">
        {!error && !successMsg && <BeatLoader />}
        {!successMsg && <FormError message={error} />}

        <FormSuccess message={successMsg} />
      </div>
    </CardWrapper>
  );
}

export default NewVerificationForm;
