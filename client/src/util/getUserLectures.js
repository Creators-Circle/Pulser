// helper function for fetching user's presentation
import $ from 'jquery';

const getUserLectures = (callback) => {
  $.get('api/userLectures')
  .done((data)=>{
    callback(data);
  })
  .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
}

export default getUserLectures;
