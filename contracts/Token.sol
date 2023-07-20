//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol"; //Enables console logging for dev purposes

contract Token{
    string public name = "My Token"; //Create a string-type state variable (stored on-chain, scope is entire contract). Statically typed lang -> have to assign variable type at declaration. 
}
//Good  practice in development to save files with a newline at the end.