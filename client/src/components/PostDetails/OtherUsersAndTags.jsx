import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider, Grow, Container, AppBar, Button, TextField, Toolbar, Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';

import { useDispatch, useSelector } from 'react-redux';
import BubbleUI from "react-bubble-ui";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/Navbar";
import "react-bubble-ui/dist/index.css";
import useStyles from "./styles";
import hourglass from '../../images/hourglass-sand-timer-Q9xEnN9-600.jpg';
import { storeUser } from '../../actions/users';
import { GoogleLogin } from 'react-google-login';

import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreatorOrTag = () => {
  const { name } = useParams();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [following, setFollowing] = useState(user?.result?.following);

  if (!following && user?.result) {
    window.location.reload();
  }

  const makeAReturnString = () => {
    if (location.pathname.startsWith('/tags')) {
      var tagMessage = "#" + name + " posts"
      return tagMessage;
    }
    else {
      var creatorMessage = "Posts by " + name;
      return creatorMessage;
    }
  }


  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  const changeTags = () => {
    if (location.pathname.startsWith('/tags')) {
      console.log("Got triggered!");
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }
  const reload = () => {
    window.location.reload();
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const [followingPage, setFollowingPage] = useState(false);
  const handleFollowingPage = () => {
    if (followingPage) {
      setFollowingPage(false);
    } else {
      setFollowingPage(true);
    }
  };


  useEffect(() => {
    changeTags();
  }, []);

  if (!posts.length && !isLoading) return 'No posts';

  const options = {
    size: 375,
    minSize: 175,
    gutter: 30,
    provideProps: true,
    numCols: 6,
    fringeWidth: 100,
    yRadius: 150,
    xRadius: 150,
    cornerRadius: 200,
    showGuides: false,
    compact: true,
    gravitation: 0,
  };

  const childPosts = followingPage
    ? posts
        ?.filter((post) => following.includes(post.creator))
        .map((post, i) => {
          return (
            <Post
              post={post}
              key={i}
              following={following}
              setFollowing={setFollowing}
            />
          );
        })
    : posts?.map((post, i) => {
        return (
          <Post
            post={post}
            key={i}
            following={following}
            setFollowing={setFollowing}
          />
        );
      });
  

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      history.push(`/posts/search?searchQuery=${search || 'none'}`);
    } else {
      history.push('/Homes');
      reload();
    }
  };

  const SearchButton = () => (
    <IconButton onClick={searchPost}>
      <SearchIcon />
    </IconButton>
  );

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(storeUser(res, history));

      history.push('/Homes');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () =>
    alert('Google Sign In was unsuccessful. Try again later');

  return (
    <div>
      <React.Fragment>
        <AppBar
          className={classes.appBar}
          color='inherit'
          sx={{ width: 1 }}
          style={{ minWidth: '100%' }}
        >
          <div className={classes.brandContainer}>
            <img
              className={classes.image}
              src={hourglass}
              alt='icon'
              height='100'
            />

            <Typography
              component={Link}
              to='/Homes'
              className={classes.heading}
              variant='h2'
              align='center'
            >
              ourGlass
            </Typography>
          </div>
          {user?.result ? (
            <>
              <div style={{ marginRight: '2%' }}>
                <Button
                  onClick={handleFollowingPage}
                  variant='outlined'
                  size='lg'
                  style={{
                    marginLeft: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {followingPage ? 'Following' : 'Home'}
                </Button>
              </div>
              <TextField
                onKeyDown={handleKeyPress}
                name='search'
                variant='outlined'
                label='Search Posts'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ endAdornment: <SearchButton /> }}
              />
            </>
          ) : (
            <></>
          )}

          <Toolbar className={classes.toolbar}>
            {user?.result ? (
              <div className={classes.profile}>
                <Button
                  variant='text'
                  component={Link}
                  to='/User'
                  className={classes.userProfile}
                >
                  <Avatar
                    className={classes.av}
                    alt={user?.result.name}
                    src={user?.result.imageUrl}
                  >
                    {user?.result.name.charAt(0)}
                  </Avatar>
                </Button>
                <Button
                  component={Link}
                  to='/Homes'
                  variant='text'
                  className={classes.logout}
                >
                  <HomeIcon fontSize='large' />
                </Button>

                <Button
                  component={Link}
                  to='/Home'
                  variant='text'
                  className={classes.logout}
                >
                  <AddIcon fontSize='large' />
                </Button>
              </div>
            ) : (
              <><Button
                  component={Link}
                  to='/Homes'
                  variant='text'
                  className={classes.logout}
                  style={{ marginRight: '2%' }}
                >
                  <HomeIcon fontSize='large' />
                </Button><GoogleLogin
                    clientId='201954831376-02jtel3qqftcjpa2gdomp17a0eo30crj.apps.googleusercontent.com'
                    render={(renderProps) => (
                      <Button
                        className={classes.googleButton}
                        color='primary'
                        style={{ width: '190%' }}
                        component={Link}
                        to='/login'
                        disabled={renderProps.disabled}
                        variant='contained'
                      >
                        Sign In
                      </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy='single_host_origin' /></>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment>
      <div style={{ marginTop: '7%' }}>
        <h1>
          <center>{makeAReturnString()}</center>
        </h1>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <BubbleUI className={'myBubbleUI'} options={options}>
            {childPosts}
          </BubbleUI>
        )}
        {/* } */}
      </div>
      <Footer />
    </div>
  );
};

export default CreatorOrTag;