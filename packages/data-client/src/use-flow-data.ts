"use client";

import { useEffect, useState } from "react";

/**
 * A page/flow declares one of these per data need, so a page can ship
 * against dummy data while the backend isn't ready yet, then flip to
 * "api" later without changing the component that consumes the data.
 */
export type DataSource<T> =
  | { mode: "dummy"; data: T }
  | { mode: "api"; fetcher: () => Promise<T> };

export interface FlowDataState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: unknown;
}

export function useFlowData<T>(source: DataSource<T>): FlowDataState<T> {
  const [state, setState] = useState<FlowDataState<T>>(() =>
    source.mode === "dummy"
      ? { data: source.data, isLoading: false, error: undefined }
      : { data: undefined, isLoading: true, error: undefined },
  );

  useEffect(() => {
    if (source.mode === "dummy") {
      setState({ data: source.data, isLoading: false, error: undefined });
      return;
    }

    let cancelled = false;
    setState({ data: undefined, isLoading: true, error: undefined });

    source
      .fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, isLoading: false, error: undefined });
      })
      .catch((error: unknown) => {
        if (!cancelled) setState({ data: undefined, isLoading: false, error });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source.mode, source.mode === "dummy" ? source.data : source.fetcher]);

  return state;
}
