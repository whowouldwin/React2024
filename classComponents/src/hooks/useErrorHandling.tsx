import { useState } from "react";

export const useErrorHandling = () => {
  const [error, setError] = useState<boolean>(false);
  const handleThrowError = () => {
    setError(true );
  };
  return { error, handleThrowError };
}


