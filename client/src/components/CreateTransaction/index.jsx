import { Input, Button, Modal } from 'antd';
import "./CreateTransaction.css"
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function CreateTransaction() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [proof, setProof] = useState(null);
    const [status, setstatus] = useState("Thành công");
    var address = "";

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        location.reload(false);
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
        getProfile();
        const token = await localStorage.getItem('token');
        //console.log(token);
        const responce = await axios.get('/accountUser',{
            params: {
                key1: token,
                key2: 'create'
            }
          })

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
    
          
        console.log(address);
          if (responce.data.error){
          //console.log(data)setIsModalOpen(true);
          setIsModalOpen(false);
          //console.log(responce)
          }
          else {
            setstatus("Thất bại");
            showModal();
            setProof(responce.data.data);
          }

          const responceH = await axios.post('/addHistory',{
                address: address,
                type: "Create",
                status : status,
                time : dateTime
          });
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