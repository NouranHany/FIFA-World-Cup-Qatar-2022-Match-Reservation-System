import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "./ProfilePageStyles.module.css";
import AddStaduim from "./AddStaduim";
import AddMatch from "./AddMatch";
import { User } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUser,
  faTrash,
  faTasks,
  faCalendarDays,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import DeleteUser from "./DeleteUser";
import PromoteUsers from "./PromoteUsers";
import EditUserData from "./EditUserData";
import CancelReservation from "./CancelReservation";
function ProfilePage() {
  const [ViewAndCancelReservation, setViewAndCancelReservation] =
    useState(false);
  const [EditUserDataForm, setEditUserForm] = useState(false);
  const [DeleteUserForm, setDeleteUserForm] = useState(false);
  const [PromoteUsersForm, setPromoteUsersForm] = useState(false);
  const [addMatchForm, setAddMatchForm] = useState(false);
  const [AddStaduimForm, setAddStaduimForm] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const UserContext = useContext(User);
  useEffect(() => {
    // get the role from the context
    let loggedIn = UserContext.loggedIn[0];
    if (loggedIn) {
      console.log(UserContext.user[0].role);
      setRole(UserContext.user[0].role);
    } else {
      // navigate to login page
      navigate("/login");
    }
  }, []);
  const flipAddMatch = function () {
    setAddStaduimForm(false);
    if (addMatchForm) {
      setAddMatchForm(false);
    } else {
      setAddMatchForm(true);
    }
  };
  const flipAddStaduim = function () {
    setAddMatchForm(false);
    if (AddStaduimForm) {
      setAddStaduimForm(false);
    } else {
      setAddStaduimForm(true);
    }
  };
  const flipDeleteUser = function () {
    setPromoteUsersForm(false);
    if (DeleteUserForm) {
      setDeleteUserForm(false);
    } else {
      setDeleteUserForm(true);
    }
  };
  const flipPromoteUsers = function () {
    setDeleteUserForm(false);
    if (PromoteUsersForm) {
      setPromoteUsersForm(false);
    } else {
      setPromoteUsersForm(true);
    }
  };
  const flipEditUserData = function () {
    setViewAndCancelReservation(false);
    if (EditUserDataForm) {
      setEditUserForm(false);
    } else {
      setEditUserForm(true);
    }
  };
  const flipViewAndCancelResercation = function () {
    setEditUserForm(false);
    if (ViewAndCancelReservation) {
      setViewAndCancelReservation(false);
    } else {
      setViewAndCancelReservation(true);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.profile_page_container}>
        <div className={styles.profile_left_bar}>
          <div className={styles.left_bar_inner_container}>
            <div className={styles.function_container}>
              <div className={styles.function_row}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
                <h5>
                  {UserContext.user[0].first_name +
                    " " +
                    UserContext.user[0].last_name}
                </h5>
              </div>
            </div>
            <div className={styles.function_row}>
              <FontAwesomeIcon icon={faTasks} style={{ marginRight: "5px" }} />

              {role === 0 && <h5>Customer</h5>}
              {role === 1 && <h5>Manager </h5>}
              {role === 2 && <h5>System Administator</h5>}
            </div>
            <div className={styles.function_row}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ marginRight: "5px" }}
              />

              <h5>{UserContext.user[0].birth_date}</h5>
            </div>
            <div className={styles.function_row}>
              {UserContext.user[0].nationality && (
                <>
                  <FontAwesomeIcon
                    icon={faFlag}
                    style={{ marginRight: "5px" }}
                  />

                  <h5>{UserContext.user[0].nationality}</h5>
                </>
              )}
            </div>
            <div className={styles.function_row}>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />

              {(UserContext.user[0].gender === 0) && <h5>Male</h5>}
              {(UserContext.user[0].gender === 1) && <h5>Female</h5>}
            </div>
          </div>
          <div className={styles.left_bar_inner_container}>
            <div className={styles.function_container}>
              {role === 0 && (
                <>
                  <div className={styles.function_row}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginRight: "5px" }}
                    />
                    <h5 onClick={flipEditUserData}>Edit my data</h5>
                  </div>
                  <div className={styles.function_row}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ marginRight: "5px" }}
                    />
                    <h5 onClick={flipViewAndCancelResercation}>
                      View and cancel reservations
                    </h5>
                  </div>
                </>
              )}
              {role === 1 && (
                <>
                  <div className={styles.function_row}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginRight: "5px" }}
                    />
                    <h5 onClick={flipAddMatch}>Create new match</h5>
                  </div>
                  <div className={styles.function_row}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginRight: "5px" }}
                    />
                    <h5 onClick={flipAddStaduim}>Add new staduim</h5>
                  </div>
                </>
              )}
              {role === 2 && (
                <>
                  <div className={styles.function_row}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginRight: "5px" }}
                    />
                    <h5 onClick={flipPromoteUsers}>Approve managers</h5>
                  </div>
                  <div className={styles.function_row}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ marginRight: "5px" }}
                    />
                    <h5 onClick={flipDeleteUser}>Remove user</h5>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div id="right_part" className={styles.profile_right_part}>
          {addMatchForm && <AddMatch />}
          {AddStaduimForm && <AddStaduim />}
          {DeleteUserForm && <DeleteUser />}
          {PromoteUsersForm && <PromoteUsers />}
          {EditUserDataForm && <EditUserData />}
          {ViewAndCancelReservation && <CancelReservation/>}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
