import React, { useState } from 'react';
import Navbar from './Navbar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Send from '@material-ui/icons/Send';
import Modal from 'react-modal';

const useStyles = makeStyles((theme) => ({
  contactContainer: {
    height: '100vh',
  },
  heading: {
    color: 'tomato',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  form: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  },
  input: {
    color: '#fff',
  },
  button: {
    marginTop: '1rem',
    color: 'tomato',
    borderColor: 'tan',
  },
  field: {
    margin: '1rem 0rem',
  },

  paper: {
    display: 'flex',
    justifyContent: 'start',
    margin: '128px auto',
    borderRadius: 10,
    textAlign: 'center',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}));

const InputField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'tomato',
    },
    '& label': {
      color: 'tan',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'tan',
      },
      '&:hover fieldset': {
        borderColor: 'tan',
      },
      '&.Mui-focused fieldset': {
        color: '#fff',
        borderColor: 'tan',
      },
    },
  },
})(TextField);

const Contact = () => {
  const classes = useStyles();

  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });
  const [open, setOpen] = useState(true);

  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      form.reset();
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: 'post',
      url: 'https://formspree.io/f/xgepkqol',
      data: new FormData(form),
    })
      .then((r) => {
        handleServerResponse(true, 'Thanks!', form);
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form);
      });
  };

  // Modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box component="div" className={classes.contactContainer}>
        <Grid container justify="center">
          <Box component="form" className={classes.form}>
            <Typography variant="h5" className={classes.heading}>
              Get in touch
            </Typography>
            <form onSubmit={handleOnSubmit}>
              <InputField
                fullWidth={true}
                label="Name"
                variant="outlined"
                name="name"
                inputProps={{ className: classes.input }}
              />
              <InputField
                fullWidth={true}
                label="Email"
                variant="outlined"
                name="email"
                inputProps={{ className: classes.input }}
                className={classes.field}
              />
              <InputField
                fullWidth={true}
                label="Message"
                variant="outlined"
                name="message"
                multiline
                rows={4}
                inputProps={{ className: classes.input }}
              />

              <Button
                type="submit"
                variant="outlined"
                fullWidth={true}
                endIcon={<Send />}
                className={classes.button}
                // onClick={(e) => setOpen(true)}
              >
                Contact Me
              </Button>

              {/* popup window */}

              {/* {serverState.status && (
                <Modal open={open} onClose={handleClose}>
                  <div className={classes.paper}>
                    <h1 className={!serverState.status.ok ? 'errorMsg' : ''}>
                      {serverState.status.msg}
                    </h1>
                  </div>
                </Modal>
              )} */}

              {serverState.status && (
                <h1
                  className={!serverState.status.ok ? 'errorMsg' : ''}
                  style={{ color: 'tomato', textAlign: 'center' }}
                >
                  {serverState.status.msg}
                </h1>
              )}
            </form>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Contact;
