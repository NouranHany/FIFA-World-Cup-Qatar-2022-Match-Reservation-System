import React , {useContext} from 'react'
import {User} from '../App'
function DeleteUser() {
    const UserContext = useContext(User);
    const handleDeleteUser = function(e){
    e.preventDefault();
    const user_id = document.getElementById("User_id").value;
    console.log(user_id);
    let status = 0;
    if (user_id === "") {
        alert("Please fill in all fields");
    } else {
        fetch(`${process.env.REACT_APP_HOST}/user/${user_id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + UserContext.token[0],
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            user_id: user_id,
        }),
        })
        .then((res)=>{
            status = res.status;
            return res.json();
        }
        )
        .then((data) => {
            if(status === 200){
                console.log(data);
                alert(data.message);
            }
            else{
                alert(data.message);
            }
        }).catch((err)=>{
            console.log(err);
        }
        );


    }
    }
  return (
    <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Remove user</h3>
                <form>



                

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" for="user_id">
                           User ID
                        </label>
                        <input
                          type="text"
                          id="User_id"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                    

                  </div>




                  <div className="mt-4 pt-2">
                    <input
                      onClick={handleDeleteUser}
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
  )
}

export default DeleteUser