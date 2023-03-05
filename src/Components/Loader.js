import React from 'react'
import spinner from "../Images/spinner.gif"

const Loader = () => {
  return (
    <div>
        <img src={spinner} alt="" style={{width:"100px" , position:"absolute" , top:"50%" , left:"50%"}} />
    </div>
  )
}

export default Loader