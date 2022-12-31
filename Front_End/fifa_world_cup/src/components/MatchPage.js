import React, { useEffect, useState ,useContext } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import styles from "./MatchPageStyles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faMapMarkedAlt,
  faFlag,
  faCouch,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import UserData from "./UserData";
import { User } from "../App";
import ReserveSeat from "./ReserveSeat";
import EditMatchForm from "./EditMatchForm";

function MatchPage() {
  const [OpenEditMatch , setOpenEditMatch] = useState(false);
  const [ClickedDivId, setClickedDivId] = useState("");
  const UserContext = useContext(User);
  const matchID = useParams();
  const this_match = matchID.matchId;
  const [ReservationForm, setReservationForm] = useState(false);
  const [UserDataForm , setUserDataForm] = useState(false);
  const [match, setMatch] = useState({});
  const [rows, setRows] = useState([]);
  const [country1_flag, setCountry1Flag] = useState("");
  const [country2_flag, setCountry2Flag] = useState("");
  const [UserThatReserved, setUserThatReserved] = useState({});
  useEffect(() => {
    let status = 0;
    fetch(`${process.env.REACT_APP_HOST}/match/${this_match}`,
      {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + UserContext.token[0],
          "Content-Type": "application/json",
          "Accept": "application/json",
          }
          }   )
      .then((response) => {
        
        status = response.status;
        return response.json();})
      .then((data) =>{
        console.log("data :>> ", data);
        if (status === 200) {
        // console.log(data)
        setMatch(data.match);
        console.log(data.match.stadium.shape)
        console.log(" hh " , match);
        setRows(data.match.stadium.shape);
        getFlag(data.match.team1_name).then((data) => setCountry1Flag(data));
        getFlag(data.match.team2_name).then((data) => setCountry2Flag(data));
        }
        else {
          alert(data.message);
        }
      } )
      .catch((err) => console.log(err));

  }, []);

  const getJSON = function (url, errMsg = "something went wrong") {
    return fetch(url).then((res) => {
      if (!res.ok) throw new Error(`${errMsg} (${res.status})`);
      return res.json();
    });
  };

  const getFlag = async function (country) {
    try {
      const res = await getJSON(`https://restcountries.com/v2/name/${country}`);
      return res[0].flag;
    } catch (err) {
      throw err;
    }
  };

  const openUserDataComponent = () => {
    setReservationForm(false);
    setUserDataForm(true);
  };
  const closeUserDataForm = () => {
    setUserDataForm(false);
  };

  const clickSeat = function (event) {
    let clickedDiv = event.target.closest("div");
    let clickedDivId = clickedDiv.id;
    console.log("clickedDivId :>> ", clickedDivId);
    let clickedDivRow = clickedDivId.split("-")[0];
    let clickedDivColumn = clickedDivId.split("-")[1];

    let newRows = JSON.parse(JSON.stringify(rows));


    if (newRows[clickedDivRow - 1][clickedDivColumn - 1].selected) {
      if (UserContext.user[0].role === 1) {
        let reserved_by = newRows[clickedDivRow - 1][clickedDivColumn - 1].username;
        let status = 0;
        console.log("reserved_by :>> ", reserved_by);
        fetch(`${process.env.REACT_APP_HOST}/user/${reserved_by}` , {
          method: "GET",
          headers: {
              "Authorization": "Bearer " + UserContext.token[0],
              "Content-Type": "application/json",
              "Accept": "application/json",
              }
              }   )
          .then((response) => {
            status = response.status;
            return response.json();}

            )
          .then((data) =>{
            console.log("data :>> ", data);
            if (status === 200) {
              setUserThatReserved(data.user);
              openUserDataComponent();
              
            }
            else {
              alert(data.message);
            }
          }
          )
          .catch((err) => console.log(err));

      }
      else{
        alert("This seat is already reserved");
        return;
      }
    }
    else {
      setClickedDivId(clickedDivId);
      setReservationForm(true);


      



      
    }

    
  };
  useEffect(() => {
    //setRows(match.stadium.shape);
    console.log("here" , match)
  }, [match]);

  const handleReservation = () => {
    let clickedDivId = ClickedDivId;
    let clickedDivRow = clickedDivId.split("-")[0];
    let clickedDivColumn = clickedDivId.split("-")[1];
    let newRows = JSON.parse(JSON.stringify(rows));
    
    let status = 0;
      fetch(`${process.env.REACT_APP_HOST}/reservation` , 
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + UserContext.token[0],
          "Content-Type": "application/json",
          "Accept": "application/json",
          },
          body: JSON.stringify({
            "matche_id": match.id,
            "seat_number": clickedDivId,
          })
          }   )
      .then((response) => {
        status = response.status;
        console.log("status :>> ", status);
        console.log("response :>> ", response);
        return response.json();})
      .then((data) =>{
        console.log("data :>> ", data);
        if (status === 201) {
          newRows[clickedDivRow - 1][clickedDivColumn - 1].selected = true;
          newRows[clickedDivRow - 1][clickedDivColumn - 1].username = UserContext.user[0].username;
          setRows(newRows);
          //console.log("rows :>> ", match);
          // deep copy match
          let newMatch = JSON.parse(JSON.stringify(match));
          newMatch.stadium.shape = newRows;
          
          setMatch(newMatch);
          alert(`Reservation done successfully with Ticket Number ${this_match}-${clickedDivId}`);
          setReservationForm(false);
        }
        else {
          alert(data.message);
        }
      } )
      .catch((err) => console.log(err));
  }
  const OpenEditMatchForm = (e) =>{
    e.preventDefault();
    setOpenEditMatch(true);

  }
  return (
    <>
      <NavBar />
      <div onClick={closeUserDataForm} className={styles.page_outer_container}>
        <div className={styles.page_container}>
          <div className={styles.match_data_container}>
            <div className={styles.country_container}>
              <img style={{border:"1px solid black"}} src={country1_flag} alt="country1 flag" />
              <h1>{match.team1_name}</h1>
            </div>
            <div className={styles.match_data}>
              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  style={{
                    marginRight: "10px",
                    fontSize: "15px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h5>{match.date}</h5>
              </div>
              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faClock}
                  style={{
                    marginRight: "10px",
                    fontSize: "15px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h5>{match.start_time}</h5>
              </div>

              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  style={{
                    marginRight: "10px",
                    fontSize: "15px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h5>{match.stadium_name}</h5>
              </div>
              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faFlag}
                  style={{
                    marginRight: "10px",
                    fontSize: "15px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h5>{match.referee_name}</h5>
              </div>
              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faFlag}
                  style={{
                    marginRight: "10px",
                    fontSize: "15px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h5>{match.linesman1_name}</h5>

                <FontAwesomeIcon
                  icon={faFlag}
                  style={{
                    marginLeft: "20px",
                    marginRight: "10px",
                    fontSize: "15px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h5>{match.linesman2_name}</h5>
              </div>
              {(UserContext.user[0].role === 1) && <div onClick={OpenEditMatchForm}
              className={styles.data_row_container_edit}>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{
                    marginRight: "10px",
                    fontSize: "15px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h5>Edit match data</h5>
              </div>}
            </div>

            <div className={styles.country_container}>
              <img style={{border:"1px solid black"}} src={country2_flag} alt="country2 flag" />
              <h1>{match.team2_name}</h1>
            </div>
          </div>
            {
              (OpenEditMatch) && <EditMatchForm data={{
                id:this_match,
                hide_func:setOpenEditMatch,
                match_data:match,
              setMatchFunc: setMatch}
              }/>
            }
          { (UserContext.loggedIn[0]) && <div className={styles.reservation_container}>
            <h1 style={{ color: "rgb(138, 21, 56)"}}>Reserve your seat now </h1>
            <div className={styles.stadium_shape}>
              {rows.map((row, index) => {
                return (
                  <div className={styles.row} key={index}>
                    {row.map((col, index) => {
                      return (
                        <div
                          className={styles.seat}
                          key={index}
                          onClick={clickSeat}
                          id={col.id}
                        >
                          {col.selected ? (
                            <FontAwesomeIcon
                              icon={faCouch}
                              style={{ color: "grey", fontSize: "30px" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCouch}
                              style={{ color: "rgb(138, 21, 56)", fontSize: "30px" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>}
          {
            (UserDataForm)&& <UserData data={UserThatReserved} />
          }
          {
            (ReservationForm)&& <ReserveSeat data={{
              func : handleReservation,
              clickedDivId : ClickedDivId,
            }} />
          }
        </div>
      </div>
    </>
  );
}

export default MatchPage;
