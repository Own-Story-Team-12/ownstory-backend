import React, { useState } from 'react';
import axios from "axios";
import styles from '../login.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

function LoginPage() {
        //useState() - 값이 변화되는 것을 저장
        const [id, setId] = useState(false);
        const [pw, setPw] = useState(false);
        const [showWarning, setShowWarning] = useState(false);
        const usenavigate = useNavigate();

        //state값이 변화되는 함수 - input에 쓴 값으로 바뀜
        const onIdChange = (e) => {
            //e: 이벤트 객체
            setId(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
            setShowWarning(false);
        }
        
        const onPwChange = (e) => {
            //e: 이벤트 객체
            setPw(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
            setShowWarning(false);
        }

        const goBack=() => {
            usenavigate(-1);
        }
    
        const onDataPost = () => {
            if (!id || !pw) {
                setShowWarning(true); // id나 pw 값이 비어 있을 때 경고 메시지 표시
                console.log('hi');
                console.log(showWarning);
            }else{
                const api = axios.create({
                    baseURL: '/',
                });
                api.post("http://127.0.0.1:8000/login/", {
                    username: id,
                    password: pw,
                })
                .then(function (response) {
                    console.log(response.data);
                    const token = response.data;
                    const IDinfo = id
                    localStorage.setItem('IDinfo', JSON.stringify(IDinfo));
                    localStorage.setItem('token', JSON.stringify(token));
                    
                    usenavigate('/');
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
        
    return (
    
    <div className={styles.body}> 
      <section className={styles.login_form}>
      <button className={styles.back} onClick={goBack}>←</button>
        <h1><NavLink to="/">Own Story</NavLink></h1>
        <div className={styles.int_area}>
            <input type="text" name="id" id="id" onChange={ onIdChange } autoComplete="off" required></input>
            <label htmlFor="id" className={showWarning && !id ? styles.warning : ''}>USER NAME</label>
        </div>
        <div className={styles.int_area}>
            <input type="password" name="pw" id="pw" onChange={ onPwChange } autoComplete="off" required></input>
            <label htmlFor="id" className={showWarning && !pw ? styles.warning : ''}>PASSWORD</label>
        </div>
        <div className={styles.btn_area}>
            <button type="submit" onClick={onDataPost}>로그인</button>
        </div>
        <div className={styles.caption}>
            <NavLink to="/join">SING UP?</NavLink>
        </div>
      </section>
      </div>
      
    );
  }
  
  export default LoginPage;