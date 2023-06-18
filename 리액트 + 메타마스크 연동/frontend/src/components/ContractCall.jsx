import { useWeb3React } from "@web3-react/core";
import { ethers } from "hardhat";
import { useEffect, useState } from "react";
import GreetingArtifact from "../artifacts/contracts/Lock.sol/Lock.json";

// 코드를 다른 파일에서 재사용하기위해 export
export function ContractCall() {
    const { active, library } = useWeb3React();

    const [signer, setSigner] = useState();

    // greetingContract 의 유무를 통해 컨트랙트의 배포 유무를 확인하는 state
    const [greetingContract, setGreetingContract] = useState();

    // 배포된 contract
    const [greetingContractAddr, setGreetingContractAddr] = useState("");

    useEffect(() => {
        // library 가 없는경우
        if (!library) {
            setSigner(undefined); // 초기화
            return;
        }
        setSigner(library.getSigner());
    }, [library]);

    const handleDeployContract = (event) => {
        event.preventDefault();

        // greetingContract 가 배포된 상태라면, return
        if (greetingContract) {
            return;
        }
        async function DeployGreetingContract() {
            const Greeting = new ethers.ContractFactory(
                GreetingArtifact.abi,
                GreetingArtifact.bytecode,
                signer
            );
            try {
                // 트랜잭션을 구성하는 단계
                const greetingContract = await Greeting.deploy(
                    "Hello, Fastcampus"
                ); // Greeting.sol 생성자의 _greeting 에 들어갈 문구
                await greetingContract.deployed();
            } catch (error) {
                window.alert(
                    "Error: ",
                    error && error.message ? `${error.message}` : ""
                );
            }
        }
    };
    return (
        <>
            {/* 버튼이 비활성화 되는 기준 disabled */}
            <button
                // greetingContract 가 있는 경우 버튼을 비활성화 하고(이미 배포되어있는 상태이므로), 없는 경우 활성화
                disabled={!active || greetingContract ? true : false}
                onClick={handleDeployContract}
            >
                Deploy Greeting Contract
            </button>
            <div>
                <div>Contract address</div>
                <div>
                    {greetingContractAddr
                        ? greetingContractAddr
                        : "컨트랙트가 배포되지 않았습니다."}
                </div>
            </div>
        </>
    );
}
