// helper function for fetching user's presentation
import $ from 'jquery';

const getUserPresentations = (callback) => {
  $.get('api/userPresentations')
  .done((data)=>{
    callback(data);
  })
  .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
}
