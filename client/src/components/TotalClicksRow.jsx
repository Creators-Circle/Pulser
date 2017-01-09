import React, { Component } from 'react';

const TotalClicksRow = (props) => {
  return (
    <tr>
      <td onClick = { () => { props.displayUserSummary(props.userId); } }>
        <img id='profilePic' src={props.avatar} /><span>{props.name}</span>
        </td>
      <td>{props.noOfClicks}</td>
    </tr>
  );
};

export default TotalClicksRow;
