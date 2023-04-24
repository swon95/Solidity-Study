// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract FlightLog {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    // 로그 구조체
    struct Log {
        // 이륙 시간
        // :point_down: hour : minute
        string takeoffTime;
        string landingTime;
        bool managerSign;
        bool studentSign;
        string flight;
        address studentAddress;
    }
    // 구조체 배열 선언
    Log[] logs;

    // 로깅 시작
    function logging(
        string memory _takeOffTime,
        string memory _flightNum
    ) public {
        logs.push(
            Log(
                _takeOffTime,
                "",
                false,
                false,
                string.concat("HL-", _flightNum),
                msg.sender
            )
        );
    }

    function getOwner() public view returns (address) {
        return msg.sender;
    }

    // 관리자의 서명
    function doManagerSign(uint _index) public {
        require(owner == msg.sender, "Your not manager!");
        logs[_index].managerSign = true;
    }

    // 교육생의 서명
    function doStudentSign(uint _index) public {
        require(logs[_index].studentAddress == msg.sender, "Your not student!");
        logs[_index].studentSign = true;
    }

    // 도착시간 업데이트
    function logLandingTime(uint _index, string memory _landingTime) public {
        logs[_index].landingTime = _landingTime;
    }

    // 로그 확인
    function getLog(uint _index) public view returns (Log memory) {
        return logs[_index];
    }
}
