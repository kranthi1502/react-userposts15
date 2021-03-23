import React from "react";
import axios from "axios";
import "./style.css";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
  Prompt,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams
} from "react-router-dom";

const BASE_URL = "https://jsonplaceholder.typicode.com";
class Comments extends React.Component{
  constructor(){
    super();
    this.state={
     comments:[]
    }
  }
  getComments=async()=>{
   console.log(this.props);
   const {data}=await axios.get(`${BASE_URL}${this.props.match.url}`);
   //console.log(data);
   this.setState({comments:data});
  // console.log(this.state);
  }
   componentDidMount = () => this.getComments();
render(){
  console.log(this.state.comments[0]);
  const postcomments=this.state.comments.map(comment1=> {
    return(
      <>
       <div className='comments'>
       <label>
            <b>Name is :</b> {comment1.name}
          </label>
          <br></br>
         <label>
            <b>Body :</b> {comment1.body}
          </label> <br></br>
           <label>
            <b>Email :</b> {comment1.email}
          </label> <br></br>
       </div>
      </>
    )
  });
  return(
    <>
    {postcomments}
    </>
  )
 
}
}

class User extends React.Component{
  constructor() {
    super();
    this.state = {
      userData: {}
    };
  }

  getUserData = async () => {
    console.log("userId is :" + this.props.userId);
    console.log("hi");
    let { data } = await axios.get("https://jsonplaceholder.typicode.com/users/"+`${this.props.userId}`);
    this.setState({ userData: data });
    
  };

  componentDidMount = () => this.getUserData();
  render(){
   return(
<>
 <div>
          <label>
            {" "}
            <b>Name is :</b> {this.state.userData.name}
          </label>
          <br />
          <label>
            {" "}
            <b>UserName is :</b> {this.state.userData.username}
          </label>
          <br />
          <label>
            {" "}
            <b>Email is :</b> {this.state.userData.email}
          </label>
          <br />
          <label>
            {" "}
            <b>Website is :</b> {this.state.userData.website}
          </label>
          <br />
          <label>
            {" "}
            <b>Mobile Number is :</b> {this.state.userData.phone}
          </label>
        </div>
</>
   )
  }
}

export default class Postdetails extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Guvi",
      posts: {}
    };
  }
  
 getPosts = async () => {
    console.log(this.props);
    console.log("helo");
    const {
      params: { postId }
    } = this.props.match;
    console.log(postId);
     const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/'+`${postId}`);
    console.log("data is:" + data);
    this.setState({ posts: data });
  };

  componentDidMount = () => this.getPosts();

  render() {
    // let data = this.getUser();
    const { path, url } = this.props.match;
    console.log("path :" + path);
    console.log(this.state.posts);
    return (
      <>
        <label>
          <b>PostId :</b> {this.state.posts.id}
        </label>
        <br />
        <br />
        <label>
          <b>Title :</b> {this.state.posts.title}
        </label>
        <br />
        <br />
        <label>
          <b>Body :</b> {this.state.posts.body}
        </label>
        <br />
        <br />
        <BrowserRouter>
          <Link to={`${url}/user`}>User</Link>|
          <Link to={`${url}/comments`}>Comment</Link>
         <Route
            path={`${path}/user`}
            component={() => (
              <User {...this.props} userId={this.state.posts.userId} />
            )}
          />
          <Route path={`${path}/comments`} component={Comments}/>
        </BrowserRouter>
      </>
    );
  }
}