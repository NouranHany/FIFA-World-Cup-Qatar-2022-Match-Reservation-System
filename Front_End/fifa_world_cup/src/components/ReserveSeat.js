import React, { useEffect , useState } from 'react'

function ReserveSeat(props) {
    const [row, setRow] = useState("");
    const [column, setColumn] = useState("");
   useEffect(() => {
    console.log('props.data :>> ', props.data);
    setRow(props.data.clickedDivId.split("-")[0]);
    setColumn(props.data.clickedDivId.split("-")[1]);
    }, [])

    const localHandleReserve = (e) => {
        e.preventDefault();
        let credit_card_number = document.getElementById("credit_card_number").value;
        let pin = document.getElementById("pin").value;
        if (credit_card_number === "" || pin === "") {

            alert("Please fill in all fields");
        }
        else{
            console.log("credit_card_number :>> ", credit_card_number);
            props.data.func();
            console.log("please donot log this");
        }
    }
  return (
    <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Reserve seat</h3>
                <form>



                
                    <h4>you are about to reserve seat in row {row} and column {column}</h4>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" for="credit_card_number">
                           Credit Card Number
                        </label>
                        <input
                          type="number"
                          id="credit_card_number"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>
                     
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" for="pin">
                           PIN
                        </label>
                        <input
                          type="password"
                          id="pin"
                          className="form-control form-control-lg"
                        />
                        
                      </div>
                    </div>

                  </div>




                  <div className="mt-4 pt-2">
                    <input
                      onClick={localHandleReserve}
                      style={{
                        backgroundColor: "rgb(138, 21, 56)",
                        border: "0px",
                      }}
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Reserve"
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

export default ReserveSeat