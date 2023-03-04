import React ,{useContext} from 'react'
import { User } from '../App';
function EditUserData() {
    const UserContext = useContext(User);
    const handleSignUp = (e) => {
        e.preventDefault();
        
        let old_password = document.getElementById("old_password").value;
        let new_password = document.getElementById("new_password").value;
        let birth_date = document.getElementById("birth_date").value;
        let role = document.querySelector('input[name="role"]:checked').value;
        let gender = document.querySelector('input[name="gender"]:checked').value;
        let nationality = document.getElementById("nationality").value;
        let edited_data = {}

        if (old_password !== "") {
            edited_data["old_password"] = old_password;
        }
        if (new_password !== "") {
            edited_data["new_password"] = new_password;
        }
        if (birth_date !== "") {
            edited_data["birth_date"] = birth_date;
        }
        if (role !== "") {
            edited_data["role"] = role === "1" ? 0 : 1;
        }
        if (gender !== "") {
          
            edited_data["gender"] = gender === "1" ? 0 : 1;
        }
        if (nationality !== "") {
            edited_data["nationality"] = nationality;
        }

        

    
          let status = 0;
          fetch(`${process.env.REACT_APP_HOST}/user/${UserContext.user[0].username}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(edited_data),
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
                UserContext.user[1](data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("Data Edited successfully");
                // save the token in the local storage
              // redirect to the home page using react router useNavigate hook
              } else {
                alert(data.message);
              }
    
    
            }).catch(err => {
              
                console.log(err)
            });

      };
    
      return (
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div className="card shadow-2-strong card-registration">
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Edit user data</h3>
                    <form>
                      <div className="row">
                        
                        <div className="col-md-6 mb-4">
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
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="old_password"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" for="old_password">
                              Old Password
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 d-flex align-items-center">
                          <div className="form-outline datepicker w-100">
                            <input
                              type="password"
                              className="form-control form-control-lg"
                              id="new_password"
                            />
                            <label for="new_password" className="form-label">
                              New Password
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
                      
                     
    
                      <div className="mt-4 pt-2">
                        <input
                          onClick={handleSignUp}
                          style={{
                            backgroundColor: "rgb(138, 21, 56)",
                            border: "0px",
                          }}
                          className="btn btn-primary btn-lg"
                          type="submit"
                          value="Edit"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
}

export default EditUserData