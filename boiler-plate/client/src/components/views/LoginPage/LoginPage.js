import Axios from 'axios'
import React , { useState } from 'react'
import {useDispatch} from 'react-redux';
import {
    loginUser
} from '../../../_actions/types';

function LoginPage() {
    const dispatch = useDispatch();
    //state 를 바꿔주면 아래에 있는 Email Password (value) 도 바뀐다. 
    const[Email, setEmail] = useState("")
    const[Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
                .then(response => {
                    if(response.payload.loginSuccess) {
                        props.history.push('/')
                        //페이지 넘어갈 때 위의 코드를 쓴다. 
                    } else {
                        alert('Error')
                    }
                })


        

        
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'
                    , width: '100%', height: '100vh'
        }}>

            <form style={{display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>

            </form>
        </div>
    )
}

export default LoginPage