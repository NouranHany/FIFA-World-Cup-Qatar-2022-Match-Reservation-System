import React , {useEffect, useState} from "react";
import styles from "./MatchCardStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock,faFutbol,faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
function MatchCard(props) {
  const [country1_flag, setCountry1Flag] = useState("");
  const [country2_flag, setCountry2Flag] = useState("");  
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
  useEffect(() => {
    getFlag(props.data.team1_name).then((data) => setCountry1Flag(data));
    getFlag(props.data.team2_name).then((data) => setCountry2Flag(data));
  }, []);





  return (
    //  <div className={styles.card_container}>{props.data.team1}</div>
    <Link to = {`/matches/${props.data.id}`} style={{width:"100%"}}>
    <div  className={styles.card}>
     <div className={styles.country_row}>
     
        <h4 style={{fontWeight:"500"}}>{(props.data.team1_name).toUpperCase()}</h4>
        <img className={styles.flag_container} src={country1_flag} alt="flag" />
       
     </div>
      <div className={styles.data_column}>
        <h5>
          {props.data.date} 
        </h5>

        <h5>
          {props.data.start_time}
        </h5>
      </div>
      <div className={styles.country2_row}>
          
        <img className={styles.flag_container} src={country2_flag} alt="flag" />
        <h4 style={{fontWeight:"500"}}>{(props.data.team2_name).toUpperCase()}</h4>
      </div>
      
    </div>
    </Link>
  );
}

export default MatchCard;
