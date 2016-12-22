//helper function for retrieving user data the from the server;
import $ from 'jquery';

const getUserData = (callback) => {
  $.get('/user')
    .done((data) => {
      callback(data);
    })
    .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
}

export default getUserData;
