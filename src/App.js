import React from "react";
import post from "./user";
import Postdetails from "./postdetails";
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
import { withRouter } from "react-router";
import "./style.css";

const Home = withRouter(
  class extends React.Component {
    render() {
      const {
        history: { goBack, goForward }
      } = this.props;
      return (
        <>
          <p>Home Page</p>
          <button onClick={goBack}>Go Back</button>
          <button onClick={goForward}>Go Forward</button>
        </>
      );
    }
  }
);

const About = () => {
  const { goBack, goForward, push, replace } = useHistory();
  //console.log(useHistory());
  return (
    <>
      <p>About Page</p>
      <button onClick={goBack}>Go Back</button>
      <button onClick={goForward}>Go Forward</button>
      <button onClick={() => push("/posts")}>Go to Posts</button>
      <button onClick={() => replace("/posts")}>Go to Posts (Replace)</button>
    </>
  );
};

const Posts = () => {
  const { goBack, goForward } = useHistory();
  const { search } = useLocation();
  //console.log({search});
  return (
    <>
      <p>Posts Page</p>
      <p>Query Params : {search} </p>
      <button onClick={goBack}>Go Back</button>
      <button onClick={goForward}>Go Forward</button>
    </>
  );
};

/*const Post = () => {
  const { path, url } = useRouteMatch();
  const { postId } = useParams();
  const { search } = useLocation();
  // console.log(useRouteMatch());
  // console.log(useParams());
  // console.log(useLocation());

  //  console.log({search})
  return (
    <p>
      Post Page : {postId}
      <br /> Path : {path}
      <br /> URL : {url}
      <Prompt
        when={true}
        message={location =>
          `Do you want to go this page ${location.pathname} ? `
        }
      />
      <br />
      <br />
      <Link to={`${url}/user`}>User</Link>
      <Link to={`${url}/comment`}>Comment</Link>
      <Switch>
        <Route path={`${path}/user`} component={() => <div>User</div>} />
        <Route path={`${path}/comment`} component={() => <div>Comment</div>} />
      </Switch>
    </p>
  );
};*/
const moredetails=props=>{
const {
  params:{postId}
}=props.match
console.log(postId);
  console.log(props);
  return(
    <>
    <h2>PostDetails</h2>
  
    <Postdetails {...props}/>
    </>
  )

}
const NoMatch = () => {
  return <p>404 Page</p>;
  //console.log(this.props);
};

export default function App() {
  return (
    <BrowserRouter>
      <NavLink exact activeClassName="activeLink" to="/">
        Home
      </NavLink>
      <NavLink activeClassName="activeLink" to="/about">
        About
      </NavLink>
      <NavLink activeStyle={{ color: "green" }} to="/posts">
        Posts
      </NavLink>
      <Switch>
        <Route exact path="/" component={() => <Home customProps="Test" />} />
        <Route path="/about" component={() => <About customProps="Test" />} />
        <Route exact path="/posts" component={post} />
        <Route path="/posts/:postId" component={moredetails} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
}
