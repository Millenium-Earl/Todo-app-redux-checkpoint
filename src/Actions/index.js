export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const RESET_TODO = 'RESET_TODO'
//Type de l'action
var myid = 1;
export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: {
            todo: {
                title: todo.title,
                id: myid++
            },

        }
    }
}

export function deleteTodo(id) {
    return {
        type: DELETE_TODO,
        payload: { id: id }
    }

}

export function editTodo(newArray) {
    return {
        type: EDIT_TODO,
        payload: { newTodos: newArray }
    }
}
export function resetTodo() {
       return {  type: RESET_TODO }

    }





