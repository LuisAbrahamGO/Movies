import { CHANGE_HIGH, CHANGE_LOW } from "../../types/types";

export default (state, action) => {
  switch (action.type) {
    case CHANGE_HIGH:
      return (state = "high");
    case CHANGE_LOW:
      return (state = "low");
    default:
      return state;
  }
};
