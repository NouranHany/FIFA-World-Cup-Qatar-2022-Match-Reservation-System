import React, { useEffect, useState } from "react";
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
function MatchPage() {
  const matchID = useParams();
  const this_match = matchID.matchId;
  const [match, setMatch] = useState({
    matchId: 1,
    country1: "Brazil",
    country2: "Argentina",
    time: "12:00",
    date: "2022-12-27",
    stadium: {
      name: "Maracana",
      rows: 10,
      columns: 10,
    },
    refree: "John Doe",
  });
  const [rows, setRows] = useState([]);
  const [country1_flag, setCountry1Flag] = useState("");
  const [country2_flag, setCountry2Flag] = useState("");
  useEffect(() => {
    // fetch(`${process.env.REACT_APP_HOST}/matches/${this_match}`)
    //   .then((response) => response.json())
    //   .then((data) => setMatch(data))
    //   .catch((err) => console.log(err));
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

 

  const fillRows = function () {
    let rows = [];
    for (let i = 0; i < match.stadium.rows; i++) {
      let row = [];
      for (let j = 0; j < match.stadium.columns; j++) {
        row.push({
          id: `${i + 1}-${j + 1}`,
          // selected = true if j is odd
          selected: j % 2 === 1,
        });
      }
      rows.push(row);
    }
    setRows(rows);
    console.log("rows :>> ", rows);
  };

  const clickSeat = function (event) {
    let clickedDiv = event.target.closest("div");
    let clickedDivId = clickedDiv.id;
    console.log('clickedDivId :>> ', clickedDivId);
    let clickedDivRow = clickedDivId.split("-")[0];
    let clickedDivColumn = clickedDivId.split("-")[1];

    // deep copy of rows
    let newRows = JSON.parse(JSON.stringify(rows));
    newRows[clickedDivRow - 1][clickedDivColumn - 1].selected = true;
    setRows(newRows);
  }
  useEffect(() => {
    getFlag(match.country1).then((data) => setCountry1Flag(data));
    getFlag(match.country2).then((data) => setCountry2Flag(data));
    fillRows();
  }, [match]);

  return (
    <>
      <NavBar />
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
                  color: "#550065",
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
                  color: "teal",
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
                  color: "green",
                }}
              />
              <h3>{match.stadium.name}</h3>
            </div>
            <div className={styles.data_row_container}>
              <FontAwesomeIcon
                icon={faFlag}
                style={{
                  marginRight: "10px",
                  fontSize: "25px",
                  marginTop: "3px",
                  color: "rgb(167, 167, 15)",
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
                      <div className={styles.seat} key={index} onClick={clickSeat}  id={col.id}>
                        {col.selected ? (
                          <FontAwesomeIcon
                            icon={faCouch}
                            style={{ color: "grey" , fontSize: "40px" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCouch}
                            style={{ color: "green" , fontSize: "40px"}}
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
    </>
  );
}

export default MatchPage;
