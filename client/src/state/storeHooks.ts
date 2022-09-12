import { useSelector, useDispatch } from "react-redux";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";

import { Store } from "./store";

export function useStore<T>(getter: (store: Store) => T, loadInitData?: () => void): [T, Dispatch<AnyAction>] {
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadInitData) {
      loadInitData();
    }
  }, [null])

  return [useSelector(getter), dispatch];
}