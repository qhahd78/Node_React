import React , { useState } from 'react'
import {useDispatch} from 'react-redux';
import {
    registerUser
} from '../../../_actions/user_action';


function RegisterPage(props) {
    const dispatch = useDispatch();
    //state 를 바꿔주면 아래에 있는 Email Password (value) 도 바뀐다. 
    //state 도 4개 
    const[Email, setEmail] = useState("")
    const[Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")



    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNamedHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert ('비밀번호랑 비밀번호 확인은 같아야 해')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }


        dispatch(registerUser(body))
                .then(response => {
                    if(response.payload.success) {
                        props.history.push("/login")
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>
                    Join
                </button>

            </form>
        </div>
    )
}

export default RegisterPage
