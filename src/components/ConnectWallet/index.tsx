import React from "react";
import Network from "network";
import useBeacon from "hooks/useBeacon";

const ConnectButton = (): JSX.Element => {
  const { wallet, connected, setConnected } = useBeacon();

  console.log("ConnectButton", wallet, connected)

  const connectWallet = async (): Promise<void> => {
    try {
      if (!wallet) {
        console.error("Beacon initialization")
        return;
      }

      await wallet.requestPermissions({
        network: {
          type: Network.networkType,
          rpcUrl: Network.rpcUrl,
        }
      });
      
      setConnected(true);
    }
    catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    if (wallet) {
      await wallet.client.removeAllAccounts();
      await wallet.client.removeAllPeers();
      await wallet.client.destroy();
    }
    setConnected(false);
  };

  return (
    <>
      {!connected? (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={disconnectWallet}
        >
          Disconnect wallet
        </button>
      )}
    </>
  );
};

export default ConnectButton;
