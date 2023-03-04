import React from 'react'
import styles from './HomePageStyles.module.css'
import NavBar from './NavBar'
function HomePage() {
  return (
    <>
    <NavBar/>
    <div className={styles.container }>
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
        <img className="d-block w-100" src="https://phantom-marca.unidadeditorial.es/7d4da3fa191ef94a73b01e7bb2370c71/resize/1200/f/jpg/assets/multimedia/imagenes/2022/06/14/16552420342319.jpg" alt="First slide"></img>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src="https://assets.khelnow.com/news/uploads/2022/11/FIFA-World-Cup-2022.jpg" alt="Second slide"></img>
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
    </>
  )
}

export default HomePage