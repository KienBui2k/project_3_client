import React, { useEffect } from 'react'
import validate from '@utils/validate';
import api from '@api';
import { Alert } from 'antd';
export default function Login() {
  useEffect(() => {
    if(localStorage.getItem("token")) {
      window.location.href = "/";
    }
  })
  return (
    <div>
      Login Page
      <form onSubmit={async (e) => {
        e.preventDefault();
        let data = {
          user_name: e.target.user_name.value,
          password: e.target.password.value,
          type: !validate.isEmail(e.target.user_name.value) // Email false, User Name true
        }

        try {
          alert("ok đã gửi")
          let result = await api.users.login(data);
          if (result.status == 200) {
            if (result.data.token == undefined) {
              alert("Đăng nhập thất bại")
            }else {
              localStorage.setItem("token", result.data.token);
              alert("Đăng nhập Thành Công")
            }
      
            
          }else {
            alert(result.data.message)
          }
        }catch{err} {

        }

      }}>
        User Name or Email
        <input name='user_name' type="text" />
        <br></br>
        Password
        <input name='password' type="password" />
        <br></br>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
