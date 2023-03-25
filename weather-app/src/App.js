import styled from "styled-components";
import { useState } from "react";


function App() {
  const value = "wow"
  return (
    <div>
      <Button value={value}/>
    </div>
  );
}

const Button = (value) =>{
  return <button>{value}</button>
}

export default App;
