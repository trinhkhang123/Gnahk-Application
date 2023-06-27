import { Input, Button, Modal } from "antd";
import { useState } from "react";
//import {snarkjs } from "snarkjs"
import axios from 'axios'
export default function WithdrawTransaction() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [proofVerify, setProof] = useState('')
    const [receive, setReceive]  = useState('')
    const [note,setNode] = useState('Giao dịch thành công')
    var address;
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        if (note === 'Giao dịch thành công') location.reload(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getProfile = async () => {
        const token = await localStorage.getItem("token");
        const responce = await axios.get('/profile',{
            params: {
                key1: token
            }
          })

         // console.log(responce.data.address);

          address = responce.data.address;

          //console.log(address);
      }
    const handleClick = async () => {
        try{
        getProfile();
        //showModal();
        const token = await localStorage.getItem('token');
        let responce = await axios.get('/accountUser',{
            params: {
                key1: token,
                key2: 'createInput',
                key3: proofVerify
            }
          });
         const input = responce.data.input;

       //  console.log(input);

        const {proof , publicSignals } = await snarkjs.groth16.fullProve(
            input, 
            `spend.wasm`,
            `spend_final.zkey`,
            );
            console.log(proof);

        responce = await axios.get('/accountUser',{
            params: {
                key1: token,
                key2: 'withdraw',
                key3: receive,
                key4: input,
                key5:proof,
                key6:publicSignals
            }
          })

          console.log(responce.data.error);
          var status="Thành công";
          if (responce.data.error) {
            status = "Thất bại";
            setNode(responce.data.error)
          }
          else {
            setNode('Giao dịch thành công')
          }
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
          //console.log(status)
          const responceH = await axios.post('/addHistory',{
            address: address,
            type: "Withdraw",
            status : status,
            time : dateTime
      });  

    console.log(status);
            showModal();
    }
    catch(error) {
        setNode('Proof không chính xác');
        showModal();
        console.log(error);
    }
    }

    return (
        <div className="wrapper">
            <div className="inner">
                <h4>Withdraw Transaction</h4>
                <Input placeholder="Your proof:" onChange={(e) => setProof(e.target.value)}  />
                <Input placeholder="Receive:" onChange={(e) => setReceive(e.target.value)}  />
                <Button type="primary" onClick={handleClick}>Withdraw</Button>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <h3>{note}</h3>
                </Modal>
            </div>
        </div>
    )
}