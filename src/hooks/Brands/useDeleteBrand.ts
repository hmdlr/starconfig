import { useCallback, useMemo, useState } from "react";
import { IBrand } from "@hmdlr/types";
import { useAppDispatch } from "../../store/hooks";
import { useModal } from "../useModal";
import { deleteBrandAction } from "../../store/Brands/actions";

export const useDeleteBrand = () => {
  const dispatch = useAppDispatch();
  const { callModal } = useModal();

  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const onSuccess = useCallback(() => {
    setStatus("success");
  }, []);

  const onError = useCallback(() => {
    setStatus("error");
  }, []);

  const deleteBrand = useCallback(
    (brandId: IBrand["id"]) => {
      setStatus("pending");
      dispatch(deleteBrandAction(brandId))
        .unwrap()
        .then(onSuccess)
        .catch(onError);
    },
    [dispatch, onError, onSuccess],
  );

  const requestDeleteBrand = useCallback(
    (brandId: IBrand["id"]) => {
      callModal("Are you sure you want to delete this brand?", "", {
        buttons: [
          {
            children: "Cancel",
          },
          {
            children: "Delete",
            onClick: () => {
              deleteBrand(brandId);
            },
            colorScheme: "red",
          },
        ],
      });
    },
    [callModal, deleteBrand],
  );

  return useMemo(() => {
    return {
      status,
      requestDeleteBrand,
    };
  }, [status, requestDeleteBrand]);
};
