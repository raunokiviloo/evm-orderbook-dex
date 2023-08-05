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

    event Transfer(address indexed from, address indexed to, uint256 value); //How to define event. Use capital letter.

    //Send tokens

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals);
        balanceOf[msg.sender] = totalSupply; //This is how we access data in a mapping
    }

    function transfer(address _to, uint256 _value) public returns (bool success)
    {
        //Require that sender has enough tokens to spend
        require(_value <= balanceOf[msg.sender]);
        require(_to != address(0));
        //Deduct tokens from spender
        balanceOf[msg.sender] -= _value;
        //Credit tokens to receiver
        balanceOf[_to] += _value;
        
        //Emit event
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
//Good  practice in development to save files with a newline at the end.