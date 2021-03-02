const MainSectionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MULTIVALUE_SECTIONS_INPUT':
      setMultiValue(action.payload, state);
      break;
    default:
      return state;
  }
};

const setMultiValue = (payload, state) => {
  debugger
  const updatedField = state[payload.key];
  updatedField[payload.index] = payload.value;
  return { ...state, [payload.key]: updatedField };
};
export default MainSectionReducer;
