import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes'
import { useForm } from '../../custom-hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  
  const dispatch = useDispatch();

  const {active:note} = useSelector(state => state.notes)
  const [formValues, handleInputChange, reset] =useForm(note)
  const {title, body, id} = formValues;

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
  
  
  
  return (
    <div className='notes__main-content'>
        
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
                  src='https://archzine.es/wp-content/uploads/2019/07/5-estrellas-cielo-monta%C3%B1a-rocas-playa-rocas-color-morado-agua-fondos-de-pantalla-del-mar-fotos-para-descargar-paisajes-bonitos.jpeg'
                  alt='imagen'
                />
                )
              }
              
            </div>
        </div>
    </div>
  )
}
