import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { addTodo, deleteTodo, editTodo, resetTodo } from './Actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SaveIcon from '@material-ui/icons/Save';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
//import { Input } from '@material-ui/core';

function App(props) {

  return (
    <div className="App">
      <Header />
      <Form addTodo={props.addTodo}  resetTodo={props.resetTodo} /> 
      <Lists editTodo={props.editTodo} deleteTodo={props.deleteTodo} todos={props.todos} />
    </div>
  );
}


const Header = (props) => {
  const useStyles = makeStyles({
    toolbar: {
      textAlign: "center",
      height: 80
    },
    heading: {
      margin: "auto"
    }
  });

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.heading} variant="h5" align="center">Todo App</Typography>
      </Toolbar>
    </AppBar>

  );
}

const Form = (props) => {

  const useStyles = makeStyles({
    root: {
      marginTop: 16,
      marginBottom: 16,
      padding: 16,
      boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
    },
    button: {
      marginTop: 16
    }
  });

  const classes = useStyles();
  const [text, setText] = useState("")
  const handleChange = (event) => {
    setText(event.target.value);

  }
  const Cliquez = () => {
    props.addTodo({ title: text })
    setText("");
  }
  const handleKeypress = (e) => {
    if (e.which === 13) {
      Cliquez();
    }
  }
  const Resetez = () => {
    props.resetTodo()
  }





  return (
   
    <Container maxWidth="sm" className={classes.root}>
      <Grid container alignItems="center">
        <Grid item md={12}>
          <TextField onKeyPress={handleKeypress} value={text} onChange={handleChange}
            id="outlined-basic" fullWidth label="Entrez truc a faire" multiline={true} rowsMax={1} variant="outlined" />
        </Grid>
        <Grid item md={6}>
          <Button className={classes.button} variant="contained" color="primary" type="submit" onClick={Cliquez}>
            Addez
          </Button>
          </Grid>
          <Grid item md={6}>
          <Button className={classes.button} variant="contained" color="primary" type="submit" onClick={Resetez}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Container> 
    
      )
 
}
const Lists = (props) => {
  const useStyles = makeStyles({
    container: {
      padding: 16
    }
  });
  const classes = useStyles();
  const todoList = props.todos;
  const handleDelete = (id) => {
    props.deleteTodo(id)
  }


  const [edits, setEdits] = useState([])
  const [textFields, setTextFields] = useState([])

  useEffect(() => {
    setEdits(new Array(todoList.length).fill(false))
    setTextFields(todoList.map((e) => e.title))

  }, [todoList])


  const handleCickEdit = (index) => {

    setEdits(edits.map((e, i) => {

      if (i === index) {
        console.log("MDR hmar")
        return !e
      }
      return e
    }))
  }
  const handleEdit = (index, value) => {

    setTextFields(textFields.map((e, i) => {

      if (i === index) {

        return value
      }
      return e
    }))

  }

  const handleSaveEdit = () => {

    props.editTodo(textFields.map((e, index) => ({ title: e, id: index + 1 })))
  }

  return (
    <Container className={classes.container} maxWidth="md">
      {!todoList.length
        ?
        <Typography variant="h6" color="error">No Data to display</Typography>
        :
        (<List>
          {todoList.map((item, index) => {
            return (
              <ListItem key={item.id} button>
                <ListItemIcon>
                <IconButton edge="end" aria-label="edit" onClick={""}>
                  
                  <CheckCircleOutlineIcon color="primary" />
                  </IconButton>
                </ListItemIcon>

                {edits[index] === true ? <TextField value={textFields[index]} onChange={(e) => handleEdit(index, e.target.value)} ></TextField> : <ListItemText primary={item.title} />}
                <ListItemSecondaryAction>
                  {edits[index] === true ? <IconButton edge="end" aria-label="edit" onClick={() => handleSaveEdit()}>
                    <SaveIcon />
                  </IconButton> : <div />}
                  <IconButton edge="end" aria-label="edit" onClick={() => handleCickEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>)
      }
    </Container>
  )
}





const mapStateToProps = (state) => {
  return { todos: state.todosReducer.todos }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addTodo: addTodo,
  deleteTodo: deleteTodo,
  editTodo: editTodo,
  resetTodo: resetTodo
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(App);
