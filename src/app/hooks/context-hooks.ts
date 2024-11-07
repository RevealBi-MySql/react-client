import { createContext, Dispatch, useContext, useEffect, useState } from 'react';

export const GlobalContext = createContext<{globalState: GlobalStateInterface, setGlobalState: Dispatch<React.SetStateAction<GlobalStateInterface>>}>(undefined as any);
export const useGlobalContext = () => useContext(GlobalContext);
declare var $: any;

export const useGlobalState = () => {
  const initialState = {
    revealServer: 'http://localhost:5111'
  } as GlobalStateInterface;

  const [globalState, setGlobalState] = useState<GlobalStateInterface>(initialState);

  useEffect(() => {
    // Set the Reveal SDK base URL once on initialization
    $.ig.RevealSdkSettings.setBaseUrl(globalState.revealServer);
  }, [globalState.revealServer]);

  return { globalState, setGlobalState };
};

interface GlobalStateInterface {
  revealServer: string;
}
