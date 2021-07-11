import { SET_USER, UNSET_USER } from "../../types/types";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return (state = action.payload);
    case UNSET_USER:
      return (state = null);
    default:
      return state;
  }
};
