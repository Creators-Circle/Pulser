// helper function for fetching summary data
import $ from 'jquery';

const getLectureSummary = (lectureId, callback) => {
  $.get(`/api/summary/${lectureId}`)
    .done((data) => {
      callback(data);
    })
    .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
}

export default getLectureSummary;
