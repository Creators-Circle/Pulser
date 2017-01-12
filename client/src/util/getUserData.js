import $ from 'jquery';

//Retrieves user data from the server;
const getUserData = (callback) => {
  $.get('/api/user')
    .done((data) => {
      callback(data);
    })
    .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err);
    );
  });
}

export default getUserData;
