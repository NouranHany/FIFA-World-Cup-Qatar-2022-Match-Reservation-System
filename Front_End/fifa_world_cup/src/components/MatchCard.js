import React from "react";
import styles from "./MatchCardStyles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock,faFutbol,faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
function MatchCard(props) {
  return (
    //  <div className={styles.card_container}>{props.data.team1}</div>
    <Link to = {`/matches/${props.data.id}`}>
    <div className={styles.card_container}>
    <div  className="card" style={{width: "22rem", marginRight:"25px" , marginLeft:"25px", backgroundColor:"white", color:"white" , marginBottom:"60px" , border:"1px solid #6f1581"}}>
      <img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/ar/3/35/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%84%D8%B9%D9%8A%D8%A8.png" alt="Card cap" style={{height:"12rem" , backgroundColor:"white"}}></img>
      <div className="card-body" style={{display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center"}}>
        <div className={styles.cardRow}>
            <FontAwesomeIcon icon={faFutbol} style={{marginRight:"5px" , color:"red"}}/>
            <h4 className="card-text" style={{margin:"center", fontFamily: 'Poppins' , color:"#6f1581"}}>
            {props.data.team1} vs {props.data.team2}
            </h4>
        </div>
        <div className={styles.cardRow}>
            <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight:"5px" , color:"grey"}}/>
            <h6 style={{margin:"center", fontFamily: 'Poppins', color:"#6f1581"}}>
                {props.data.date} 
            </h6>
        </div>
        
        <div className={styles.cardRow}>
            <FontAwesomeIcon icon={faMapMarkedAlt} style={{marginRight:"5px" , color:"green"}}/>
            <h6 style={{margin:"center", fontFamily: 'Poppins', color:"#6f1581"}}>
                {props.data.stadium}
            </h6>
        </div>
        <div className={styles.cardRow}>
            <FontAwesomeIcon icon={faClock} style={{marginRight:"5px" , color:"gold"}}/>
            <h4 style={{margin:"center", fontFamily: 'Poppins', color:"#6f1581"}}>
                {props.data.time}
            </h4>
        </div>
      </div>
      
    </div>
    </div>
    </Link>
  );
}

export default MatchCard;
