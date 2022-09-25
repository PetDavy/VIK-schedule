import { useSelector, useDispatch } from "react-redux";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";

import { Store } from "./store";

export function useStore<T>(getter: (store: Store) => T): [T, Dispatch<AnyAction>] {
  const dispatch = useDispatch();

  
  return [useSelector(getter), dispatch];
}

export function useStoreWithInit<T>(getter: (store: Store) => T, loadInitData: () => void): [T, Dispatch<AnyAction>] {
  useEffect(() => {
    if (loadInitData) {
      loadInitData();
    }
  }, [null])

  return useStore(getter);
}