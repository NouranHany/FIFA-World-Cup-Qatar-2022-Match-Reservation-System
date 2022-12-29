import React  , {useContext} from "react";
import styles from "./LoginPageStyles.module.css";
import { useNavigate } from "react-router-dom";
import { User } from "../App";
function LoginPage() {
    const navigate = useNavigate();
    const UserContext = useContext(User);
  const handleSubmit = (e) => {
    // post request to backend
    e.preventDefault();
    // get value of email and password
    let email = document.getElementById("form2Example1").value;
    let password = document.getElementById("form2Example2").value;
    console.log(email);
    console.log(password);
    let status = 0;
    if (email === "" || password === "") {
      alert("Please fill in all fields");
    } else {
      fetch(`${process.env.REACT_APP_HOST}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          password: password,
        }),
      })
        .then((res)=>{
            status = res.status;
            return res.json();
        })
        .then((data) => {
            if(status === 200){
                console.log(data);
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                UserContext.loggedIn[1](true);
                UserContext.user[1](data.user);
                UserContext.token[1](data.token);
                navigate("/profile");
            }
            else{
                console.log("de7k");
                alert(data.message);
            }
        }).catch((err)=>{
            console.log("here");
            console.log(err);
        }
        );
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.H1}>FIFA WORLD CUP Qatar 2022</h1>

      <form className={styles.formDiv}>
        <div className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control" />
          <label className="form-label" for="form2Example1">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            required
            type="password"
            id="form2Example2"
            className="form-control"
          />
          <label className="form-label" for="form2Example2">
            Password
          </label>
        </div>

        <div className="row mb-4">
          <div className="col">
            {/* <a href="#!" style={{color:'rgb(138, 21, 56)'}}>Forgot password?</a> */}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="btn btn-primary btn-block mb-4"
          style={{ backgroundColor: "rgb(138, 21, 56)", border: "0px" }}
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member?{" "}
            <a href="#!" style={{ color: "rgb(138, 21, 56)" }}>
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
