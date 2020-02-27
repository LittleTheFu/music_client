import React, { createContext } from 'react';

export interface AppContextInterface {
    gContextName: string;
}

export const ctxt = createContext<AppContextInterface>(null);

export const AppContextProvider = ctxt.Provider;

export const AppContextConsumer = ctxt.Consumer;

export const sampleAppContext: AppContextInterface = {
    gContextName: 'Using React Context in a Typescript App',
};
