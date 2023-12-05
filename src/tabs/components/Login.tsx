import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    chrome.runtime.sendMessage('getAuthenticUser',(res)=>{
      if(res?.userData)
      {
        navigate('/dashboard')
      }
      else
      {
        chrome.runtime.sendMessage('LogIn',(res)=>{
          console.log({res})
        })
      }
    })
  }, []);

  const onLoginHandler = () => {
    chrome.runtime.sendMessage('getAuthenticUser', (res) => {
      console.log({ res });
    });
  };

  return (
    <div>
      <button onClick={onLoginHandler}>Click</button>
    </div>
  );
};

export default Login;
