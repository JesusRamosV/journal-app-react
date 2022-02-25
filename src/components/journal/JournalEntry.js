import React from 'react'

export const JournalEntry = () => {
    
    return (
    <div className='journal__entry pointer'>
        <div 
          className='journal__entry-picture'
          style={{
            backgroundSize: 'cover',
            backgroundImage: 'url(https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80)'
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
