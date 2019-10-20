const SET_REPOS = "SET_REPOS";

function reducer(state, action) {
  switch (action.type) {
    case SET_REPOS:
      return { ...state, repos: action.repos };
  }
}

export { reducer, SET_REPOS };
