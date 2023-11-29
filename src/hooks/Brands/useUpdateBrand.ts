import { useCallback, useMemo, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { IBrand } from "@hmdlr/types";
import { updateBrandAction } from "../../store/Brands/actions";

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
    (id: IBrand["id"], name: IBrand["name"]) => {
      setStatus("pending");
      dispatch(
        updateBrandAction({
          id,
          name,
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
