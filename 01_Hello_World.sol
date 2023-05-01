// 최 상단에 라이센스를 명시해주어야 컴파일 시 warring 없음 !
// SPDX-License-Identifier: GPL-3.0

// 컴파일러의 버전을 지정
// 0.8.2 이상 0.9.0 미만
pragma solidity >=0.8.2 <0.9.0;

contract HelloWorld {
    // 세미콜론 생략 시 에러 발생
    string greet = "Hello World !!";

    function hello() public view returns (string memory) {
        return greet;
    }
}
