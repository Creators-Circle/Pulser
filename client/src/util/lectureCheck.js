import $ from 'jquery';

//Checks if a lecture id exists.
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
