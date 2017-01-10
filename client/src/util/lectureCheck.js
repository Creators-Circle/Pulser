// helper function for checking if a lecture id exists.
import $ from 'jquery';

const lectureCheck = (lecture_id, callback) => {
  $.get(`api/lecturecheck/${lecture_id}`)
  .done((data)=>{
    callback(data);
  })
  .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
}

export default lectureCheck;