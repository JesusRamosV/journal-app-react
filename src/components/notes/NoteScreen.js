import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
        
        <NotesAppBar />

        <div className='notes__content'>
            <input 
              type="text"
              placeholder='Some awesome title'
              className='notes__title-input'
            />
            <textarea
              placeholder='What happened today'
              className='notes__textarea'
            ></textarea>

            <div className='notes__image'>
              <img
                src='https://archzine.es/wp-content/uploads/2019/07/5-estrellas-cielo-monta%C3%B1a-rocas-playa-rocas-color-morado-agua-fondos-de-pantalla-del-mar-fotos-para-descargar-paisajes-bonitos.jpeg'
                alt='imagen'
              />
            </div>
        </div>
    </div>
  )
}
