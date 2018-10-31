import React from 'react';
import img from '../assets/Back.svg'

export const BackButton = (props) => {
  return (
    <a className="back-button" onClick={() => props.history.goBack()}>
      <img alt="back" src={img}/>
    </a>
  )
}
