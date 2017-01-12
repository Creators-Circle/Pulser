import $ from 'jquery';

// Makes a query to the server if a presenter is already set for the presentation.
const checkAudienceOnly = (callback) => {
  $.get('/audienceOnly')
    .done((data) => {
      callback(data);
    })
    .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err);
    );
  });
}

export default checkAudienceOnly;
