// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./StorageSlot.sol";

contract Proxy {
    uint x = 0;
    address implementation;

    function changeImplementation(address _implementation) external {
        implementation = _implementation;
    }

    fallback() external {
        (bool s, ) = implementation.delegatecall(msg.data);
        require(s);
    }
}

contract Logic1 {
    uint x = 0;

    function changeX(uint _x) external {
        x = _x;
    }
}

contract Logic2 {
    uint x = 0;

    function changeX(uint _x) external {
        x = _x;
    }

    function tripleX() external {
        x *= 3;
    }
}
