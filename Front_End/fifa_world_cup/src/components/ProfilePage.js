import React , {useState , useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import styles from './ProfilePageStyles.module.css'
import AddStaduim from './AddStaduim'
import AddMatch from './AddMatch'
import {User} from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faUser , faTrash , faTasks } from '@fortawesome/free-solid-svg-icons';
import DeleteUser from './DeleteUser'
import PromoteUsers from './PromoteUsers'
function ProfilePage() {
  const [DeleteUserForm , setDeleteUserForm] = useState(false);
  const [PromoteUsersForm , setPromoteUsersForm] = useState(false);
  const [addMatchForm , setAddMatchForm] = useState(false);
  const [AddStaduimForm , setAddStaduimForm] = useState(false);
  const navigate = useNavigate();
  const [role , setRole] = useState("");
  const UserContext = useContext(User);
  useEffect(() => {
    // get the role from the context
    let loggedIn = UserContext.loggedIn[0];
    if(loggedIn){
      console.log(UserContext.user[0].role);
      setRole(UserContext.user[0].role);
    }
    else{
      // navigate to login page
      navigate("/login");
    }
  }, [])
  const flipAddMatch = function(){
    setAddStaduimForm(false);
    if (addMatchForm){
      setAddMatchForm(false);
    }
    else{
      setAddMatchForm(true);
    }
  }
  const flipAddStaduim = function(){
    setAddMatchForm(false);
    if (AddStaduimForm){
      setAddStaduimForm(false);
    }
    else{
      setAddStaduimForm(true);
    }
  }
  const flipDeleteUser = function(){
    setPromoteUsersForm(false);
    if (DeleteUserForm){
      setDeleteUserForm(false);
    }
    else{
      setDeleteUserForm(true);
    }
  }
  const flipPromoteUsers = function(){
    setDeleteUserForm(false);
    if (PromoteUsersForm){
      setPromoteUsersForm(false);
    }
    else{
      setPromoteUsersForm(true);
    }
  }


  return (
    <>
    <NavBar/>
    <div className={styles.profile_page_container}>
        <div className={styles.profile_left_bar}>

            <div className={styles.left_bar_inner_container}>
            <div className={styles.function_container}>
                <div className={styles.function_row}>
                          <FontAwesomeIcon icon={faUser} style={{marginRight:"5px"}} />
                          <h5 >
                            {UserContext.user[0].first_name + " " + UserContext.user[0].last_name}
                          </h5>
                        </div>
                </div>
                <div className={styles.function_row}>
                          <FontAwesomeIcon icon={faTasks} style={{marginRight:"5px"}} />
                          
                            {
                              (role === 0) && <h5>Customer</h5>
                              }
                              {
                              (role === 1) && <h5>Manager </h5>
                              }
                              {
                              (role === 2) && <h5>System Administator</h5>
                              }
                   
                </div>
                              
            </div>
            <div className={styles.left_bar_inner_container}>

                <div className={styles.function_container}>
                    {
                      (role === 0) && 
                        <>
                          <div className={styles.function_row}>
                          <FontAwesomeIcon icon={faPlus} style={{marginRight:"5px"}} />
                          <h5 onClick={flipAddMatch}>
                            Edit my data
                          </h5>
                        </div>
                        <div className={styles.function_row}>
                          <FontAwesomeIcon icon={faPlus} style={{marginRight:"5px"}} />
                          <h5 onClick={flipAddStaduim}>
                            Cancel reservation
                          </h5>
                        </div>
                        </>
                    }
                    {
                      (role === 1) &&
                        <>
                        <div className={styles.function_row}>
                          <FontAwesomeIcon icon={faPlus} style={{marginRight:"5px"}} />
                          <h5 onClick={flipAddMatch}>
                            Create new match
                          </h5>
                        </div>
                        <div className={styles.function_row}>
                          <FontAwesomeIcon icon={faPlus} style={{marginRight:"5px"}} />
                          <h5 onClick={flipAddStaduim}>
                            Add new staduim
                          </h5>
                        </div>
                        </>
                    }
                    {
                      (role === 2) &&
                      <>
                      <div className={styles.function_row}>
                        <FontAwesomeIcon icon={faPlus} style={{marginRight:"5px"}} />
                        <h5 onClick={flipPromoteUsers}>
                          Approve managers
                        </h5>
                      </div>
                      <div className={styles.function_row}>
                        <FontAwesomeIcon icon={faTrash} style={{marginRight:"5px"}} />
                        <h5 onClick={flipDeleteUser}>
                          Remove user
                        </h5>
                      </div>
                      </>
                    }
                </div>

            </div>
        </div>
        <div id="right_part" className={styles.profile_right_part}>
            {
              (addMatchForm) && 
                <AddMatch />
            }
            {
              (AddStaduimForm) &&
                <AddStaduim />
            }
            {
              (DeleteUserForm) &&
                <DeleteUser />
            }
            {
              (PromoteUsersForm) &&
                <PromoteUsers />
            }

        </div>
    </div>
    </>
  )
}

export default ProfilePage