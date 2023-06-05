// =================== CS251 DEX Project =================== // 
//        @authors: Simon Tao '22, Mathew Hogan '22          //
// ========================================================= //    
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../interfaces/IERC20.sol";
import '../libraries/ownable.sol';
import '../libraries/safemath.sol';

interface IVerifier {
  function verifyProof(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input
        ) external returns (bool r) ;
}


contract TokenExchange is Ownable {
    using SafeMath for uint256;
    address public admin;
    IVerifier public immutable verifier;
            
    mapping (string => uint) commitments;
    mapping (string => int) nullifierHashes;
    mapping (address => mapping(address => uint)) tranfer_done;
    string[] public rally_commitments;
    
    uint public eth_denominator = 100;
    
    constructor(address addressVerifier) 
    {
        admin = msg.sender;
        verifier = IVerifier(addressVerifier);
    }

    function StringToUint(string memory s) public pure returns (uint) {
        bytes memory b = bytes(s);
        uint result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            uint256 c = uint256(uint8(b[i]));
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
        return result;
    }
    
    function withdraw(address _recipient,uint[] memory p,string memory digest, string memory nullifier)
        payable
        external
    {   
        require(nullifierHashes[nullifier] == 1, "The note has been already spent");
       
        //payable(_recipient).transfer(amount_eth_permanent.sub(amount_eth_permanent.mul(swap_fee_numerator).div(swap_fee_denominator)));
       
       uint[2] memory a ;
       uint[2][2] memory b ;
       uint[2] memory c;
       uint[2] memory input;

       a = [p[0],p[1]];b = [[p[2],p[3]],[p[4],p[5]]];c = [p[6],p[7]];
       
     
       input[0] = StringToUint(digest);input[1] = StringToUint(nullifier);
         require(verifier.verifyProof(a,b,c,input),   
            "Invalid withdraw proof"
         );
        nullifierHashes[nullifier] = 1;

        payable(_recipient).transfer(eth_denominator);
       
    }

    function deposit(string memory commitment) payable external {
        if (msg.value >= eth_denominator && commitments[commitment] == 0) {
            
            commitments[commitment] = 1;
        }
    }

    function haveCommitment(string memory commitment) public view returns (bool) {
        return (commitments[commitment] > 0 );
    }

     function getSenderBalance() external view returns (uint256) {
        return msg.sender.balance;
    }
}
