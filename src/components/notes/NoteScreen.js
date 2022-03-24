import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../custom-hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  
  const dispatch = useDispatch();

  const {active:note} = useSelector(state => state.notes)
  const [formValues, handleInputChange, reset] =useForm(note)
  const {title, body} = formValues;

  const activeId = useRef(note.id)

  useEffect(() => {
    if(note.id !== activeId.current){
      reset( note )
      activeId.current = note.id;
    }
  }, [note, reset])

  useEffect(() => {
    
    dispatch(activeNote(formValues.uid, {...formValues} ));

  }, [formValues, dispatch])
  
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleting(activeId.current));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }
  
  return (
    <div className='notes__main-content animate__animated animate__backInLeft animate__faster'>
        
        <NotesAppBar />

        <div className='notes__content'>
            <input 
              type="text"
              placeholder='Some awesome title'
              className='notes__title-input'
              name='title'
              value={title}
              onChange={handleInputChange}
            />
            <textarea
              placeholder='What happened today'
              className='notes__textarea'
              name='body'
              value={body}
              onChange={handleInputChange} 
            ></textarea>

            <div className='notes__image'>
              {
                (note.url) && (
                  <img
                  src={note.url}
                  alt='imagen'
                />
                )
              }
              
            </div>
        </div>
        <button 
          className='btn btn-danger'
          onClick={handleDelete}
        >
              Delete
        </button>
    </div>
  )
}
