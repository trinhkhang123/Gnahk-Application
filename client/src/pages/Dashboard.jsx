
import { createContext,useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

export default function Dashboard() {
  //console.log(3434);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
      const token = localStorage.getItem("token");

      //console.log(token);
      axios
        .get('/profile', {
          params: {
            key1: token
          }
        })
        
        .then(response => {
          setUser(response.data);
          // Tiếp tục xử lý dữ liệu người dùng
        })
        .catch(error => {
          setError(error);
          // Xử lý lỗi
        });
    }, []);
    const handleClick = () => {
        // Xử lý sự kiện khi người dùng nhấn vào nút
        localStorage.clear();
        const isLoggedIn = localStorage.getItem("loggedIn");
        console.log(isLoggedIn);
        navigate('/login');
      };

    if (error) {
      return <h1>Có lỗi xảy ra</h1>;
    }

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("loggedIn");
    
      if (isLoggedIn != "true") {
        navigate('/login');
      }
    }, [navigate]);
  
    // Phần code khác trong component Dashboard
    if (user != null)
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
        <div className="mb-3">
              <label>Your Proof</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter proof"
               // value = {data.password} onChange={(e) =>setData({...data,password:e.target.value})}
              />
            </div>
        {user && <h2>Hi {user.name}</h2>}
        <button onClick = {handleClick}>Log out </button>
      </div>
      </div>
      
    )
  }
  
  
  
  