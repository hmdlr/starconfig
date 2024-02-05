import { useCallback, useMemo, useState } from "react";

import { IBrand } from "@hmdlr/types";

import { updateBrandAction } from "../../store/Brands/actions";
import { useAppDispatch } from "../../store/hooks";

export const useUpdateBrand = () => {
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const onSuccess = useCallback(() => {
    setStatus("success");
  }, []);

  const onError = useCallback(() => {
    setStatus("error");
  }, []);

  const updateBrand = useCallback(
    (id: IBrand["id"], name: IBrand["name"], authUrl: IBrand["authUrl"]) => {
      setStatus("pending");
      dispatch(
        updateBrandAction({
          id,
          name,
          authUrl,
        }),
      )
        .unwrap()
        .then(onSuccess)
        .catch(onError);
    },
    [dispatch, onError, onSuccess],
  );

  return useMemo(() => {
    return {
      status,
      updateBrand,
    };
  }, [status, updateBrand]);
};
