import React, { useEffect } from 'react';

function Table({urlData,setUrlData}) {


  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const res = await fetch('http://localhost:5000/table');
        const data = await res.json();
        setUrlData(data);
      }
      catch(err){console.log(err)}
    };
    fetchData();
  },[])

  const handleCopyURL = async (text)=>{
    try{
      await navigator.clipboard.writeText(text);
      alert("URL is copied")
    }
    catch(err){ console.log("Failed to Copy") }
  }

  return (
<div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Short URL</th>
            <th scope="col">Original URL</th>
            <th scope="col">Copy</th>
          </tr>
        </thead>
        <tbody>
          {urlData.slice(-3).reverse().map((url, index) => (
            <tr key={url._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <a
                  href={`http://localhost:5000/${url.shortURL}`}
                  target="_blank"
                  rel="noreferrer" 
                >
                  {url.shortURL}
                </a>
              </td>
              <td>
                <a
                  href={url.originalURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.originalURL}
                </a>
              </td>
              <td>
                <button className="copy-btn" onClick={()=>{
                  handleCopyURL(`http://localhost:5000/${url.shortURL}`)
                }} src='icon-copy-to-clipboard-light.png'>
                   <img alt="Copy" src='icon-copy-to-clipboard-light.png'/>  
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
