import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  address: null,
  connect: false,
  web3: null,
  refresh: false,
  balance: {
    "eth": -1
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  const updateWeb3 = (_web3) => {
    dispatch({ type: "UPDATE_WEB3", payload: _web3 });
  };

  const updateConnect = (_connect) => {
    dispatch({ type: "UPDATE_CONNECT", payload: _connect });
  };

  const updateAddress = (_address) => {
    dispatch({ type: "UPDATE_ADDRESS", payload: _address });
  };

  const updateBalance = (_balance) => {
    dispatch({ type: "UPDATE_BALANCE", payload: _balance})
  }

  const updateRefresh = (_refresh) => {
    dispatch({ type: "UPDATE_REFRESH", refresh: _refresh})
  }

  return (
    <GlobalContext.Provider
      value={{
        address: state.address,
        connect: state.connect,
        web3: state.web3,
        balance: state.balance,
        refresh: state.refresh,
        updateWeb3,
        updateConnect,
        updateAddress,
        updateBalance,
        updateRefresh
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};