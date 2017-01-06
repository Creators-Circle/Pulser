// for posting a comment
import $ from 'jquery';

const postComment = (lectureId, userId, comment, callback) => {
  $.get(`/api/${lectureId}/comment/${userId}`, {
    comment: comment
    })
    .done((data) => {
      callback(data);
    })
    .fail(({responseJSON})=>{
    responseJSON.error.errors.forEach((err) =>
      console.error(err)
    );
  });
}

export default postComment;
