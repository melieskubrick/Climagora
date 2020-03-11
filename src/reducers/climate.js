const INITIAL_STATE = {
  climateData: {},
};

export const climateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECT_CLIMATE':
      return {climateData: action.dataClimate};
    default:
      return state;
  }
};
