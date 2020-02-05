import React, { createContext, Reducer, useContext, useReducer, useMemo, useCallback } from 'react';
import Web3 from 'web3';
import Onboard from 'bnc-onboard';
import { Initialization } from 'bnc-onboard/dist/src/interfaces';

const SET_WALLET = 'SET_WALLET';
const RESET_WALLET = 'RESET_WALLET';

interface OnboardState {
  wallet?: any;
  onboard: any;
  web3?: Web3;
}

interface Action {
  type: string;
  payload: any;
}

interface InitContextProps extends Array<any> { }

export const OnboardContext = createContext({} as InitContextProps);

export function useOnboardContext() {
  return useContext(OnboardContext);
}

const reducer: Reducer<OnboardState, Action> = (state, { type, payload }) => {
  switch (type) {
    case SET_WALLET: {
      const { wallet, web3 } = payload;
      return {
        ...state,
        wallet,
        web3,
      };
    }
    case RESET_WALLET: {
      return {
        ...state,
        wallet: null,
        web3: null,
      };
    }
    default: {
      throw Error(`Unexpected action type in OnboardContext reducer: '${type}'.`);
    }
  }
};

const OnboardProvider = ({ children, initialisation }: { children: any; initialisation: Initialization }) => {
  const onboard = Onboard(initialisation);

  const [state, dispatch] = useReducer(reducer, { onboard });

  const setWallet = useCallback(wallet => {
    const web3 = new Web3(wallet.provider);
    dispatch({ type: SET_WALLET, payload: { wallet, web3 } });
  }, []);

  const resetWallet = useCallback(() => dispatch({ type: RESET_WALLET, payload: {} }), []);

  const setConfig = (config: any) => state.onboard.config(config)

  return (
    <OnboardContext.Provider
      value={useMemo(() => [state, { setWallet, resetWallet, setConfig }], [state, setWallet, resetWallet, setConfig])}
    >
      {children}
    </OnboardContext.Provider>
  );
};

export const useOnboard = () => {
  const [{ onboard }] = useOnboardContext();
  return onboard;
};

export const useGetState = () => {
  const [{ onboard }] = useOnboardContext();
  return onboard.getState();
};

export const useWallet = () => {
  const [{ wallet }] = useOnboardContext();
  return wallet;
};

export const useWeb3 = () => {
  const [{ web3 }] = useOnboardContext();
  return web3;
};

export default OnboardProvider;
