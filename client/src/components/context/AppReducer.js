export default (state, action) => {
    switch (action.type) {
      case "UPDATE_WEB3":
        return {
          ...state,
          web3: action.payload,
        };
      case "UPDATE_CONNECT":
        return {
          ...state,
          connect: action.payload,
        };
      case "UPDATE_ADDRESS":
        return {
          ...state,
          address: action.payload,
        };
      case "UPDATE_BALANCE":
        return {
          ...state,
          balance: action.payload
        }
      case "UPDATE_REFRESH":
        return {
          ...state,
          refresh: action.payload
        }
    }
  };