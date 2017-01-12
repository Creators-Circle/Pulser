import $ from 'jquery';

// helper function for fetching summary data for summary view.
const getLectureSummary = (lectureId, callback) => {
  $.get(`/api/summary/${lectureId}`)
    .done((data) => {
      callback(data);
    })
    .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err);
    );
  });
}

export default getLectureSummary;
