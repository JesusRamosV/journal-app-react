import React from 'react'

export const JournalEntry = () => {
    
    return (
    <div className='journal__entry pointer'>
        <div 
          className='journal__entry-picture'
          style={{
            backgroundSize: 'cover',
            backgroundImage: 'url(https://i.pinimg.com/originals/1e/5d/0f/1e5d0fe61f9d39dd35a3ba56dbb3eebe.jpg)'
          }}
        >
        </div>
        <div className='journal__entry-body pointer'>
          <p className='journal__entry-title'>
            Un nuevo día
          </p>
          <p className='journal__entry-content pointer'>
            Quis incididunt culpa Lorem cillum culpa amet velit dolore velit quis..
          </p>

        </div>
        <div className='journal__entry-date-box pointer'>
            <span>Monday</span>
            <h4>28</h4>
        </div>
    </div>
  )
}
