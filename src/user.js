import React from "react";
import axios from "axios";
import "./style.css";
import postdetails from "./postdetails";
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

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export default class post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userId: "",
      title: "",
      body: "",
      posts: []
    };
  }

  componentDidMount = () => this.getPosts();

  // CREATE
  createPost = async () => {
    const { data } = await axios.post(BASE_URL, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body
    });
    let posts = [...this.state.posts];
    posts.push(data);
    this.setState({ posts });
  };

  // READ
  getPosts = async () => {
    const { data } = await axios.get(BASE_URL);
    this.setState({ posts: data });
  };

  // UPDATE
  updatePost = async () => {
    const { data } = await axios.put(`${BASE_URL}/${this.state.id}`, {
      userId: this.state.userId,
      title: this.state.title,
      body: this.state.body
    });
    let posts = [...this.state.posts];
    let postIndex = posts.findIndex(post => post.id === this.state.id);
    posts[postIndex] = data;
    this.setState({ posts, id: "", userId: "", title: "", body: "" });
  };

  // DELETE
  deletePost = async postId => {
    await axios.delete(`${BASE_URL}/${postId}`);
    let posts = [...this.state.posts];
    posts = posts.filter(post => post.id !== postId);
    this.setState({ posts });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  };

 selectPostForUpdate = id => {
    let posts = [...this.state.posts];
    let selectedPost = posts.filter(post => post.id === id)[0];
    this.setState({ ...selectedPost });
  };

  render() {
    //console.log(this.props);
    const {url,path}=this.props.match;
    return (
      <div>
        <h1>Posts</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>User Id : </label>
            <input
              type="text"
              name="userId"
              value={this.state.userId}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <label>Title : </label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <label>Body : </label>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <button type="Submit">
              {this.state.id ? "Update" : "Add"} Post
            </button>
          </div>
          <br />
        </form>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Body</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(({ id, title, body }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{body}</td>
                <td>
                <Link to={`${url}/${id}`}>Details</Link>
                  <button onClick={() => this.selectPostForUpdate(id)}>
                    Update
                  </button>
                  <button onClick={() => this.deletePost(id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}