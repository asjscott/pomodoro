import React, { useState } from 'react'

const PomodoroSettings = ({intervals, submit, timings, settings}) => {

    const [ints, setInts] = useState(intervals)

    const [times, setTimes] = useState({
        ...timings
    })

  return (
    <>
    <div className='flex flex-col items-center text-slate-600 p-2'>
        <div className='flex justify-between w-full border-b-2'>
            <span>Settings</span>
            <button onClick={settings}>❎</button>
        </div>
        <div>
        <form onSubmit={submit} className='grid grid-rows-12'>
                <span className='flex flex-wrap row-span-2 content-end p-2 '>
                    Timer:
                </span>
                <div className='grid grid-cols-3 row-span-4 text-sm p-2'>
                    <span>
                        <label>Pomodoro: </label>
                        <input type="number" name="pomo" className='w-1/2' value={times.pomoTime / 60} onChange={e => setTimes({...times, pomoTime: (e.target.value * 60)})}/>
                    </span>
                    <span>
                        <label>Short Break: </label>
                        <input type="number" name="shrt" className='w-1/2' value={times.shrtTime / 60} onChange={e => setTimes({...times, shrtTime: (e.target.value * 60)})}/>
                    </span>
                    <span>
                        <label>Long Break: </label>
                        <input type="number" name="lng" className='w-1/2' value={times.lngTime / 60} onChange={e => setTimes({...times, lngTime: (e.target.value * 60)})}/>
                    </span>
                </div>
                <hr></hr>
                <div className=' row-span-3'>
                    <span className='flex flex-col'>
                        <label>Intervals: </label>
                        <input type="number" name="intervals" className="text-sm" value={ints} onChange={e => setInts(e.target.value)}/>
                    </span>
                </div>
                <div className='flex row-span-2 justify-center'>
                    <input type='submit' className="w-1/4 border border-slate-600 rounded-md hover:bg-slate-300" value="OK"/>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default PomodoroSettings