// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// ERC721
// NFT 인터페이스를 정의하는 규칙
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    // contract 가 build 될 때 한번 실행되는 constructor
    constructor() ERC721("SimJunko", "SSW") {}

    // animalTokenId => animalTypes
    mapping(uint256 => uint256) public animalTypes;

    function mintAnimalToken() public {
        // animalTokenId = NFT 가 가지고 있는 유일한 값
        // totalSupply = 현재까지 발행된(민팅된) 개수(양)
        uint256 animalTokenId = totalSupply() + 1;

        // 1~5 의 NFT 가 랜덤으로 나오게
        // block.timestamp = 함수를 실행한 시간
        // msg.sender = 함수를 실행한 사람
        uint256 animalType = (uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, animalTokenId)
            )
        ) % 5) + 1;

        // mapping
        animalTypes[animalTokenId] = animalType;

        // msg.sender = 명령어를 실행한 사람 = 민팅을 시도한 사람
        _mint(msg.sender, animalTokenId);
    }
}
