import React, { useState } from "react";
        import { WindowMessageTransport, WalletAPIClient, Account } from '@ledgerhq/wallet-api-client';
        import { useEffect, useRef, useCallback } from 'react';
      import { render as renderReactDom} from "react-dom"; 
     
      const App = () => { 
        const [response, setResponse] = useState({
          accounts: [],
        })
        const walletInstance = useRef(null);
        let currencies;
        let capabilities;
      
        useEffect(() => {
          const transport = new WindowMessageTransport(parent);
          transport.connect();
          walletInstance.current = new WalletAPIClient(transport);
        }, []);
      
        const getAccounts = async () => {
          if (walletInstance.current) {
            try {
              setResponse(await walletInstance.current.listAccounts());
            } catch (e) {
              console.log(e);
            }
          }
        };
        
      
        const getCurrencies = async () => {
          if (walletInstance.current) {
            try {
              currencies = await walletInstance.current.listCurrencies();
            } catch (e) {
              console.log(e);
            }
          }
        };
      
        const getCapabilities = async () => {
          if (walletInstance.current) {
            try {
              capabilities = await walletInstance.current.capabilities();
            } catch (e) {
              console.log(e);
            }
          }
        };
      

        return (<div><button onClick={getAccounts}>getAccounts</button>
        <button onClick={getCurrencies}>getCurrencies</button>
        <button onClick={getCapabilities}>getCapabilities</button>
        <div style={{ color: 'white', border: 'solid grey 1px', marginTop: '10px', backgroundColor: '#111', padding: '10px' }}>
              {response.accounts.result?.map((account, index) => {
                return <p key={index}>{account.name}: {account.address}</p>;
              })}
            </div></div>)
     }

        renderReactDom(<App />, document.getElementById("root"));