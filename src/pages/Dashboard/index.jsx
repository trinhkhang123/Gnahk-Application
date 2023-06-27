import { Input } from "antd"
import CreateTransaction from "../../components/CreateTransaction"
import WithdrawTransaction from "../../components/WithdrawTransaction"
import UserInfo from "../../components/UserInfo"
import "./Dashboard.css"
import {useNavigate} from 'react-router-dom'
import NavBar from "../../components/Navbar";
import { createContext,useEffect } from "react";
import HistoryTransaction from "../../components/HistoryTransaction"
import {useState} from 'react'
import axios from 'axios'

export default function Dashboard() {

    const navigate = useNavigate()
    const handleClick = () => {
        // Xử lý sự kiện khi người dùng nhấn vào nút
        localStorage.clear();
        const isLoggedIn = localStorage.getItem("loggedIn");
        console.log(isLoggedIn);
        navigate('/login');
      };

      const [balance, setBalance] = useState(0);

      const getBalance = async () => {

      const token = await localStorage.getItem("token");
        const responce = await axios.get('/getBalance',{
            params: {
                key1: token
            }
            });
            console.log(responce.data)
            setBalance(responce.data)
      }

      getBalance();
      
    
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("loggedIn");
        //console.log(isLoggedIn)
        if (isLoggedIn != "true") {
           // console.log(545)
          navigate('/login');
        }
      }, [navigate]);

    return (
        <>
        <NavBar/>
        <div className="layout light-bg">
        
        <div className="dashboard">
            <div className="d-flex">
                <div className="balance">
                <p style={{ color: 'white' }}>Your Balance:</p>
                    <h2>{balance}</h2>
                </div>
                {/* <UserInfo name="John Doe" address="123 Main St, City" /> */}
            </div>
            <div className="d-flex">
                <div className="control">
                    <CreateTransaction />
                    <WithdrawTransaction />
                </div>
                <HistoryTransaction />
            </div>

        </div>
        </div>
        </>
    )
}