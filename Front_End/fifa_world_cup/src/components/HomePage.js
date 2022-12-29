import React from 'react'
import styles from './HomePageStyles.module.css'
import NavBar from './NavBar'
function HomePage() {
  return (
    <div className={styles.container } style={{height:"40vh"}}>
    <NavBar/>

    <div style={{height:"40vh"}}>
    <div className="carosuelContainer" >
  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="d-block w-100" src="https://digitalhub.fifa.com/transform/d93104bb-f6f3-45df-b98e-9760a5a89baa/Argentina-v-France-Final-FIFA-World-Cup-Qatar-2022?io=transform:fill,aspectratio:16x9,width:1024&quality=100" alt="First slide"></img>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src="https://digitalhub.fifa.com/transform/96415e3a-8a76-4e4e-b454-9f9bf7220fc2/1445558592?io=transform:fill,aspectratio:16x9,width:844&quality=100" alt="Second slide"></img>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt9abe8ee140998f70/63a2328bd59af063b704ff7c/Richarlison.jpg?quality=80&format=pjpg&auto=webp&width=1000" alt="Third slide"></img>
      </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
 </div>
    </div>

    <div>

    </div>

    </div>
  )
}

export default HomePage