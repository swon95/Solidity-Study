// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "contracts/MintAnimalToken.sol";

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

    // 구매 기능 영역
    function purchaseAnimalToken(uint256 _animalTokenId) public payable {
        uint256 price = animalTokenPrices[_animalTokenId];

        // 토큰 소유자의 주소 가져오기
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(
            _animalTokenId
        );

        // require = 조건
        // price 가 0 보다 커야함.
        require(price > 0, "Animal token not sale");

        // 함수를 실행할 때 보내는 값의 양이 판매 등록된 가격보다 작거나 같음.
        require(price <= msg.value, "Caller sent lower than price.");

        // 토큰의 소유자가 아닐경우 true (판매 조건과 반대)
        require(
            animalTokenOwner != msg.sender,
            "Caller is animal token owner."
        );

        // 함수를 실행한 msg.sender 에 가격 price 만큼의 양 msg.value 이 토큰 주인 animalTokenOwner 에게 전송
        payable(animalTokenOwner).transfer(msg.value);

        // 인자로 보내는 사람(animalTokenOwner), 받는 사람(msg.sender), 무엇을 보낼것인지(_animalTokenId) 을 넘김
        mintAnimalTokenAddress.safeTransferFrom(
            animalTokenOwner,
            msg.sender,
            _animalTokenId
        );

        // 초기화
        animalTokenPrices[_animalTokenId] = 0;

        // i 는 배열의 길이만큼 반복
        // 1 개씩 증가
        for (uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            // 1 개씩 증가하는 동안
            // 가격을 초기화 한 animalTokenPrices 에 판매중인 배열을 넣고,
            // 배열 안에 가격이 0 원인 (_animalTokenId) 를 만나면 제거
            if (animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) {
                // 배열의 맨 마지막 인덱스(요소)를 i 와 교체 해주고, 맨 뒤에 위치한 인덱스를 제거
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[
                    onSaleAnimalTokenArray.length - 1
                ];
                // pop 메소드를 통해 배열의 마지막 요소는 제거되며 기존에 있던 i 는 제거
                onSaleAnimalTokenArray.pop();
            }
        }
    }

    // front 영역
    // 판매중인 토큰 배열의 길이를 출력하는 함수
    // 읽기 전용 view
    function getSaleAnimalTokenArrayLength() public view returns (uint256) {
        // 길이를 반환
        return onSaleAnimalTokenArray.length;
    }
}
