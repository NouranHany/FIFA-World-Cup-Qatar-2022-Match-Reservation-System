import React, { useEffect } from "react";
import styles from "./SignUpStyles.module.css";
import { useNavigate } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    /*
     "email_address":"hany.noran18@gmail.com",
    "password":"test123",
    "gender":1,
    "role":1,
    "first_name":"Noran",
    "last_name":"Hany",
    "birth_date":"2000-10-27"
    */
    console.log("sign up");
    let email_address = document.getElementById("email_address").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let birth_date = document.getElementById("birth_date").value;
    // get role and gender from radio buttons
    let role = document.querySelector('input[name="role"]:checked').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let nationality = document.getElementById("nationality").value;
    console.log(JSON.stringify({
      email_address: email_address,
      password: password,
      gender: gender === "1" ? 0 : 1,
      role: role === "1" ? 0 : 1,
      first_name: first_name,
      last_name: last_name,
      birth_date: birth_date,
      nationality:nationality
    }));

    if (
      email_address === "" ||
      password === "" ||
      confirm_password === "" ||
      gender === "" ||
      role === "" ||
      first_name === "" ||
      last_name === "" ||
      birth_date === ""
    ) {
      alert("Please fill in all fields");
    } else if (password !== confirm_password) {
      alert("Password and confirm password do not match");
    } else {
      let status = 0;
      fetch(`${process.env.REACT_APP_HOST}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email_address: email_address,
          password: password,
          gender: gender === "1" ? 0 : 1,
          role: role === "1" ? 0 : 1,
          first_name: first_name,
          last_name: last_name,
          birth_date: birth_date,
          nationality: nationality
        }),
      })
        .then((res) =>{
          status = res.status
          return res.json()
        } )
        .then((data) => {
          console.log(
            data
          );


          if (status === 200) {
            alert("Account created successfully");
            // save the token in the local storage
          // redirect to the home page using react router useNavigate hook
            navigate("/login");
          } else {
            alert(data.message);
          }


        }).catch(err => {
          
            console.log(err)
        });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.H1}>FIFA WORLD CUP Qatar 2022</h1>

      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="email_address"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="email_address">
                          Email Address
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          id="birth_date"
                        />
                        <label for="birthday_date" className="form-label">
                          Birth date
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="password">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          id="confirm_password"
                        />
                        <label for="confirm_password" className="form-label">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="first_name"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="first_name">
                          First Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="last_name"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="last_name">
                          Last Name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h6 className="mb-2 pb-1">Role: </h6>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          id="fan_role"
                          value="1"
                          checked
                        />
                        <label className="form-check-label" for="role">
                          Fan
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          id="manager_role"
                          value="2"
                        />
                        <label className="form-check-label" for="maleGender">
                          Manager
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h6 className="mb-2 pb-1">Gender: </h6>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="femaleGender"
                          value="2"
                          checked
                        />
                        <label className="form-check-label" for="femaleGender">
                          Female
                        </label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="maleGender"
                          value="1"
                        />
                        <label className="form-check-label" for="maleGender">
                          Male
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="nationality"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="nationality">
                          Nationality
                        </label>
                      </div>
                    </div>
                    
                  </div>

                  <div className="mt-4 pt-2">
                    <input
                      onClick={handleSignUp}
                      style={{
                        backgroundColor: "rgb(138, 21, 56)",
                        border: "0px",
                      }}
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
