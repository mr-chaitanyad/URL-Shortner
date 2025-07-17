import React from 'react';
import Form from '../components/Form';
import Table from '../components/Table';

export default function Home({urlData,setUrlData}) {

  return (
    <>
      <div className='app-body'>
      <Form/>
      <Table urlData={urlData} setUrlData={setUrlData}/>
      </div>
    </>
  );
}