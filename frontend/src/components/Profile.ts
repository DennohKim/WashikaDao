/** 
 * Blockchain profile will involve, connect external wallet. 
 *TODO: Use phone number, name & email which phone no will be mapped to an address for non-custodial wallets. Social Connect will be used here
 */

//@actions: request user to connect wallet & get user accounts

import { useState } from "react";
import { http, createPublicClient, createWalletClient, custom, formatEther } from "viem";
import { celo, celoAlfajores } from 'viem/chains';
import { injected } from "wagmi/connectors";

import { walletClient, getAddr } from "./client";


export default function Profile() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();

  export const contract = getContract({
    address: clientAddr,
    abi: wagmiAbi,//TODO: refactor to add abi 
    client: {
      public: publicClient,
      wallet: walletClient,
    }
  })

  async function checkForMinipay() {
    if (window.ethereum && window.ethereum.isMinipay)
      //User is using minipay wallet 
      setHideConnectBtn(true);

    connect({ connector: injected({ target: "metaMask" }) })

    //if not in minipay, trigger to switch to celo
    else if (window.ethereum && !window.ethereum.isMinipay) {
      await walletClient.switchChain({ id: celo.id })

    }
  }

  export const publicClient = createPublicClient({
    chain: mainnet,  //TODO: Add alt chains
    transport: http(),
  })


  //a better way of getting the balance 
  export async function getClientBal() {
    //getting balance in WEI 

    const _clientBal = await publicClient.getBalance({
      address: await getAddr()
    })
    //formating to ether
    const clientBal = formatEther(_clientBal)
    return clientBal;
  }


}
