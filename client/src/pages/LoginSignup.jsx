  import React, { useState } from 'react';
  import './LoginSignup.css';
  import { useNavigate } from 'react-router-dom'; 


  export default function LoginSignup({isLogin,setLogin}) {
    const navigate = useNavigate(); 
    const [isSignup,setIsSignup] = useState(false)
    const token = localStorage.getItem("token");

    const handleSignupForm = async(e)=>{
      e.preventDefault();
      try{
      if(e.target.name==="login") {
        const email = e.target.email.value;
        const pass = e.target.pass.value;

        const res = await fetch("http://localhost:5000/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
          },
          body:JSON.stringify({email,pass}),
        })
        if(!res.ok){throw new Error("Network responce not ok");}
        const data = await res.json();
        
        if(res.ok){
          alert(data.message);
          localStorage.setItem("token",data.token)
          setLogin(true)
          navigate("/home")
        }
        else{
          alert(data.message)
        }
      }
      
      if(e.target.name==="signup") {
        const email = e.target.email.value;
        const pass = e.target.pass.value;
        const cpass = e.target.cpass.value;

        const res = await fetch("http://localhost:5000/signup",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({email,pass,cpass})
        })
        if(!res.ok){ throw new Error("Network responce not ok")}
        const data = await res.json();
        alert(data.message)
      }
      }
      catch(err){ console.log(err) }
    }
    return (
      <div className={`login-signup-wrapper ${isSignup ? 'signup-mode' : ''}`}>
        <div className="wrapper">
          <div className="title-text">
            <div className="title login">Login Form</div>
            <div className="title signup">Signup Form</div>
          </div>
          <div className="form-container">
            <div className="slide-controls">
              <button
                className={`slide login ${!isSignup ? 'active' : ''}`}
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
              <button
                className={`slide signup ${isSignup ? 'active' : ''}`}
                onClick={() => setIsSignup(true)}
              >
                Signup
              </button>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">

              <form className="login" method="post"  onSubmit={handleSignupForm} name='login'>
                <div className="field">
                  <input type="text" placeholder="Email Address" name="email" required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" name="pass" required />
                </div>
                <div className="pass-link"><a href="#">Forgot password?</a></div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" name="login_btn" value="Login" />
                </div>
                <div className="signup-link">
                  Not a member? <a href="#" onClick={e => { e.preventDefault(); setIsSignup(true); }}>Signup now</a>
                </div>
              </form>

              <form className="signup" method='post' onSubmit={handleSignupForm} name='signup'>
                <div className="field">
                  <input type="text" placeholder="Email Address" name="email" required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" name="pass" required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Confirm Password" name="cpass" required />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" name="signup_btn" value="Signup" />
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // LoginSignup.css
  /* Use your previous LoginSignup styles as is without including wave-background */

  /* This ensures the wave animation from App.js will be visible behind your login/signup form without conflicts and will animate on all pages cleanly. */
