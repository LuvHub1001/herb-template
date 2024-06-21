import { useState } from "react";

const useAsyncError = () => {
  const [_, _setError] = useState(null);

  const catchAsyncError = (err: Error | null) => {
    _setError(() => {
      throw err;
    });
  };

  return { catchAsyncError };
};

export default useAsyncError;
