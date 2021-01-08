import { ADD_TODO, EDIT_TODO, RESET_TODO } from '../Actions'
import { DELETE_TODO } from '../Actions'
import { combineReducers } from 'redux'
const INITIAL_STATE = {
    todos: []
}

function todosReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_TODO:
            return { todos: [...state.todos, action.payload.todo] }
            
        case DELETE_TODO:
            return { todos: [...state.todos.filter(e => e.id !== action.payload.id)] }
            
        case EDIT_TODO:
            return { todos: [...action.payload.newTodos] }
            
            
        case RESET_TODO:
            return INITIAL_STATE
            

        default:
            return INITIAL_STATE
    }
}


export default combineReducers({ todosReducer });