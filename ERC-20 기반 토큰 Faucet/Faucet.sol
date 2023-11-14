// contracts/Faucet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IERC20 {
    // erc20 토큰을 다른 주소로 전송하는 함수 
    // 👉 인자로는 전송하고자 하는 대상의 주소,
    // 👉 전송할 토큰의 양
    
    // 외부에서 transfer 함수를 읽기 전용으로 호출하기 위해 external view 사용
    // 👉 해당 함수가 성공하면 true or 실패 시 false
    function transfer(address to, uint256 amount) external view returns (bool);

    // erc20 토큰의 잔액을 확인하는 함수
    // 👉 잔액을 확인하고자 하는 주소(account)
    // 👉 특정 주소의 계정에 남아있는 특정 토큰의 양을 반환
    function balanceOf(address account) external view returns (uint256);
}
contract Faucet {
    // 소유자는 자신의 토큰을 인출할 수 있음 
    address payable owner;
    // 상태 변수 선언 👉 공개
    IERC20 public token;

    // 초기 토큰 값 설정
    uint256 public withdrawlAmount = 50 * (10**18);
    
    // constructor 함수는 Faucet 컨트랙트가 생성될 때 호출
    // ERC-20 토큰의 주소를 받아 token 변수에 할당
    // 소유자는 msg.sender 를 통해 함수를 호출한 계정의 주소를 owner 변수에 할당
    // 👉 payable == 컨트랙트에 이더를 전송할 수 있는 기능
    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    function requestTokens() public {
        token.transfer(msg.sender, withdrawlAmount);
    }
}