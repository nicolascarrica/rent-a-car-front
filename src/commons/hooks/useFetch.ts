import { useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  error?: Error;
  status?: string;
}

type Cache<T> = {[url: string]: T};

type Action <T> = 
| { type: "loading" }
| { type: "fetched"; payload: T }
| { type: "error"; payload: Error };

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    status:"",
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: "loading" };
      case "fetched":
        return { ...initialState, data: action.payload, status: action.type };
      case "error":
        return { ...initialState, error: action.payload, status: action.type };
      default:
        return state;
    }
  };

  const [ state, dispatch ] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw Error(response.statusText);
        }
        if (response.ok && response.status !== 200) {
          throw new Error("Unexpected response status: " + response.status);
        }
        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;
        dispatch({ type: "fetched", payload: data });
      }
      catch (error) {
        if (cancelRequest.current) return;
        dispatch({ type: "error", payload: new Error("Failed to fetch data") });
      }
    };
    void fetchData();
    return () => {
      cancelRequest.current = true;
    };
  }, [url, options]);

  return state;
}

export default useFetch
