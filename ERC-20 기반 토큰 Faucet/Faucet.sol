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

    // 실제 ERC20 에는 transfer 함수가 있으므로 새로운 인터페이스 정의
    // 👉 토큰이 전송될 때 발생하는 이벤트
    // 특정 주소(from)에서 다른 주소(to)로 얼마의 토큰이 전송되었는지를 나타내고,
    // 인덱싱된 매개변수의 값을 통해 Transfer 이벤트를 필터링 함
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract Faucet {
    // 소유자는 자신의 토큰을 인출할 수 있음 
    address payable owner;
    // 상태 변수 선언 👉 공개
    IERC20 public token;

    // 초기 토큰 값 설정 👉 소수점 18자리
    uint256 public withdrawlAmount = 50 * (10**18);
    // 사용자가 다시 토큰을 요청할 수 있는 시간 (잠금 기간) 제한 ⏲
    uint256 public lockTime = 1 minutes;
    
    // 특정 주소(to) 로 금액(amount) 이 인출되었을 때 발생하는 이벤트
    // indexed 를 통해 특정 주소로 인출된 금액을 효과적으로 검색(필터링)
    event Withdrawl(address indexed to, uint256 indexed amount);

    // 전송할 데이터 생성 👉 주소, 금액
    event Deposit(address indexed from, uint256 indexed amount); 

    // 각 사용자의 다음 토큰 요청 가능 시간을 매핑, 주소 == key 
    mapping(address => uint256) nextAccessTime;

    // 계약 소유자만이 이 함수를 호출할 수 있음
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _; // 함수의 본문을 의미하는 _; 👉 Replace, 함수의 일부분을 modifier 가 대체(_)
    }

    // constructor 함수는 Faucet 컨트랙트가 생성될 때 호출
    // ERC-20 토큰의 주소를 받아 token 변수에 할당
    // 소유자는 msg.sender 를 통해 함수를 호출한 계정의 주소를 owner 변수에 할당
    // 👉 payable == 컨트랙트에 이더를 전송할 수 있는 기능
    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    function requestTokens() public {
        // 유효한(정상적인) 주소인지 검증
        require(msg.sender != address(0), "Request must not originate from a zero account");
        // 컨트랙트 안의 잔고 확인 👉 withdrawlAmount 를 기준으로 크기를 비교하고 잔액이 충분하지 않다면 함수 실행 ❌
        require(token.balanceOf(address(this)) >= withdrawlAmount, "Insufficient balance in faucet for withdrawl requset");
        // 사용자의 다음 요청 가능 시간을 확인하고, 크거나 같으면 토큰을 다시 요청 가능
        require(block.timestamp >= nextAccessTime[msg.sender]);
        
        // 사용자가 다시 토큰을 요청할 수 있는 시간을 블록의 생성시간 + 다시 요청할 수 있는시간으로 할당
        // 👉 지속적인 faucet 을 막기 위한 예외처리
        nextAccessTime[msg.sender] = block.timestamp + lockTime;

        token.transfer(msg.sender, withdrawlAmount);
    }

    // Deposit 을 emit(실행)하고,
    // 해당 이벤트에서 발생한 사용자의 주소와 그 값(ether) 를 기록
    // 👉 외부에서도 해당 이벤트를 감지하고 추적할 수 있도록 external 사용
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Faucet 컨트랙트의 현재 잔액을 반환하는 함수 👉 외부에서 Faucet 컨트랙트 잔액을 확인하고 싶을 때 사용
    function getBalance() external view returns (uint256) {
        // IERC20 인스턴스를 통해 특정 주소에 잔액을 반환
        return token.balanceOf(address(this));
    }

    // 인출 금액 설정
    function setWithdrawlAmount(uint256 amount) public onlyOwner {
        withdrawlAmount = amount * (10**18);
    }

    // lockTime 변수의 값을 할당하는 함수
    // lockTime(변수) + amount(매개변수) * 1 minutes 👉 사용자가 토큰을 요청한 후에 다시 토큰을 요청할 수 있는데 걸리는 시간
    // ex) setLockTime(5) == lockTime 은 5분으로 설정되며,
    // 사용자는 5분동안 토큰을 다시 요청할 수 없음
    function setLockTime(uint256 amount) public onlyOwner {
        lockTime = amount * 1 minutes;
    }

    // trancfer 함수를 사용하여 컨트랙트에 보유한 모든 토큰을 인출
    function withdrawl() external onlyOwner {
        // msg.sender 👉 함수를 호출한 주소
        // token.balanceOf(address(this)) 👉 현재 계약의 잔고
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }
}