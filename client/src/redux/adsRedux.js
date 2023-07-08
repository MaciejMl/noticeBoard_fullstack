//Actions
const createActionName = (actionName) => `app/ads/${actionName}`;
// const LOG_IN = createActionName('LOG_IN');

//action creators
// export const login = (payload) => ({ type: LOG_IN, payload });

const adsReducer = (statePart = null, action) => {
  switch (action.type) {
    // case LOG_IN:
    //   return action.payload;
    default:
      return statePart;
  }
};

export default adsReducer;
