// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

contract lec3 {
    
    // ethereum 의 ether 단위와 가스

    // ex) KRW 100 원 == 1^100 원
    // 1 ether == 10^9 Gwei == 10^18 wei
    // 0.00000000000000001 ether (0이 16개 뒤에 1) == 1^-18 == 1 wei
    // 0.01 ether == 10^16 wei

    // Ethereum Yellow Paper -> https://ethereum.github.io/yellowpaper/paper.pdf

    uint256 public value = 1 ether; // 2424 gas
    uint256 public value1 = 1 wei; // 2403 gas
    uint256 public value2 = 1 gwei; // 2447 gas

}

    // 1 wei = 1
    // 1 gwei = 1,000,000,000
    // 1 eth = 1,000,000,000,000,000,000