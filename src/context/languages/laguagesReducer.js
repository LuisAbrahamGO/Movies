import { CHANGE } from "../../types/types";

export default (state, action) => {
  switch (action.type) {
    case CHANGE:
      return state = !state;
    default:
      return state;
  }
};
