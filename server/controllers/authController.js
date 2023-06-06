const { hashPassword, comparePassword } = require('../helpers/auth');
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { addABI } = require("abi-decoder");

const { useState } = require( "react")

//sets up web3.js
const fs = require('fs')
const assert = require('assert')
const { bigInt } = require('snarkjs')
const crypto = require('crypto')
const Web3 = require('web3')
const { toWei } = require('web3-utils')
const web3 = new Web3("ws://127.0.0.1:8545/");
const mimc = require("../src/mimc");
const compute_spend_input = require("../src/compute_spend_inputs");

let give_code = "underfi";
            // TODO: replace with symbol for your token

var BN = web3.utils.BN;


// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================
// TODO: Paste your token contract address and ABI here:
// TODO: Paste your exchange address and ABI here
const exchange_abi =  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addressVerifier",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "s",
          "type": "string"
        }
      ],
      "name": "StringToUint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "commitment",
          "type": "string"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "eth_denominator",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSenderBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "commitment",
          "type": "string"
        }
      ],
      "name": "haveCommitment",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "rally_commitments",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "verifier",
      "outputs": [
        {
          "internalType": "contract IVerifier",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "p",
          "type": "uint256[]"
        },
        {
          "internalType": "string",
          "name": "digest",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "nullifier",
          "type": "string"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ] ;

const exchange_address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';                
const exchange_contract = new web3.eth.Contract(exchange_abi, exchange_address);

const rbigint = (Max) => Math.floor(Math.random() * Max) + 1;

const test = (req, res) => {
    res.json('test is working');
}

const registerUser = async (req,res) => {
    try {
        const {name, userName,password} = req.body;
        if (!name) {
            return res.json({
                error : 'name is required'
            })
        }

      //  console.log(1);

        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        }       // console.log(2);


        const exist = await User.findOne({userName})

        if(exist) {
            return res.json({
                error: 'userName is taken already'
            })
        } 
     //   console.log(3);

        if(!userName || userName.length < 6) {
            return res.json({
                error: 'userName is required and should be at least 6 characters long'
            })
        }
        //console.log(4);
        let countUser =await User.countDocuments({})
    .then((count) => {
        
      //console.log(`Total number of users: ${count}`);
      return count;
    })

    .catch((err) => {
      console.error(err);
    });


        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            userName,
            password:hashedPassword,
            id : countUser
        })


        return res.json(user);
    } catch (error) {
        return res.json(error);
    }
}

const loginUser = async (req,res) => {
    try{
        const {userName,password} = req.body;
       // console.log(password);
        const user = await User.findOne({userName})
        //console.log(user);
        if(!user) {
            return res.json({
                error:'No user found'
            })
        }
        
        const check =await comparePassword(password,user.password) ;
        //console.log(check)
    if(check) {
        token = jwt.sign({userName:user.userName,id:user._id,name :user.name},process.env.JWT_SECRET,{},(err, token) => {
            if (err) throw err;
            return res.json({
                status : "ok",
                data : token
            })
        }
        )
    }
    if(!check) {
        return res.json({  
            error: 'Password wrong'
        })
    }
    }

    catch(error) {
        console.log(error);
    }
}

const getProfile = (req,res) => {
    const token = req.query.key1;
    
    try {
        const user= jwt.verify(token,process.env.JWT_SECRET,{});
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

const accountUser = async (req,res) => {
    

    async function deposit() {
        const _deposit = await createDeposit(rbigint(10000),rbigint(10000));
         const have_commitment = await exchange_contract.methods.haveCommitment(_deposit.commitment).call({from:web3.eth.defaultAccount});;
         
         if (have_commitment == true) await deposit();
         console.log(_deposit.commitment);
         _deposit.note  = `tornado-${AMOUNT}-${_deposit.nullifier}-${_deposit.nonce}`; 
         return _deposit
      }
      
      async function parseNote(noteString) {
        const noteRegex = /tornado-(?<amount>[\d.]+)-(?<nullifier>\w+)-(?<nonce>\w+)/g; 
        const match = noteRegex.exec(noteString)
         const nullifier = match.groups.nullifier;
         const nonce = match.groups.nonce;
         return createDeposit(nullifier, nonce)
      }
      
      function createDeposit(nullifier, nonce) {
        let deposit = { nullifier, nonce }
        deposit.commitment = mimc2(deposit.nullifier,deposit.nonce);
        return deposit
      }
      
      async function Computer_Input(nullifier, nonce) {
        const transcript = await exchange_contract.methods.rallyCommitment().call({from : web3.eth.defaultAccount});
        const snark_input = await  computeInput(10,transcript,nullifier,nonce);
        return snark_input;
      }
      /*** SWAP ***/
      
      async function depositFinal() {
        const _deposit = await deposit();
        
        //console.log(await web3.utils.numberToHex(_deposit.commitment))
        await exchange_contract.methods.deposit(_deposit.commitment.toString()).send({from:web3.eth.defaultAccount,value : amountETH,gas : 999999});
        
        give_code = (await _deposit.note);
      }
      
      function stringifyBigInts(o) {
        if ((typeof(o) == "bigint") || o.isZero !== undefined)  {
            return o.toString(10);
        } else if (Array.isArray(o)) {
            return o.map(stringifyBigInts);
        } else if (typeof o == "object") {
            const res = {};
            for (let k in o) {
                res[k] = stringifyBigInts(o[k]);
            }
            return res;
        } else {
            return o;
        }
      }
      
      function unstringifyBigInts(o) {
        if ((typeof(o) == "string") && (/^[0-9]+$/.test(o) ))  {
            return bigInt(o);
        } else if (Array.isArray(o)) {
            return o.map(unstringifyBigInts);
        } else if (typeof o == "object") {
            const res = {};
            for (let k in o) {
                res[k] = unstringifyBigInts(o[k]);
            }
            return res;
        } else {
            return o;
        }
      }
      
      function hexifyBigInts(o) {
        if (typeof (o) === "bigInt" || (o instanceof bigInt)) {
            let str = o.toString(16);
            while (str.length < 64) str = "0" + str;
            str = "0x" + str;
            return str;
        } else if (Array.isArray(o)) {
            return o.map(hexifyBigInts);
        } else if (typeof o == "object") {
            const res = {};
            for (let k in o) {
                res[k] = hexifyBigInts(o[k]);
            }
            return res;
        } else {
            return o;
        }
      }
      
      
      function toSolidityInput(proof) {
        const result = {
            pi_a: [proof.pi_a[0], proof.pi_a[1]],
            pi_b: [[proof.pi_b[0][1], proof.pi_b[0][0]], [proof.pi_b[1][1], proof.pi_b[1][0]]],
            pi_c: [proof.pi_c[0], proof.pi_c[1]],
        };
        if (proof.publicSignals) {
            result.publicSignals = proof.publicSignals;
        }
        return hexifyBigInts(unstringifyBigInts(result));
      }
      
      async function withdraw (note, recipient)
      {
        const deposit = await parseNote(note);
      
        const input = await Computer_Input(deposit.nullifier,deposit.nonce);
        
        if (input == null) await exchange_contract.methods.notificationError();
      
        const {proof , publicSignals } = await snarkjs.groth16.fullProve(
          input, 
          `\\circuits\\spend_js\\spend.wasm`,
          `\circuits\\spend_final.zkey`,
          );
      
          const proofData = proof ;
      
          proofData.publicSignals = publicSignals;
      
          console.log('Sending withdrawal transaction...')
      
          const proofInputToSolidity = toSolidityInput(proofData);
          
          const p = [];
          p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_a"][0]));
          p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_a"][1]));
          p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_b"][0][0]));
          p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_b"][0][1]));
          p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_b"][1][0]));
          p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_b"][1][1]));
          p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_c"][0]));
          p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_c"][1]));
         // console.log(web3.eth.abi.decodeParameter('uint[][]',proofInputToSolidity["pi_b"]));
       
          //console.log(await web3.utils.hexToNumber(proofInputToSolidity.publicSignals[1]));
       
         const tx = await exchange_contract.methods.withdraw(
           recipient,p,input.digest,input.nullifier).send({from:web3.eth.defaultAccount});
        }

    const token = req.query.key1;
    try {
        const user= jwt.verify(token,process.env.JWT_SECRET,{});

        web3.eth.getAccounts().then((response)=> {
        web3.eth.defaultAccount = response[user.id];
        });

        if (req.query.key2 == 'create') {
          depositFinal();
        }
        else {
          withdraw(req.query.key3,req.query.key3);
        }
        return res.json({
          proof : give_code
        }
          
        );
    } catch (error) {
        return res.json({
          error: error
        });
    }



}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    accountUser
};