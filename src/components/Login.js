import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import Spinner from 'react-bootstrap/Spinner';



function Login({ isLogin, except, children }) {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [isLoginLoding, setLoginLodingStatus] = useState(false)
    const [isSignUpLoding, setSignUpLodingStatus] = useState(false)

    if (isLogin || except.includes(window.location.pathname)) {
        return <>{children}</>;
    }

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const onCheckEnter = (e) => {
        if (e.key === 'Enter') {
            onClickLogin()
        }
    }

    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        setLoginLodingStatus(true);
        axios.post('/User/onLogin', null, {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            params: {
                'user_id': inputId,
                'user_pw': inputPw
            }
        })
            .then(res => {
                if (res.data === "wrongPassword" || res.data.rows[0].userid === null) {
                    // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                    alert('입력하신 비밀번호가 일치하지 않습니다.');
                } else if (res.data.rows.length === 0 || res.data.rows[0].userid === undefined) {
                    // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                    alert('입력하신 id 가 일치하지 않습니다.');
                } else if (res.data.rows[0].userid === inputId) {
                    // id, pw 모두 일치 userId = userId1, msg = undefined
                    sessionStorage.setItem('userId', res.data.rows[0].userid);
                    sessionStorage.setItem('companyCode', res.data.rows[0].companycode);
                    sessionStorage.setItem('userName', res.data.rows[0].username);
                }
                // 작업 완료 되면 페이지 이동(새로고침)
                document.location.href = '/'
            })
            .catch(err => {
                console.log('err : ', err)
            })
    }

    const onClickSignUp = () => {
        setSignUpLodingStatus(true)
        document.location.href = '/SignUp'
    }

    return (
        <div id="bg">
            <div className="main-container" onKeyPress={onCheckEnter}>
                <div className="form-floating mb-2">
                    <input type="id" className="form-control" id="id" placeholder="아이디를 입력해주세요." onChange={handleInputId} />
                    <label htmlFor="id" className="tc-gray">아이디를 입력해주세요.</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="id" placeholder="비밀번호를 입력해주세요." onChange={handleInputPw} />
                    <label htmlFor="id">비밀번호를 입력해주세요.</label>
                </div>

                <div className="d-grid mb-5">
                    {isLoginLoding ?
                        <button className="btn btn-primary mb-2" type="button"><Spinner animation="border" variant="light" size="sm" /></button> :
                        <button className="btn btn-primary mb-2" type="button" onClick={onClickLogin}>Login</button>}

                    {isSignUpLoding ?
                        <button className="btn btn-primary mb-2" type="button"><Spinner animation="border" variant="light" size="sm" /></button> :
                        <button className="btn btn-primary" type="button" onClick={onClickSignUp}>Sign Up</button>}
                </div>
            </div>
        </div>
    )
}

export default Login;