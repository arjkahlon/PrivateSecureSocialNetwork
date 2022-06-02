import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(248,240,227)',
    color: 'rgb(0,0,0)',
    flexGrow: 1,
  },
  heading: {
    color: 'rgb(0,0,0)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: 0,
    height: '100px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '15%',
  },
  av: {
    backgroundColor: 'rgb(248,240,227)',
    color: 'rgb(0,0,0)',
  },
  popup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
  },
  av: {
    color: 'rgb(255,255,255)',
    backgroundColor: 'rgb(50,131,252)',
  },
  logout: {
    color: 'rgb(0,0,0)',
    backgroundColor: 'rgb(248,240,227)',
    fontSize: 30,
  },
  homeButton: {
    color: 'rgb(0,0,0)',
    backgroundColor: 'rgb(248,240,227)',
    fontSize: 20,
  },
  userProfile: {
    backgroundColor: 'rgb(248,240,227)',
    elevation: 0,
    height: 60,
    width: '10%',
  },
  userName: {
    display: 'flex',
    justifyContent: 'center',

    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '95%',
  },
  postfilter: {
    color: 'rgb(0, 0, 0)',
    backgroundColor: 'rgba(21,32,43,0)',
  },
}));
