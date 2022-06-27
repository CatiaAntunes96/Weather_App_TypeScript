import { useReducer } from "react";

type Nullable<T> = T | null | undefined;

type IdleState<DataT> = {
  status: "idle";
  data: Nullable<DataT>;
  error: null;
};

type LoadingState<DataT, ErrorT> = {
  status: "loading";
  data: Nullable<DataT>;
  error: Nullable<ErrorT>;
};

type SuccessState<DataT> = {
  status: "success";
  data: DataT;
  error: null;
};

type FailureState<ErrorT> = {
  status: "failure";
  data: null;
  error: ErrorT;
};

type State<DataT, ErrorT> =
  | IdleState<DataT>
  | LoadingState<DataT, ErrorT>
  | SuccessState<DataT>
  | FailureState<ErrorT>;

type Event<DataT, ErrorT> =
  | { type: "FETCH" }
  | { type: "RESOLVE"; data: DataT }
  | { type: "REJECT"; error: ErrorT };

export function useFetchReducer<DataT, ErrorT = string>(
  initialData: Nullable<DataT> = null
) {
  const initialState: IdleState<DataT> = {
    status: "idle",
    data: initialData,
    error: null,
  };

  function fetchReducer(
    state: State<DataT, ErrorT>,
    event: Event<DataT, ErrorT>
  ): State<DataT, ErrorT> {
    switch (event.type) {
      case "FETCH":
        return {
          ...state,
          status: "loading",
        };
      case "RESOLVE":
        return {
          status: "success",
          data: event.data,
          error: null,
        };
      case "REJECT":
        return {
          status: "failure",
          data: null,
          error: event.error,
        };

      default:
        return state;
    }
  }

  return useReducer(fetchReducer, initialState);
}
