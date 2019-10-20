import { useReducer, useEffect } from "react";
import { reducer, SET_REPOS } from "../reducers/reducers";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    repos: []
  });

  const updateRepos = repos => {
    dispatch({
      type: SET_REPOS,
      repos
    });
  };

  return { state, updateRepos };
};

export default useApplicationData;
