import React from 'react'
import PostData from './Components/PostData';

function App(){
    const head = {
        marginTop: "40px"
    };
  return(
    <div>
        <div className="container">
            <h1 style={head}>Weather Forecast App</h1>
            <PostData/>
        </div>

    </div>
  );
}

export default App