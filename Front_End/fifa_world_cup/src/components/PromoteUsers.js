import React, { useEffect , useContext , useState} from 'react'
import {User} from '../App'
import styles from './PromoteUsersStyles.module.css'
function PromoteUsers() {
    const UserContext = useContext(User);
    const [waittingUsers, setWaittingUsers] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/unapproved_users`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + UserContext.token[0],
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setWaittingUsers(data.unapproved_users);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handlePromoteUser = (e) => {
        e.preventDefault();
        let username = e.target.id;
        let status = 0;
        console.log(username);
        fetch(`${process.env.REACT_APP_HOST}/user/approve/${username}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + UserContext.token[0],
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
        )
            .then((res) =>{
                status = res.status;
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (status === 200) {
                    
                    let index = e.target.parentNode.id;
                    console.log('index :>> ', index);
                    let newWaittingUsers = [...waittingUsers];
                    newWaittingUsers.splice(index, 1);
                    setWaittingUsers(newWaittingUsers);
                    alert("User Approved");
                }
                else {
                    alert(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            }
            );



    }
    const handleApprovAlleUser = (e) => {
        e.preventDefault();
        let status = 0;
        fetch(`${process.env.REACT_APP_HOST}/user/approve`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + UserContext.token[0],
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => {
                status = res.status;
                return res.json();
            }
            )
            .then((data) => {
                if (status === 200) {
                    alert("All Users Approved");
                    setWaittingUsers([]);
                }
                else {
                    alert(data.message);
                }
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );


    }

  return (
    <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Approve Users</h3>
                {

                    waittingUsers?.map((user , index)=>{
                        return(
                            <div className={styles.form_row}  id={index} key={index} >
                                <p style={{marginTop:"8px"}}>{user.first_name}</p>
                                <p style={{marginTop:"8px"}}>{user.email_address}</p>
                                <button id ={user.username} className={styles.form_button} onClick={handlePromoteUser}>Approve</button>
                                
                            </div>
                        )
                    }
                    )
                }
                <div className="mt-4 pt-2">
                    <input
                      onClick={handleApprovAlleUser}
                      style={{
                        backgroundColor: "rgb(138, 21, 56)",
                        border: "0px",
                      }}
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Approve All"
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )

}

export default PromoteUsers