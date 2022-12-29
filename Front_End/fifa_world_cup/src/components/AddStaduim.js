import React , {useContext} from 'react'
import styles from './AddStaduimStyles.module.css'
import { User } from '../App'
function AddStaduim() {
    const UserContext = useContext(User);
    const handleAddStaduim = function(e){
        e.preventDefault();
        /*
        "name":"xyz",
    "rows_count":10,
    "cols_count":10,
    "location":"11-77"
        */
        let name = document.getElementById('name').value;
        let rows_count = document.getElementById('rows_count').value;
        let cols_count = document.getElementById('columns_count').value;
        let location = document.getElementById('location').value;
        let status = 0;
        fetch(`${process.env.REACT_APP_HOST}/stadium`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization": "Bearer " + UserContext.token[0],
            },
            body:JSON.stringify({
                name:name,
                rows_count:rows_count,
                cols_count:cols_count,
                location:location
            })
        })
        .then((res)=>{
            status = res.status;
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            if(status == 200){
                alert("Stadium Added Successfully");
            }
            else{
                alert(data.message);
            }
        }
        )
        .catch((err)=>{
            console.log(err);
        }
        )


    }

  return (
    <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add staduim</h3>
                <form>



                

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" for="name">
                           Stadium Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" for="location">
                           Stadium Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>

                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" for="rows_count">
                           Rows Count
                        </label>
                        <input
                          type="text"
                          id="rows_count"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" for="columns_count">
                            Columns Count
                        </label>
                        <input
                          type="text"
                          id="columns_count"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>

                  </div>


                  <div className="mt-4 pt-2">
                    <input
                      onClick={handleAddStaduim}
                      style={{
                        backgroundColor: "rgb(138, 21, 56)",
                        border: "0px",
                      }}
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Add Stadium"
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

export default AddStaduim