import $ from 'jquery';

// Fetches user's presentation.
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
