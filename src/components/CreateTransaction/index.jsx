import { Input, Button, Modal } from 'antd';
import "./CreateTransaction.css"
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function CreateTransaction() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [proof, setProof] = useState(null);

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
        const token = await localStorage.getItem('token');
        //console.log(token);
        const responce = await axios.get('/accountUser',{
            params: {
                key1: token,
                key2: 'create'
            }
          })
        //console.log(1);
          if (responce.data.error){
          //console.log(data)setIsModalOpen(true);
          setIsModalOpen(false);
          //console.log(responce)
          }
          else {
            showModal();
            console.log(responce.data.data);
            setProof(responce.data.data);
          }
    }

    return (
        <div className="wrapper">
            <div className="inner">
                <h4>Create Transaction</h4>
                <Button type="primary" onClick={handleClick}>Transfer</Button>
            </div>
            <Modal open={isModalOpen} onOk={handleOk} >
                <h5>Giao dịch thành công</h5>
                <p>Your proof: {proof}</p>
            </Modal>
        </div>
    );

}