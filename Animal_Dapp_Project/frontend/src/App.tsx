import React, { FC, useEffect, useState } from "react";
import { Button } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './routes/main';

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

  // Web3 연결
  useEffect(() => {
    getAccount()
  }, []);
  
  // 연결된 주소 확인
  useEffect(() => {
    console.log(account)
  },[account])

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
