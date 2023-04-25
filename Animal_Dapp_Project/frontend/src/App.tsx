import React, { FC, useEffect, useState } from "react";
import { Button } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './routes/main';
import { mintAnimalTokenContract } from './contracts';

const App: FC = () => {

  // 현재 지갑의 주소를 담기위한 State
  const [account, setAccount] = useState<string>("")

  // 지갑 가져오기
  const getAccount = async () => {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
      setAccount(accounts[0])
    } else {
      alert("Install need Metamask !")
    }
    } catch (error) {
        console.error(error);
    }
  }

  // const getBalanceOf = async () => {
  //   const response = await mintAnimalTokenContract.methods
  //   .balanceOf(account)
  //   .call()

  //   console.log(response)
  // }
  // Web3 연결
  useEffect(() => {
    getAccount()

    // if (account) {
    //   getBalanceOf()
    // }
  }, [account]);
  
  // 연결된 주소 확인
  useEffect(() => {
    console.log(account)
  },[account])

  return(
    <BrowserRouter>
      <Routes>
        {/* Main 컴포넌트에 account props, 부모 컴포넌트에서 타입을 지정해줘야됨 */}
        <Route path='/' element={<Main account={account}/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
