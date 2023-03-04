import React, { useEffect , useContext , useState} from 'react'
import {User} from '../App'
import styles from './CancelReservationStyles.module.css'

function CancelReservation() {
    const UserContext = useContext(User);
    const [Reservations, setReservations] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/reservation`, {
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
                setReservations(data.reservations);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleCancelReservation = (e) => {
        e.preventDefault();
        let reservationId = e.target.id;
        let status = 0;
        console.log(reservationId);
        let index = e.target.parentNode.id;
        let to_cancel = Reservations[index];
        fetch(`${process.env.REACT_APP_HOST}/reservation`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + UserContext.token[0],
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                "matche_id": to_cancel.matche.id,
                "seat_number": to_cancel.seat_number,
            }),
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
                    let newReservations = [...Reservations];
                    newReservations.splice(index, 1);
                    setReservations(newReservations);
                    alert("Reservation Canceled");
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
  return (
    <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">View and cancel reservation</h3>
                {

Reservations?.map((reservation , index)=>{
                        return(
                            <div className={styles.form_row}  id={index} key={index} >
                                <p style={{marginTop:"8px"}}>{reservation.matche.id}-{reservation.seat_number}</p>
                                <p style={{marginTop:"8px"}}>{reservation.matche.team1_name}</p>
                                <p style={{marginTop:"8px"}}>{reservation.matche.team2_name}</p>
                                <button id ={`${reservation.seat_number}${reservation.matche.id}`} className={styles.form_button} onClick={handleCancelReservation}>Cancel</button>
                                
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

export default CancelReservation