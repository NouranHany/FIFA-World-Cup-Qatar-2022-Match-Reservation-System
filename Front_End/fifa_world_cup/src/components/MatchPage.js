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
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../App";
function MatchPage() {
  const UserContext = useContext(User);
  const matchID = useParams();
  const this_match = matchID.matchId;
  const [match, setMatch] = useState({});
  const [rows, setRows] = useState([]);
  const [country1_flag, setCountry1Flag] = useState("");
  const [country2_flag, setCountry2Flag] = useState("");
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
        setMatch(data);
        setRows(data.stadium.shape);
        getFlag(match.country1).then((data) => setCountry1Flag(data));
        getFlag(match.country2).then((data) => setCountry2Flag(data));
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

  

  const clickSeat = function (event) {
    let clickedDiv = event.target.closest("div");
    let clickedDivId = clickedDiv.id;
    console.log("clickedDivId :>> ", clickedDivId);
    let clickedDivRow = clickedDivId.split("-")[0];
    let clickedDivColumn = clickedDivId.split("-")[1];

    let newRows = JSON.parse(JSON.stringify(rows));
    newRows[clickedDivRow - 1][clickedDivColumn - 1].selected = true;
    setRows(newRows);
  };
  useEffect(() => {
    setRows(match.stadium.shape);
  }, [match]);

  return (
    <>
      <NavBar />
      <div className={styles.page_outer_container}>
        <div className={styles.page_container}>
          <div className={styles.match_data_container}>
            <div className={styles.country_container}>
              <img src={country1_flag} alt="country1 flag" />
              <h1>{match.country1}</h1>
            </div>
            <div className={styles.match_data}>
              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  style={{
                    marginRight: "10px",
                    fontSize: "25px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h3>{match.date}</h3>
              </div>
              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faClock}
                  style={{
                    marginRight: "10px",
                    fontSize: "25px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h3>{match.time}</h3>
              </div>

              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  style={{
                    marginRight: "10px",
                    fontSize: "25px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                {/* <h3>{match.stadium.name}</h3> */}
              </div>
              <div className={styles.data_row_container}>
                <FontAwesomeIcon
                  icon={faFlag}
                  style={{
                    marginRight: "10px",
                    fontSize: "25px",
                    marginTop: "3px",
                    color: "rgb(138, 21, 56)",
                  }}
                />
                <h3>{match.refree}</h3>
              </div>
            </div>

            <div className={styles.country_container}>
              <img src={country2_flag} alt="country2 flag" />
              <h1>{match.country2}</h1>
            </div>
          </div>

          <div className={styles.reservation_container}>
            <h1>Reserve your seat now </h1>
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
                              style={{ color: "grey", fontSize: "40px" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCouch}
                              style={{ color: "green", fontSize: "40px" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchPage;
