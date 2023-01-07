import React , {useEffect, useState} from 'react'
import axios from 'axios';


export const Landing = () => {
  let counter ;
  const [myData , setMyData]=useState([])
 

  useEffect(()=>{
    axios.get("http://localhost:5000/attendence").then((res)=>setMyData(res.data.data))
    
  } ,[])

  // setMyData=myData;

   
    const [user, setUser] = useState({
        roll: "",
        name: "",
        checkin: "",
        checkout: "",
        
      });

    

      const handleInputs = (e) => {
        const { name, value } = e.target;
    
        setUser({ ...user, [name]: value });
        // console.log(user)
      };
    
      const PostData = async (e) => {
      
        e.preventDefault();
        console.log(user);
        //  console.log(setUser)
    
        const { roll , name , checkin , checkout } = user;
    
        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            
            user,
          }),
        });
        
    
        const data = await res.json();
        if (data.status === 422 || !data) {
          window.alert("Submission Failed");
          console.log("invalid registration");
        } else {
         
          window.alert("Attendence Recorded");
          console.log(" Attendence Recorded");
          // navigate.push("/success")
        }
      };

     

  return (
    <div className="container">
    <div className="forms-container">
      <div className="signin-signup">


        <form action="/login" method="post" className="sign-in-form">
          <h2 className="title">Mark Your Attendence</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" value={user.roll} onChange={handleInputs} name="roll" placeholder="Roll Number" />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="text" value={user.name} onChange={handleInputs} name="name" placeholder="Your Name" />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="text" value={user.checkin} onChange={handleInputs} name="checkin" placeholder="Check-In-Time  ex. 9am" />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="text" value={user.checkout} onChange={handleInputs} name="checkout" placeholder="Check-out-Time ex. 4pm" />
          </div>
          <button onClick={PostData } type="submit" className="btn solid">Submit</button>
         
        </form>



        
      </div>
    </div>

    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3></h3>
          <p id='box'>
          
         
            
            <h1> {myData} Students Present in the School</h1>
          </p>
          
        </div>
        <img src="img/log.svg" className="image" alt="" />
      </div>
      
    </div>
  </div>
  )
}
