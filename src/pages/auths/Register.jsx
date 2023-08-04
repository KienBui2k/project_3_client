import React from 'react';
import api from '@api';

export default function Register() {
  return (
    <div>
      Register
      <form onSubmit={async (e) => {
        e.preventDefault();

        let newUser = {
          user_name: e.target.user_name.value,
          email: e.target.email.value,
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          password: e.target.password.value,
        }


          let result = await api.users.register(newUser)

          if (result.status != 200) {
            alert(result.response.data.message)
          }else {
            alert(result.data != undefined ? result.data.message : result.message)
          }
        

      }}>
          User Name <input type="text" name='user_name'/>
          <br></br>
          Email <input type="text" name='email'/>
          <br></br>
          First name <input type="text" name='first_name'/>
          <br></br>
          Last name <input type="text" name='last_name'/>
          <br></br>
          Password <input type="password" name='password'/>
          <br></br>
          <button type='submit'>Register</button>
      </form>
    </div>
  )
}
