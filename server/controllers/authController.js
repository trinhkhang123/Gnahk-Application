const { hashPassword, comparePassword } = require('../helpers/auth');
const User = require('../models/user')
const HistoryTransaction = require('../models/historyTransaction')
const jwt = require('jsonwebtoken')
const { addABI } = require("abi-decoder");

const { useState } = require( "react")

//sets up web3.js
const fs = require('fs')
const assert = require('assert')
const { bigInt } = require('snarkjs')
//const bigInt = require('../bigInt')
const crypto = require('crypto')
const Web3 = require('web3')
const { toWei } = require('web3-utils')
const web3 = new Web3("ws://127.0.0.1:8545/");
const {mimc2} = require("../src/mimc");
const {computeInput} = require("../src/compute_spend_inputs");
const snarkjs = require('snarkjs');
const { Input } = require('antd');

amountETH = 1000000000000000000;
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
    "inputs": [],
    "name": "rallyCommitment",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
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
];

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

const addHistory = async(req,res) => {
  try {
    const {address,type,status,time} = req.body;
    const history = await HistoryTransaction.create({
      address: address,
    typeTransaction: type,
    status : status,
    time:time
    });

    return res.json({
      status:"Success"
    })
  }catch(error) {
    return res.json({
      error:error
    })
  } 
}

const getHistory = async(req,res) => {
  try {
    const history = await HistoryTransaction.find({});
    return res.json(history);
  }catch(error){
    return res.json({
      error:error
    })
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
        token = jwt.sign({userName:user.userName,id:user.id,name :user.name},process.env.JWT_SECRET,{},(err, token) => {
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
    //console.log(token);
    try {
        const user= jwt.verify(token,process.env.JWT_SECRET,{});
        //console.log(res.json(user));
        web3.eth.getAccounts().then((response)=> {
          web3.eth.defaultAccount = response[user.id];
          });
        
        return res.json({
          user:user,
          address:web3.eth.defaultAccount
        });
    } catch (error) {
      return res.json({
        error:error
      })
       // console.log(error);
    }
}

web3.eth.getAccounts().then((response)=> {
  web3.eth.defaultAccount = response[0];
  });

const getBalance = async (req, res) => {
  //try{
         const token = req.query.key1;
    
        const user= jwt.verify(token,process.env.JWT_SECRET,{});
        let check = false;
         web3.eth.getAccounts().then((response)=> {
         web3.eth.defaultAccount = response[user.id];
         check = true;
         });
       //  while (check === true)
        
         let balance =await web3.eth.getBalance(web3.eth.defaultAccount);

        // console.log(balance)
         balance =await Web3.utils.fromWei(balance,'ether');

       //  console.log(balance*100,user.id,web3.eth.defaultAccount,check);
        balance = Math.floor(balance * 100000)/100000
        //console.log(user.id,web3.eth.defaultAccount,balance);
         return res.json(balance)
      // }
      // catch(error) {
      //   //console.log(3);
      //   return res.json({
      //     error: error
      //   })
      // }
}

const accountUser = async (req,res) => {
  try {
    async function deposit() {
        const _deposit = await createDeposit(rbigint(10000),rbigint(10000));
        
         const have_commitment = await exchange_contract.methods.haveCommitment(_deposit.commitment).call({from:web3.eth.defaultAccount});;
         console.log(have_commitment);
         
         if (have_commitment == true) await deposit();

         _deposit.note  = `tornado-${amountETH}-${_deposit.nullifier}-${_deposit.nonce}`; 
         //console.log(_deposit);

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
        //console.log(44440);
         const _deposit = await deposit();
        // console.log(_deposit.commitment.toString());
        //console.log(web3.eth.defaultAccount)
        // //console.log(await web3.utils.numberToHex(_deposit.commitment))
        //console.log(_deposit);
        await exchange_contract.methods.deposit(_deposit.commitment.toString()).send({from:web3.eth.defaultAccount,value : amountETH,gas : 999999});
        
        give_code = (await _deposit.note);
        return give_code;
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
       //   console.log(1);
            return BigInt(o);
        } else if (Array.isArray(o)) {
         // console.log(2);
            return o.map(unstringifyBigInts);
        } else if (typeof o == "object") {
            const res = {};
            
            for (let k in o) {
              
                res[k] = unstringifyBigInts(o[k]);
                //if (k === 'pi_a') break;
            }
            return res;
        } else {
            return o;
        }
      }
      
      function hexifyBigInts(o) {
        if (typeof (o) === "BigInt" || (o instanceof BigInt)) {
            let str = o.toString(16);
            while (str.length < 64) str = "0" + str;
            str = "0x" + str;
            return str;
        } else if (Array.isArray(o)) {
            return o.map(hexifyBigInts);
        } else if (typeof o == "object") {
            const res = {};
            //console.log(o);
            for (let k in o) {
              //console.log(k)
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

        //console.log(result['pi_b'])

        
        return hexifyBigInts(unstringifyBigInts(result));
      }

      async function createInput(note) {
        const deposit = await parseNote(note);
      
        const input = await Computer_Input(deposit.nullifier,deposit.nonce);
        
        if (input == null) await exchange_contract.methods.notificationError();
        //console.log(input);

        return input;
      }
      
      async function withdraw (recipient, input, proof, publicSignals)
      {
        try {
          const proofData = proof ;
      
          proofData.publicSignals = publicSignals;

          //console.log(proofData);
      
          console.log('Sending withdrawal transaction...')
      
          const proofInputToSolidity = toSolidityInput(proofData);

          //console.log(BigInt('18879562080970525320996005855600628712328136486017247114795732095951997950034'));
          //console.log(proofInputToSolidity)
          const p = [];
          p.push(proofInputToSolidity["pi_a"][0]);
          p.push(proofInputToSolidity["pi_a"][1]);
          p.push(proofInputToSolidity["pi_b"][0][0]);
          p.push(proofInputToSolidity["pi_b"][0][1]);
          p.push(proofInputToSolidity["pi_b"][1][0]);
          p.push(proofInputToSolidity["pi_b"][1][1]);
          p.push(proofInputToSolidity["pi_c"][0]);
          p.push(proofInputToSolidity["pi_c"][1]);
          ///console.log(await web3.eth.abi.decodeParameter('uint',18538596200025013235579571467043574072151228346794728502008526951979190450418));
          // p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_a"][0]));
          // p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_a"][1]));
          // p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_b"][0][0]));
          // p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_b"][0][1]));
          // p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_b"][1][0]));
          // p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_b"][1][1]));
          // p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_c"][0]));
          // p.push(await web3.eth.abi.decodeParameter('uint',proofInputToSolidity["pi_c"][1]));
          //console.log(web3.eth.abi.decodeParameter('uint[][]',proofInputToSolidity["pi_b"]));
       
      //     //console.log(await web3.utils.hexToNumber(proofInputToSolidity.publicSignals[1]));
      //  //console.log(p)
        //console.log(p);
        
         const tx = await exchange_contract.methods.withdraw(
           recipient,p,input.digest,input.nullifier).send({from:web3.eth.defaultAccount});
           return tx;
         }catch (error) {
          return {error:error};
          //console.log(error);
         }
        }

        const token = req.query.key1;
    
        const user= jwt.verify(token,process.env.JWT_SECRET,{});

        web3.eth.getAccounts().then((response)=> {
        web3.eth.defaultAccount = response[user.id];
        });

        

        if (req.query.key2 === 'create') {
 
           const give_code = await depositFinal();
        //   //console.log(req.query.key2);
          
         //console.log(give_code);
        //   console.log(balance)
          return res.json({
          data : give_code
        });
         }
        else if(req.query.key2 === 'createInput'){
          const input = await createInput(req.query.key3)
          //console.log(input);
          return res.json({
            input: input
          })
        }
        else if(req.query.key2 === 'withdraw') {
          try {
            var check = false;
           // const [check,setCheck] = useState(false);
           // console.log(web3.eth.defaultAccount);
            await web3.eth.getAccounts().then((response)=> {
            for(var item in response) {
             // console.log(item,req.query.key3,response[item]);
              if (req.query.key3 === response[item]) {
                check = true;
              }
            }
            
          });    // console.log(req.query.key5,req.query.key6)
          //console.log(check);
          if (check === true) {
           // console.log(44);
          const result= await withdraw(req.query.key3,req.query.key4,req.query.key5,req.query.key6);
          if (result.error) {

          return res.json({
            error : result.error.data.message,
          });
          }
          else  {
          return res.json({
            data : result,
          });
        }
      }
      else {
        return res.json({
          error:"Địa chỉ người nhận không tồn tại"
        })
      }
      }
      catch(error)
      {
        console.log(error);
      }
      }
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
    accountUser,
    getBalance,
    addHistory,
    getHistory
};