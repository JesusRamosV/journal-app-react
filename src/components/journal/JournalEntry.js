import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({note}) => {
    
    const { id, date, body, title, url} = note;
    const noteDate = moment(date)
    const dispatch = useDispatch()

    const handleEntryClick = () => {
      dispatch(activeNote(id, note))
    }
    
    return (
    <div 
      className='journal__entry pointer animate__animated animate__backInLeft animate__faster'
      onClick={handleEntryClick}
    >
        {
          url &&
          <div 
            className='journal__entry-picture'
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${url})`
            }}
          >
          </div>
        }
        <div className='journal__entry-body pointer'>
          <p className='journal__entry-title'>
            {title}
          </p>
          <p className='journal__entry-content pointer'>
            {body}
          </p>

        </div>
        <div className='journal__entry-date-box pointer'>
            <span>{noteDate.format('dddd')}</span>
            <h4>{noteDate.format('D')}</h4>
        </div>
    </div>
  )
}
