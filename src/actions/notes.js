import Swal from "sweetalert2";

import { types } from "../types/types";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";

//

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
        dispatch(addNewNote(doc.id, newNote))


    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
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
        await db.doc(`${uid}/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote(note));
        
        Swal.fire('Saved', note.title, 'success')
    }

}

export const  refreshNote = ( note ) => ({
    type: types.notesUpdate,
    payload: note
})

export const startUploading = (file) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: true,
            didOpen: () => {
                Swal.showLoading();
            }
        })


        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote))

        Swal.close();
    }
}

export const startDeleting = (id) => {
    return async( dispatch, getState) => {

        const uid = getState().auth.uid;

       // const idNote = getState().notes.active.id;
        
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id))
    }

    
  
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
    
})

export const notesCleaning = () => ({
    type: types.notesLogoutCleaning
})