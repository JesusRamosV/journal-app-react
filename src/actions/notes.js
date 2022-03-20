import { types } from "../types/types";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";


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

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async( dispatch, getState) => {


        const {uid} = getState().auth;
        // Si no viene una url de img lo elimina para que no mande undefine y firebase bote error
        if( !note.url){
            delete note.url;
        }
        // Aquí parsea tod la nota en una constate para eliminar el id del usuario y que no se grabe en firebase
        const noteToFirestore = {...note}
        delete noteToFirestore.id;

        // Aquí se actualiza y se guarda la nota con su respectivo path en firebase
        await db.doc(`${uid}/journal/notes/${ note.id }`).update( noteToFirestore )
    }

}