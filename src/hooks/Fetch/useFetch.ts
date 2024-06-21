import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import { useAsyncError } from "../";

type Nullable<T> = T | null | undefined; // Nullable 타입

const useFetch = <Params extends string, FetchResult>(
  fetch: (params: Params, config?: AxiosRequestConfig) => Promise<FetchResult>,
  params: Params,
  config?: AxiosRequestConfig,
): Nullable<FetchResult> => {
  const { catchAsyncError } = useAsyncError();

  // void
  const [_promise, _setPromise] = useState<Promise<void>>();

  // pending | fulfilled | error 상태만을 갖게
  const [_status, _setStatus] = useState<"pending" | "fulfilled" | "error">(
    "pending",
  );

  const [_result, _setResult] = useState<Nullable<FetchResult>>(null);

  const resolve = useCallback(
    (res: FetchResult) => {
      _setStatus("fulfilled");
      _setResult(res);
    },
    [params],
  );

  useEffect(() => {
    _setStatus("pending");
    _setPromise(
      fetch(params, config)
        .then(resolve)
        .catch((err: Error | null) => catchAsyncError(err)),
    );
  }, [params]);

  if (_promise && _status === "pending") {
    throw _promise;
  }

  return _result;
};

export default useFetch;
