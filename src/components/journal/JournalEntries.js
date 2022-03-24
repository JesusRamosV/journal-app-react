import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
  
    const {notes} = useSelector(state => state.notes)
    //console.log(...notes);


    const entries = notes;

    const entriesOrder = [...entries.sort( (prev, curr) =>   curr.date - prev.date)];
    // entries.forEach( element => {
    //     console.log(element.date);
    // });
    //console.log(entriesOrder);
    return (
    <div className='journal__entries'>
        {
            entriesOrder.map( note => (
                
                <JournalEntry key={note.id} note={note}/>
            ))
        }
    </div>
  )
}
