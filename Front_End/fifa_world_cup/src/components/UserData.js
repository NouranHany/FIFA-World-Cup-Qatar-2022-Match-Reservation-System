import React from 'react'
import styles from './UserDataStyles.module.css'
function UserData(props) {
  return (
    <div className={styles.container}>{
        <>
        <h4>This seat is reserved for user with</h4>
        <h4> id: {props.data.username} </h4>
        <h4> name: {props.data.first_name} {props.data.last_name} </h4>
        </>
        }</div>
  )
}

export default UserData