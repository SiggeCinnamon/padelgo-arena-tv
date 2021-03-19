import React, { useState } from "react";
import { Link } from "react-router-dom";
import Routes from "../../routes.json";

function Home() {
  const [value, setValue] = useState("");
  return (
    <>
      <div className='container'>
        <h1>Home</h1>

        <div className='input-group mb-3'>
          <Link
            className='btn btn-outline-secondary'
            type='button'
            id='button-addon1'
            to={`${Routes.DASHBOARD.replace(":clubId", value)}`}>
            Button
          </Link>
          <input
            value={value}
            key='input1'
            type='text'
            className='form-control'
            placeholder=''
            aria-label='Example text with button addon'
            aria-describedby='button-addon1'
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
