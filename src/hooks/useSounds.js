import { useEffect, useReducer } from "react";

const initialState = {
  status: "idle",
  data: []
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading"
      };
    case "success":
      return {
        ...state,
        status: "success",
        data: action.payload
      };
    case "error":
    default:
      return {
        ...state,
        status: "error"
      };
  }
}

const useSounds = () => {
  const [state, dispath] = useReducer(reducer, initialState);
  const { status, data } = state;

  useEffect(() => {
    dispath({ type: "loading" });
    fetch(`${process.env.REACT_APP_API_URL}/api/sounds`)
      .then(response => response.json())
      .then(json => {
        dispath({ type: "success", payload: json });
      })
      .catch(error => {
        dispath({ type: "error", payload: error });
      });
  }, []);

  return {
    status,
    data
  };
};

export default useSounds;
