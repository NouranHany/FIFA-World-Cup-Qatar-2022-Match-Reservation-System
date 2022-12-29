import React , {useContext , useState , useEffect} from 'react'
import { User } from '../App';
function EditMatchForm(props) {
    const UserContext = useContext(User);
    const [teams, setTeams] = useState(  [] );
    const [stadiums, setStadiums] = useState( []);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/stadium`,
        
            {
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
                setStadiums(data.stadiums);
            })
            .catch((err) => {
                console.log(err);
            });
        fetch(`${process.env.REACT_APP_HOST}/team`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + UserContext.token[0],
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })

            .then((res) => res.json())
            .then((data) => {
                setTeams(data.teams);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );

    }, [])
    const handleEditMatch = (e) => {
        e.preventDefault();
        console.log("add match");

        
        let date = document.getElementById("match_date").value;
        let start_time = document.getElementById("start_time").value;
        let referee_name = document.getElementById("referee_name").value;
        let linesman1_name = document.getElementById("linesman1_name").value;
        let linesman2_name = document.getElementById("linesman2_name").value;

        // get stadium_name , team1_name , team2_name from select
        let stadium_name = document.getElementById("stadium_name").value;
        let team1_name = document.getElementById("team1_name").value;
        let team2_name = document.getElementById("team2_name").value;
        let status = 0;
        if (team1_name === team2_name) {
            alert("Please select different teams");
            return;
        }
        // create json object data to send it to server have only not empty values from the above variables
        let data_of_match = {};
        data_of_match.id = props.data.id;
        if (date !== "") {
            data_of_match.date = date;
        }
        if (start_time !== "") {
            data_of_match.start_time = start_time;
        }
        if (referee_name !== "") {
            data_of_match.referee_name = referee_name;
        }
        if (linesman1_name !== "") {
            data_of_match.linesman1_name = linesman1_name;
        }
        if (linesman2_name !== "") {
            data_of_match.linesman2_name = linesman2_name;
        }
        if (stadium_name !== "") {
            data_of_match.stadium_name = stadium_name;
        }
        if (team1_name !== "") {
            data_of_match.team1_name = team1_name;
        }
        if (team2_name !== "") {
            data_of_match.team2_name = team2_name;
        }
        if (status !== "") {
            data_of_match.status = status;
        }
        console.log(data_of_match);

        fetch(`${process.env.REACT_APP_HOST}/match/${props.data.id}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data_of_match),
        })
            .then((res)=>{
                status = res.status;
                return res.json();
            }
            )
            .then((data) => {
                console.log(data);
                if(status === 200){
                    alert("Match Edited successfully");
                    props.data.hide_func(false);
                    let EditedMatch = props.data.match_data;
                    for (let key in data_of_match) {
                        EditedMatch[key] = data_of_match[key];
                    }
                    // console.log('ppp',data);
                    console.log('hhh',EditedMatch);

                    props.data.match_data = EditedMatch;
                    props.data.setMatchFunc(EditedMatch);
                }
                else{
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
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Match</h3>
            <form>


            <div className="row">
                <div className="col-md-6 mb-4">
                <label style={{marginLeft:"10px" , marginTop:"10px"}} className="form-label select-label">First Country</label>
                <select id="team1_name" className="select form-control">
                       {
                             teams?.map((team , index) => (
                                <option key={index} value={team.name}>{team.name}</option>
                            ))
                       }
                    </select>
                    
                </div>
                <div className="col-md-6 mb-4">
                <label style={{marginLeft:"10px" , marginTop:"10px"}} className="form-label select-label">Second Country</label>

                <select id="team2_name" className="select form-control">
                        {
                                teams?.map((team , index) => (
                                    <option key={index} value={team.name}>{team.name}</option>
                                ))
                        }
                    </select>
              </div>
            </div>


              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                  <label className="form-label" for="start_time">
                      Match Start time
                    </label>
                    <input
                      type="time"
                      id="start_time"
                      className="form-control form-control-lg"
                    />
                    
                  </div>
                </div>
                <div className="col-md-6 mb-4 d-flex align-items-center">
                  <div className="form-outline datepicker w-100">
                  <label for="match_date" className="form-label">
                      Match date
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      id="match_date"
                    />
                    
                  </div>
                </div>
              </div>




              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                  <label className="form-label" for="referee_name">
                      Referee Name
                    </label>
                    <input
                      type="text"
                      id="referee_name"
                      className="form-control form-control-lg"
                    />
                    
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <label style={{marginLeft:"10px" , marginTop:"10px"}} className="form-label select-label">Stadium</label>

                    <select id="stadium_name" className="select form-control">
                        {stadiums.map((stadium) => (
                            <option value={stadium.name}>{stadium.name}</option>
                        ))}
                    </select>
                    </div>
                  </div>
            
              </div>


            

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                  <label className="form-label" for="linesman1_name">
                       First linesman Name
                    </label>
                    <input
                      type="text"
                      id="linesman1_name"
                      className="form-control form-control-lg"
                    />
                    
                  </div>
                </div>
                <div className="col-md-6 mb-4 d-flex align-items-center">
                <div className="form-outline">
                <label for="linesman2_name" className="form-label">
                      Second linesman Name
                    </label>
                  <div className="form-outline datepicker w-100">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="linesman2_name"
                    />
                    </div>
                  </div>
                </div>
              </div>




              <div className="mt-4 pt-2">
                <input
                  onClick={handleEditMatch}
                  style={{
                    backgroundColor: "rgb(138, 21, 56)",
                    border: "0px",
                  }}
                  className="btn btn-primary btn-lg"
                  type="submit"
                  value="Edit the match"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditMatchForm