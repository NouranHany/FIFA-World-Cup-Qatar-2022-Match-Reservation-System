import React , {useContext , useState , useEffect} from 'react'
import {User} from '../App'
import styles from './DeleteUserStyles.module.css'
function DeleteUser() {
    const UserContext = useContext(User);
    const [Users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/user`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + UserContext.token[0],
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUsers(data.users);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleDeleteUser = function(e){
    e.preventDefault();
    let userId = e.target.id;
    let status = 0;
    console.log(userId);
    let index = e.target.parentNode.id;
    let to_delete = Users[index];
        fetch(`${process.env.REACT_APP_HOST}/user/${userId}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + UserContext.token[0],
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
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


                let index = e.target.parentNode.id;
                console.log('index :>> ', index);
                let newUsers = [...Users];
                newUsers.splice(index, 1);
                setUsers(newUsers);
                //alert("User deleted");
            }
            else{
                alert(data.message);
            }
        }).catch((err)=>{
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
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">View and Delete users</h3>
                {

Users?.map((user , index)=>{
                        return(
                            (user.username !== UserContext.user[0].username)&&<div className={styles.form_row}  id={index} key={index} >
                                <p style={{marginTop:"8px"}}>{user.username}</p>
                                <p style={{marginTop:"8px"}}>{user.first_name}</p>
                                <p style={{marginTop:"8px"}}>{user.last_name}</p>
                                <button id ={user.username} className={styles.form_button} onClick={handleDeleteUser}>Delete</button>
                                
                            </div>
                            
                        )
                    }
                    )
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DeleteUser