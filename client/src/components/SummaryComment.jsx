import React, { Component } from 'react';
import { connect } from 'react-redux';
import postComment from '../util/postComment.js';
import getComment from '../util/getComment.js';

class SummaryComment extends Component {
  constructor () {
    super();
    this.state = {
      newComment: '',
      comment: '',
      toggleComment: false // ui state for showing comment or textbox
    };
  }
  shouldComponentUpdate(nextProps,nextState) {
    return true;
  }

  // componentDidMount () {
  //   let user = !this.props.userId ? this.props.users.filter(user => user.role === 'presenter')[0]
  //     : this.props.users.filter(user => user.user_id === this.props.userId)[0];
  //   getComment(user.lecture_id, user.user_id, (data)=>{
  //     console.log("get comment",data )
  //     this.setState({comment: data[0]});
  //   })
  // }
  // changing ui state for editing comment
  componentWillMount(){
    console.log("sddf");
  }
  toggleView (toggle) {
    this.setState({toggleComment: toggle});
  }
  // sending a post request to the server
  saveComment (lectureId, userid) {
    postComment(lectureId, userid, this.state.newComment)
    .done(()=>{
      this.setState({toggleComment: false});
      getComment(lectureId, userid, (data)=>{
        this.setState({comment: data[0]});
      })
    });
  }
  handleChange (event) {
    this.setState({newComment: event.target.value});
  }

  render () {
    console.log("comment",this.state.comment);
    // filter user by the either presenter or selected user
    let user = !this.props.userId ? this.props.users.filter(user => user.role === 'presenter')[0]
      : this.props.users.filter(user => user.user_id === this.props.userId)[0];
    let comment = this.state.comment;
    if(comment){
      return (
        <div>
          <p>Comment:</p>
          {
            !this.state.toggleComment ? <div>
              <p>{comment.comment}</p>
              <button onClick={() => { this.toggleView(true); }} >Edit</button>
            </div>
            : <div>
              <input type = 'text' defaultValue={comment.comment} onChange={this.handleChange.bind(this)}/>
              <button onClick={() => { this.toggleView(false); }} >Cancel</button>
              <button onClick={() => { this.saveComment(comment.lecture_id, comment.user_id); }} >Save</button>
            </div>
          }
        </div>
      );
   }else{
     return (
       <div>
         <p>Comment:</p>
         {
           !this.state.toggleComment ? <div>
             <p>{user.comment}</p>
             <button onClick={() => { this.toggleView(true); }} >Edit</button>
           </div>
           : <div>
             <input type = 'text' defaultValue={user.comment} onChange={this.handleChange.bind(this)}/>
             <button onClick={() => { this.toggleView(false); }} >Cancel</button>
             <button onClick={() => { this.saveComment(user.lecture_id, user.user_id); }} >Save</button>
           </div>
         }
       </div>
     );
   }

  }
}

const mapStateToProps = (state) => {
  return {
    users: state.summary.users,
    lecture: state.summary.lecture
  };
};

export default connect(mapStateToProps)(SummaryComment);
