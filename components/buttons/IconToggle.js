import {useState} from 'react'

const IconToggle = ({ icon, toggleIcon }) => {
  const [fill, setFill] = useState(false);

  return <div onClick={()=>{setFill(!fill)}}>
       {!fill ? <>{icon}</> : <>{toggleIcon}</>}
    </div>;
};

export default IconToggle;
