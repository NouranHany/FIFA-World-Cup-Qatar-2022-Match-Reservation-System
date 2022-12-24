import React from "react";
import styles from "./LoginPageStyles.module.css";
function LoginPage() {
    const handleSubmit = (e) => {
        // post request to backend
        e.preventDefault();
        // get value of email and password
        let email = document.getElementById('form2Example1').value;
        let password = document.getElementById('form2Example2').value;
        console.log(email);
        console.log(password)  
        if (email === '' || password === '') {
            alert('Please fill in all fields');
        } else {
        // fetch('http://localhost:5000/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         // email: e.target.email.value,
        //         // password: e.target.password.value
        //     })
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        // }
        // )
        }   

    }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.H1}>FIFA WORLD CUP Qatar 2022</h1>

      <form className={styles.formDiv}>

        <div className="form-outline mb-4">
            <input type="email" id="form2Example1" className="form-control" />
            <label className="form-label" for="form2Example1">Email address</label>
        </div>


        <div className="form-outline mb-4">
            <input required type="password" id="form2Example2" className="form-control" />
            <label className="form-label" for="form2Example2">Password</label>
        </div>


        <div className="row mb-4">
            

            <div className="col">
            <a href="#!" style={{color:'#550065'}}>Forgot password?</a>
            </div>
        </div>

        
        <button onClick={handleSubmit} type="button" className="btn btn-primary btn-block mb-4" style={{backgroundColor:'#550065' , border:'0px'}}>Sign in</button>

        
        <div className="text-center">
            <p>Not a member? <a href="#!" style={{color:'#550065'}}>Register</a></p>
            
        </div>
        </form>
    </div>
  );
}

export default LoginPage;
