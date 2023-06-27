import { Input, Button, Modal } from "antd";
import { useState } from "react";
import axios from 'axios'
import jwt from 'jsonwebtoken'
import Web3 from 'web3'
const web3 = new Web3("ws://127.0.0.1:8545/");
import {mimc2} from "../src/mimc";
import {computeInput} from "../src/compute_spend_inputs";

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================
// TODO: Paste your token contract address and ABI here:
// TODO: Paste your exchange address and ABI here
const exchange_abi =  [
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
  }
];

const exchange_address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';                
const exchange_contract = new web3.eth.Contract(exchange_abi, exchange_address);

const rbigint = (Max) => Math.floor(Math.random() * Max) + 1;
export default function WithdrawTransaction() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [proof, setProof] = useState('')
    const [receive, setReceive]  = useState('')
    const [note,setNode] = useState('Giao dịch thành công')

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        //location.reload(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleClick = async () => {
        async function deposit() {
            const _deposit = await createDeposit(rbigint(10000),rbigint(10000));
             const have_commitment = await exchange_contract.methods.haveCommitment(_deposit.commitment).call({from:web3.eth.defaultAccount});;
             
             if (have_commitment == true) await deposit();
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
            //console.log(44440);
             const _deposit = await deposit();
            // console.log(_deposit.commitment.toString());
            //console.log(web3.eth.defaultAccount)
            // //console.log(await web3.utils.numberToHex(_deposit.commitment))
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
            token = await localStorage.getItem('token'); 
            const user= jwt.verify(token,process.env.JWT_SECRET,{});
            web3.eth.getAccounts().then((response)=> {
                web3.eth.defaultAccount = response[user.id];
                });
            const deposit = await parseNote(note);
          
            const input = await Computer_Input(deposit.nullifier,deposit.nonce);
            
            if (input == null) await exchange_contract.methods.notificationError();
            console.log(input);
    
            //return input;
            const {proof , publicSignals } = await snarkjs.groth16.fullProve(
              input, 
              `./spend.wasm`,
              `./spend_final.zkey`,
              );
              return 1;
    
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
              //console.log(web3.eth.abi.decodeParameter('uint[][]',proofInputToSolidity["pi_b"]));
           
              //console.log(await web3.utils.hexToNumber(proofInputToSolidity.publicSignals[1]));
           
             const tx = await exchange_contract.methods.withdraw(
               recipient,p,input.digest,input.nullifier).send({from:web3.eth.defaultAccount});
            }
        //showModal();
        // const token = await localStorage.getItem('token');
        // const responce = await axios.get('/accountUser',{
        //     params: {
        //         key1: token,
        //         key2: 'withdraw',
        //         key3: proof,
        //         key4: receive
        //     }
        //   })
        //   if (responce.data.error){
        //     //console.log(data)setIsModalOpen(true);
            
        //     //console.log(responce)
        //     setNode('Giao dịch thất bại')
        //     }
        //     else {
              
        //       //console.log(responce.data.data);
        //       setProof(responce.data.data);
        //     }
        withdraw(proof,receive);
            showModal();
    }

    return (
        <div className="wrapper">
            <div className="inner">
                <h4>Withdraw Transaction</h4>
                <Input placeholder="Your proof:" onChange={(e) => setProof(e.target.value)}  />
                <Input placeholder="Receive:" onChange={(e) => setReceive(e.target.value)}  />
                <Button type="primary" onClick={handleClick}>Transfer</Button>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <h3>Giao dịch thành công</h3>
                </Modal>
            </div>
        </div>
    )
}