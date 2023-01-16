// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Storage {
    uint x = 90;
    uint y = 486;

    mapping(uint => uint) testing;

    constructor() {
        testing[84] = 177;
        testing[23] = 20;
    }
}
