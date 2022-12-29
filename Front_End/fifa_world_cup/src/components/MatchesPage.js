import React, { useEffect , useState } from 'react'
import MatchCard from './MatchCard'
import styles from './MatchesPageStyles.module.css'
import NavBar from './NavBar'
function MatchesPage() {

    // get the matches from the backend when the page loads
    const [IncomingMatches, setIncomingMatches] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/match`).then((res) => res.json()).then((data) => {
            setIncomingMatches(data.matches)
        }).catch((err) => {
            console.log(err)
        }
        )
    }, [])



  return (
    <>
        <NavBar />
        <div className={styles.page_container}>
        <h1 className={styles.matches_title}>Upcoming Matches</h1>
        <div className={styles.matches_cards_box}>
            {  
                IncomingMatches?.map((match) => {
                    return <MatchCard key={match.id} data={match} />
                })
            }
        </div>
        </div>
    </>
    
  )
}

export default MatchesPage