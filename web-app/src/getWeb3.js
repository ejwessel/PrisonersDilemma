import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          const exposed_acct = await window.ethereum.enable();
          console.log("Using MetaMask: " + window.ethereum.isMetaMask);
          console.log("Web 3 Version: " + web3.version.api);  
          // Acccounts now exposed
          console.log("Exposed Account: " + exposed_acct);
          resolve(web3);
        } catch (error) {
          console.error("An Error occured: " + error);
          reject(error);
        }
      }
    });
  });

export default getWeb3;
