//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol"; //Enables console logging for dev purposes

contract Token{
    string public name; //Create a string-type state variable (stored on-chain, scope is entire contract). Statically typed lang -> have to assign variable type at declaration. 
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply; // 1,000,000 * 10^18

    //Track balances
    mapping(address => uint256) public balanceOf;

    //Send tokens

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals);
        balanceOf[msg.sender] = totalSupply; //This is how we access data in a mapping
    }
}
//Good  practice in development to save files with a newline at the end.