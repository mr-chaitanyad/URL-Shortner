import React, { useState } from 'react'

function Form() {
  const [url,setURL] = useState("")
  const handleChange = (e) =>{
    setURL(e.target.value)
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const res = await fetch("http://localhost:5000/submit",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({input_url:url})
      });
      if(!res.ok){ throw new Error("Network responce not ok")}
      const data = await res.json();
      alert(data.message)
    }
    catch(err){
      console.log(err);      
    }
  }
  return (

    <div> 
    <form className='form' onSubmit={handleSubmit}>
        <div className="input-url">
        <input type='text' name='textBox1' onChange={handleChange} value={url} className="textBox1" placeholder='Enter your URL' />
        <button type="submit" className="btn btn-submit">Submit</button>
        </div>
    </form>
    
    </div>
  )
}

export default Form