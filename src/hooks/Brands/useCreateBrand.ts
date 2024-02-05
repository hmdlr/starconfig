import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IBrand } from "@hmdlr/types";

import { createBrandAction } from "../../store/Brands/actions";
import { useAppDispatch } from "../../store/hooks";
import { useActions } from "../useActions";
import useLoadingOverlay from "../useLoading";

export const useCreateBrand = () => {
  const { setActions } = useActions();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showLoading, hideLoading, LoadingOverlay } = useLoadingOverlay();

  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [brand, setBrand] = useState<IBrand | null>(null);

  const onSuccess = useCallback(
    (newBrand: IBrand) => {
      setStatus("success");
      setBrand(newBrand);
      setActions({
        "Go back": () => navigate(`/rules`),
      });
    },
    [navigate, setActions],
  );

  const onError = useCallback(() => {
    setStatus("error");
  }, []);

  const createBrand = useCallback(
    (name: string, authUrl: string) => {
      showLoading();

      let hostname = "";

      try {
        hostname = new URL(authUrl).hostname;
      } catch (e) {
        alert("Invalid URL");
        hideLoading();
        return;
      }

      setStatus("pending");
      dispatch(
        createBrandAction({
          name: name,
          authUrl: authUrl,
          domain: hostname,
          title: name,
        }),
      )
        .unwrap()
        .then(onSuccess)
        .catch(onError)
        .finally(() => {
          hideLoading();
        });
    },
    [dispatch, hideLoading, onError, onSuccess, showLoading],
  );

  return useMemo(
    () => ({
      createBrand,
      LoadingOverlay,
      brand,
      status,
    }),
    [createBrand, LoadingOverlay, brand, status],
  );
};
