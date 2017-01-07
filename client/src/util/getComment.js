import $ from 'jquery';

const getComment = (lectureId, userId, callback) => {
  $.get(`/api/${lectureId}/comment/${userId}`)
    .done(function(data){
      callback(data);
    })
    .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
      );
    });
}

export default getComment;
