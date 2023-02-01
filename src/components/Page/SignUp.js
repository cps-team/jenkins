import React, { useState } from 'react';
import axios from 'axios';
import '../../css/SignUp.css';
import Spinner from 'react-bootstrap/Spinner';


function SignUp() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [inputPwCheck, setInputPwCheck] = useState('')
    const [inputCompName, setInputCompName] = useState('')
    const [inputCompRegNum, setInputCompRegNum] = useState('')
    const [inputCeoName, setInputCeoName] = useState('')
    const [inputCompAddress, setInputCompAddress] = useState('')
    const [inputCompTel, setInputCompTel] = useState('')
    const [isPwdSame, setIsPwdSame] = useState(false)
    const [isPwdShort, setIsPwdShort] = useState(true)
    const [isSubmitLoding, setSubmitLodingStatus] = useState(false)

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        //  비밀번호 일치 여부 확인
        if (e.target.value === inputPwCheck) {
            setIsPwdSame(true)
        } else {
            setIsPwdSame(false)
        }

        // 비밀번호 길이 확인
        if (e.target.value.length < 8) {
            setIsPwdShort(true)
        } else {
            setIsPwdShort(false)
        }
        setInputPw(e.target.value)
    }

    const handleInputPwCheck = (e) => {
        // 비밀번호 일치 여부 확인  
        if (e.target.value === inputPw) {
            setIsPwdSame(true)
        } else {
            setIsPwdSame(false)
        }
        setInputPwCheck(e.target.value)
    }

    const handleInputCompName = (e) => {
        setInputCompName(e.target.value)
    }

    const handleInputCompRegNum = (e) => {
        setInputCompRegNum(e.target.value)
    }

    const handleInputCeoName = (e) => {
        setInputCeoName(e.target.value)
    }

    const handleInputCompAddress = (e) => {
        setInputCompAddress(e.target.value)
    }

    const handleInputCompTel = (e) => {
        setInputCompTel(e.target.value)
    }

    const moveToLoginPage = () => {
        document.location.href = '/'
    }

    const onCheckEnter_idDuplicationCheck = (e) => {
        if (e.key === 'Enter') {
            idDuplicationCheck()
        }
    }

    const onCheckEnter_singUpSubmit = (e) => {
        if (e.key === 'Enter') {
            singUpSubmit()
        }
    }

    const singUpSubmit = () => {
        const submitData = {
            id: inputId,
            pw: inputPw,
            compName: inputCompName,
            compRegNum: inputCompRegNum,
            ceoName: inputCeoName,
            compAddress: inputCompAddress,
            compTel: inputCompTel
        }

        if (inputId === '') {
            alert('아이디를 입력해주세요.');
            return;
        } else if (inputPw === '') {
            alert('비밀번호를 입력해주세요.');
            return;
        } else if (isPwdShort) {
            alert('비밀번호는 8자리 이상이어야 합니다.')
            return;
        } else if (inputPwCheck === '') {
            alert('비밀번호를 한번 더 입력해주세요.');
            return;
        } else if (!isPwdSame) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        } else if (inputCompName === '') {
            alert('회사명을 입력해주세요.');
            return;
        } else if (inputCeoName === '') {
            alert('대표자명을 입력해주세요.');
            return;
        }

        axios.post('/User/signUpSubmit', submitData, {
            params: submitData
        })
            .then(res => {
                if (res.data.detail) {
                    if ((res.data.detail).indexOf('login_user_id') !== -1 && (res.data.detail).indexOf('already exists') !== -1) {
                        alert('회원가입실패! 이미 존재하는 아이디입니다.')
                    } else if ((res.data.detail).indexOf('comp_reg_no') !== -1 && (res.data.detail).indexOf('already exists') !== -1) {
                        alert('회원가입실패! 이미 존재하는 사업자등록번호입니다.')
                    }
                } else if (res.data === 'success') {
                    alert('회원가입 성공')
                    setSubmitLodingStatus(true)
                    moveToLoginPage()
                }
            }
            )
            .catch(err => {
                console.log('err : ', err)
            }
            );
    }

    const idDuplicationCheck = () => {
        const submitData = {
            id: inputId
        }
        axios.post('/User/idDuplicationCheck', submitData, {
            params: submitData
        })
            .then(res => {
                if (String(res.data.rows[0].result) !== '1') {
                    alert('사용가능한 아이디입니다.')
                } else {
                    alert('중복된 아이디입니다.')
                }
            })
            .catch();
    }

    return (
        <div id='bg'>
            <div className="signUp-container p-5 position-absolute top-50 start-50 translate-middle">
                <div className="row align-items-center justify-content-between">
                    <span className="text-dark h4 text-center">회원 가입</span>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputId" className="form-label mt-4">새로운 아이디</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="inputId" value={inputId} onChange={handleInputId} onKeyPress={onCheckEnter_idDuplicationCheck} placeholder="생성하실 아이디를 입력해주세요(필수)" required />
                            <button className="btn btn-primary" type="button" id="idCheck" onClick={idDuplicationCheck}>중복확인</button>
                        </div>
                    </div>
                    {isPwdShort ? (<div className="form-group has-danger">
                        <label htmlFor="inputPw" className="form-label mt-2">새로운 비밀번호</label>
                        <input type="password" className="form-control is-invalid" id="inputPw" value={inputPw} onChange={handleInputPw} onKeyPress={onCheckEnter_singUpSubmit} placeholder="새로운 비밀번호를 입력해주세요(필수)" required />
                        <div className="invalid-feedback">비밀번호는 8자 이상으로 작성해 주세요.</div>
                    </div>) : (<div className="form-group has-success">
                        <label htmlFor="inputPw" className="form-label mt-2">새로운 비밀번호</label>
                        <input type="password" className="form-control is-valid" id="inputPw" value={inputPw} onChange={handleInputPw} onKeyPress={onCheckEnter_singUpSubmit} placeholder="새로운 비밀번호를 입력해주세요(필수)" required />
                        <div className="valid-feedback"></div>
                    </div>)}


                    {isPwdSame ? (<div className="form-group has-success">
                        <label htmlFor="inputPwCheck" className="form-label mt-2">비밀번호 확인</label>
                        <input type="password" className="form-control is-valid" id="inputPwCheck" value={inputPwCheck} onChange={handleInputPwCheck} onKeyPress={onCheckEnter_singUpSubmit} placeholder="비밀번호를 재입력해주세요(필수)" required />
                        <div className="valid-feedback">비밀번호가 일치합니다.</div>
                    </div>) : (<div className="form-group has-danger">
                        <label htmlFor="inputPwCheck" className="form-label mt-2">비밀번호 확인</label>
                        <input type="password" className="form-control is-invalid" id="inputPwCheck" value={inputPwCheck} onChange={handleInputPwCheck} onKeyPress={onCheckEnter_singUpSubmit} placeholder="비밀번호를 재입력해주세요(필수)" required />
                        <div className="invalid-feedback">비밀번호가 일치하지 않습니다</div>
                    </div>)}



                    <div className="form-group">
                        <label htmlFor="inputCompName" className="form-label mt-2">회사명</label>
                        <input type="text" className="form-control" id="inputCompName" value={inputCompName} onChange={handleInputCompName} onKeyPress={onCheckEnter_singUpSubmit} placeholder="회사명을 입력해주세요(필수)" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCompRegNum" className="form-label mt-2">사업자등록번호 </label>
                        <input type="text" className="form-control" id="inputCompRegNum" value={inputCompRegNum} onChange={handleInputCompRegNum} onKeyPress={onCheckEnter_singUpSubmit} placeholder="사업자등록번호를 입력해주세요(선택)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCeoName" className="form-label mt-2">대표자명</label>
                        <input type="text" className="form-control" id="inputCeoName" value={inputCeoName} onChange={handleInputCeoName} onKeyPress={onCheckEnter_singUpSubmit} placeholder="대표자명을 입력해주세요(필수)" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCompAddress" className="form-label mt-2">사업장 주소</label>
                        <input type="text" className="form-control" id="inputCompAddress" value={inputCompAddress} onChange={handleInputCompAddress} onKeyPress={onCheckEnter_singUpSubmit} placeholder="사업장주소를 입력해주세요(선택)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputCompTel" className="form-label mt-2">대표전화번호</label>
                        <input type="text" className="form-control" id="inputCompTel" value={inputCompTel} onChange={handleInputCompTel} onKeyPress={onCheckEnter_singUpSubmit} placeholder="대표전화번호를 입력해주세요(선택)" />
                    </div>
                    <div className="d-grid gap-2">
                        {isSubmitLoding ?
                            <button className="btn btn-primary btn-lg" type="button"><Spinner animation="border" variant="light" /></button> :
                            <button className="btn btn-primary btn-lg" type="button" onClick={singUpSubmit}>가입하기</button>
                        }
                        <button className="btn btn-secondary btn-lg" type="button" onClick={moveToLoginPage}>로그인 페이지로 이동</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default SignUp;