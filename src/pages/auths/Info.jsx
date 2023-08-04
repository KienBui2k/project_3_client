import React, { useEffect } from 'react'
import api from '@api'
import { useSelector } from 'react-redux'
export default function Info() {
  const userStore = useSelector(store => store.userStore)
  console.log("userStore", userStore)
  useEffect(() => {
    if(!localStorage.getItem('token')) {
      window.location.href = "/"
    }
  }, [])
  return (
    <div>
      Info
      <button onClick={async (e) =>{
        console.log("đã vào đây")
        if (!userStore.data?.email_confirm) {
          alert("đã vào")
          let result = await api.users.resend();
          console.log("result",result)
        }
      }}>Resend Email</button>
      <br></br>
      <form onSubmit={async (e) => {
        e.preventDefault();
        alert("đã gọi")
        let result = await api.users.changePassword({
          new_pass: e.target.new_pass.value,
          old_pass: e.target.old_pass.value
        })
        console.log("result", result)
      }}>
        OldPass: <input name='old_pass' type="text" />
        NewPass: <input name='new_pass' type="text" />
        ReNewPass: <input name='renew_pass' type="text" />
        <button>Đổi</button>
      </form>
    </div>
  )
}
