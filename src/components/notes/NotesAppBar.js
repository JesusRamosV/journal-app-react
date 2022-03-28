import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

import moment from 'moment'

export const NotesAppBar = () => {

  const date = new Date();
  const dateActual = moment(date);

  const dispatch = useDispatch();
  const {active} = useSelector( state => state.notes)

  const hanldePictureClick = () => {
    document.querySelector('#fileSelector').click();
  } 
 
  const handleFileChange = (e) => {
    
    const file = e.target.files[0];
    if (file) {
      dispatch( startUploading(file) )
    }
  }

  const handleSave = () => {
    dispatch(startSaveNote(active))
  }

  return (
    <div className='notes__appbar'>
        <span>{dateActual.format('LL')}</span>

        <input 
          id='fileSelector'
          type='file'
          style={{ display: 'none'}}
          onChange={handleFileChange}
        />
        <div>
            <button 
              className='btn'
              onClick={hanldePictureClick}
            >
                Picture
            </button>
            <button 
              className='btn'
              onClick={handleSave}
            >
                Save
            </button>
        </div>
    </div>
  )
}
