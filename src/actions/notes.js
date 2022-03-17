import { types } from "../types/types";
import { db } from "../firebase/firebase-config";


export const startNewNote = () => {
    // Se usa el dispatch en el return cuando es una tarea asincrona, 
    // el segundo argumento toma el state global
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        
        dispatch(activeNote(doc.id, newNote));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

})