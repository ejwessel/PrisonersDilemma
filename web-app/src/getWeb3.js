import Web3 from "web3";
import PrisonersDilemma from "../json/PrisonersDilemma.json";
const FALLBACK_WEB3_PROVIDER = process.env.REACT_APP_NETWORK || 'http://0.0.0.0:8545';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        console.log(web3.version);
        try {
          // Request account access if needed
          var enable_output = await window.ethereum.enable();
          console.log(enable_output);
          // Acccounts now exposed
          resolve(web3);

          //console.log(web3.accounts);
          var accounts = await web3.eth.getAccounts();
       

          var contract_abi = PrisonersDilemma['abi'];
          var contract = await new web3.eth.Contract(contract_abi);
          console.log("contract instance: ");
          console.log(contract);

          var contract_byte_code = PrisonersDilemma['bytecode'];
          var options = {
              data : contract_byte_code, 
              arguments : [
                  [accounts[0], 0, 0],
                  [accounts[0], 0, 0],
                  [20, 5, 1, 0]
              ]
          };

          var contract = await contract.deploy(options)
          .send({
            from: accounts[0],
            gas: 15000,
            gasPrice: '300000'
        });

        console.log(contract);
        console.log("contract should ahve an address now!");
        console.log(contract._address);

        //  var signature = await web3.eth.personal.sign('testing', accounts[0], "");
        //  console.log("signature: " + signature);

        //  var account = await web3.eth.personal.ecRecover('testing', signature, "");
        //  console.log(account);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        console.log("window.web3");
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
        console.log(web3.version);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        console.log("provider");
        const provider = new Web3.providers.HttpProvider(
          FALLBACK_WEB3_PROVIDER
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Infura/Local web3.");
        resolve(web3);
      }
    });
  });

const getGanacheWeb3 = () => {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    return null;
  }
  const provider = new Web3.providers.HttpProvider(
    'http://0.0.0.0:8545'
  );
  const web3 = new Web3(provider);
  console.log("No local ganache found.");
  return web3;
}

export default getWeb3;
export { getGanacheWeb3 };
