import React, { useEffect , useState } from 'react'
import MatchCard from './MatchCard'
import styles from './MatchesPageStyles.module.css'
import NavBar from './NavBar'
function MatchesPage() {
    const IncomingMatchesTemp = [
        {
            id: 1,
            team1: "Brazil",
            team2: "Argentina",
            time: "12:00",
            date: "2022-12-27",
            stadium: "Maracana",
            refree: "John Doe",
        },
        {
            id: 2,
            team1: "France",
            team2: "Germany",
            time: "11:00",
            date: "2022-12-27",
            stadium: "Camp Nou",
            refree: "Bob Doe",
        },
        {
            id: 3,
            team1: "Morocco",
            team2: "Egypt",
            time: "10:00",
            date: "2022-12-27",
            stadium: "Anfield",
            refree: "Jane Doe",
        },
        {
            id: 4,
            team1: "Natherlands",
            team2: "Turkey",
            time: "09:00",
            date: "2022-12-27",
            stadium: "Allianz Arena",
            refree: "John Doe",
        },
        {
            id: 5,
            team1: "Australia",
            team2: "Algeria",
            time: "08:00",
            date: "2022-12-27",
            stadium: "Cairo International Stadium",
            refree: "John Doe",
        },
        {
            id: 6,
            team1: "Brazil",
            team2: "Argentina",
            time: "12:00",
            date: "2022-12-27",

            
            stadium: "Maracana",
            refree: "John Doe",
        },
        {
            id: 7,

            team1: "France",

            team2: "Germany",
            time: "12:00",
            date: "2022-12-27",

            
            stadium: "Maracana",
            refree: "John Doe",
        },
    ]
    // get the matches from the backend when the page loads
    const [IncomingMatches, setIncomingMatches] = useState(IncomingMatchesTemp)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/matches`).then(res => res.json()).then(matches => {
            setIncomingMatches(matches)
        }).catch(err => {
            console.log(err)
        })
    }, [])



  return (
    <>
        <NavBar />
        <h1 className={styles.matches_title}>Upcoming Matches</h1>
        <div className={styles.matches_cards_box}>
            {  
                IncomingMatches?.map((match) => {
                    return <MatchCard key={match.id} data={match} />
                })
            }
        </div>
    </>
    
  )
}

export default MatchesPage