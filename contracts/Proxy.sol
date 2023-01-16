// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./StorageSlot.sol";

contract Proxy {
    address implementation;

    function changeImplementation(address _implementation) external {
        implementation = _implementation;
    }
}

contract Logic1 {
    uint public x = 0;

    function changeX(uint _x) external {
        x = _x;
    }
}

contract Logic2 {
    uint public x = 0;

    function changeX(uint _x) external {
        x = _x * 2;
    }
}
