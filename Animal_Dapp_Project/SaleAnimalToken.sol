// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress;

    // MintAnimalToken 을 Deploy 했을때의 주소를 담는 _mintAnimalTokenAddress
    constructor(address _mintAnimalTokenAddress) {
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);
    }

    // 가격을 관리하는 mapping
    mapping(uint256 => uint256) public animalTokenPrices;

    // Client 가 판매중인 토큰을 확인할 수 있게 front 에서 보여주는 배열
    uint256[] public onSaleAnimalTokenArray;

    // 판매 등록을 위한 함수
    // 판매할 TokenId, 판매할 가격
    function setForSaleAnimalToken(
        uint256 _animalTokenId,
        uint256 _price
    ) public {
        // 토큰을 소유한 사람만 판매 가능하게 예외처리
        // 소유자의 정보를 알려주는 .ownerOf
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(
            _animalTokenId
        );

        // 함수를 실행한 사람과 Token 의 소유자가 일치하는지 검증
        // false 일 경우 메세지 출력
        require(
            animalTokenOwner == msg.sender,
            "Caller is not animal token Owner."
        );

        // 가격이 0 원 이하일 경우 false
        require(_price > 0, "Price is zero or lower.");

        // 가격이 존재하거나 0 원 일 경우
        // 0 원이 아닐 경우 이미 판매 등록상태임을 알려주는 메세지 출력
        require(
            animalTokenPrices[_animalTokenId] == 0,
            "This animal token is already on sale."
        );

        // 컨트랙트에 판매 권한이 부여되었는지에 대한 여부 true or false
        require(
            mintAnimalTokenAddress.isApprovedForAll(
                animalTokenOwner,
                address(this)
            ),
            "Animal token owner did not approve token."
        );

        // TokenId 에 가격 부여
        animalTokenPrices[_animalTokenId] = _price;

        onSaleAnimalTokenArray.push(_animalTokenId);
    }
}
