import React, { useCallback, useEffect, useState } from 'react'
import PomodoroSettings from './PomodoroSettings'
import Navbar from './Navbar'

const Pomodoro = () => {

    const intialSettings = {
        intervals: 4,
        pomoTime: 1500,
        shrtTime: 300,
        lngTime: 900,
    }

    const [numIntervals, setNumIntervals] = useState(intialSettings.intervals)

    const [nextIntervals, setNextIntervals] = useState({
        current: "pomodoro",
        next: "short break",
        intervals: numIntervals,
    })

    const [timings, setTimings] = useState({
        pomoTime: intialSettings.pomoTime,
        shrtTime: intialSettings.shrtTime,
        lngTime: intialSettings.lngTime,
    })

    const [timer, setTimer] = useState(timings.pomoTime)

    const [intervalId, setIntervalId] = useState(null)

    const clock = `${((timer - timer%60)/60)}:${timer%60 < 10 ? `0${timer%60}` : timer%60}`

    const decrement = () => {
        setTimer(prev => prev - 1)
    }

    const [isSettings, setIsSettings] = useState(false)

    function handleStart() {
        if (intervalId === null) {
            setIntervalId(setInterval(decrement, 10))
        }
    }
    
    function handleStop() {
        clearInterval(intervalId)
        setIntervalId(null)
    }

    function handleReset() {
        setTimer(intialSettings.pomoTime)
        setTimings({
            pomoTime: intialSettings.pomoTime,
            shrtTime: intialSettings.shrtTime,
            lngTime: intialSettings.lngTime,
        })
        setNextIntervals({
            current: "pomodoro",
            next: "short break",
            intervals: intialSettings.intervals
        })
        clearInterval(intervalId)
        setIntervalId(null)
    }

    function handleNames(e) {
        
        if (e.target.id === "short break") {
            setNextIntervals({
                ...nextIntervals,
                current: "short break",
                next: "pomodoro"
            })
            setTimer(timings.shrtTime)
        } else if (e.target.id === "long break") {
            setNextIntervals({
                ...nextIntervals,
                current: "long break",
                next: "pomodoro"
            })
            setTimer(timings.lngTime)
        } else {
            setNextIntervals({
                ...nextIntervals,
                current: "pomodoro",
                next: "short break"
            })
            setTimer(timings.pomoTime)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setNumIntervals(e.target.intervals.value)
        setTimings({
            pomoTime: (e.target.pomo.value * 60),
            shrtTime: e.target.shrt.value * 60, 
            lngTime: e.target.lng.value * 60,
        })
        setNextIntervals({
            current: "pomodoro",
            next: "short break",
            intervals: e.target.intervals.value
        })
        setTimer(e.target.pomo.value * 60)
        setIsSettings(false)
    }

    const nextInterval = useCallback(() => {
        console.log(nextIntervals)
        if (nextIntervals.current === "pomodoro" && nextIntervals.intervals > 1) {
            setNextIntervals({
                ...nextIntervals,
                current: "short break",
                next: "pomodoro",
                intervals: nextIntervals.intervals -1
            })
            setTimer(timings.shrtTime)
        }  else if (nextIntervals.current === "pomodoro" && nextIntervals.intervals === 1) {
            setNextIntervals({
                ...nextIntervals,
                current: "long break",
                next: "pomodoro",
                intervals: numIntervals
            })
            setTimer(timings.lngTime)
        } else if (nextIntervals.intervals > 1) {
            setNextIntervals({
                ...nextIntervals,
                current: "pomodoro",
                next: "short break"
            })
            setTimer(timings.pomoTime)
        } else {
            setNextIntervals({
                ...nextIntervals,
                current: "pomodoro",
                next: "long break"
            })
            setTimer(timings.pomoTime)
        }
    }, [nextIntervals, numIntervals, timings])

    useEffect(() => {
        if (timer === 0) {
            nextInterval()
        }
    }, [timer, nextInterval])

  return (
    <>
    <Navbar />

    <div className={`flex flex-col pb-48 p-4 items-center justify-center h-screen w-full text-slate-50 font-varela ${nextIntervals.current === "pomodoro" ? "bg-red-400" : nextIntervals.current === "short break" ? "bg-teal-500" : "bg-sky-600"}`}>
    <div className="mb-10">
        <span className="text-2xl sm:text-6xl">Pomodoro Timer</span>
    </div>
        <div className={`flex flex-col items-center justify-center container max-w-sm sm:max-w-lg py-5 rounded-xl ${nextIntervals.current === "pomodoro" ? "bg-red-300" : nextIntervals.current === "short break" ? "bg-teal-400" : "bg-sky-300"}`}>
            <div className='inline-flex justify-center space-x-4'>
                <span className={`${nextIntervals.current === "pomodoro" ? "bg-red-900 font-bold" : ""} text-center px-3 rounded-md hover:cursor-pointer`} id="pomodoro" onClick={e => handleNames(e)}>Pomodoro</span>
                <span className={`text-center px-3 rounded-md hover:cursor-pointer ${nextIntervals.current === "short break" ? "bg-teal-600 font-bold" : ""} ` } id="short break" onClick={e => handleNames(e)}>Short Break</span>
                <span className={`text-center px-3 rounded-md hover:cursor-pointer ${nextIntervals.current === "long break" ? "bg-sky-800 font-bold" : ""} `} id="long break" onClick={e => handleNames(e)}>Long Break</span>
            </div>
            <div className='flex justify-center mt-5 text-6xl sm:text-9xl text-center font-bold'>{clock}</div>
            <div className='grid grid-cols-2 sm:grid-cols-4 justify-between text-center mt-5 border-box px-5 w-full'>
                <button className="mx-auto w-24 text-xl mb-5 sm:mb-0 py-3 border rounded-xl hover:bg-slate-400" onClick={handleStart}>Start</button>
                <button className="mx-auto w-24 text-xl mb-5 sm:mb-0 py-3 border rounded-xl hover:bg-slate-400" onClick={handleStop}>Stop</button>
                <button className="mx-auto w-24 text-xl py-3 border rounded-xl hover:bg-slate-400" onClick={handleReset}>Reset</button>
                <button className="mx-auto w-24 text-xl py-3 border rounded-xl hover:bg-slate-400" onClick={() => setIsSettings(!isSettings)}>Settings</button>
            </div>
        </div>
        <div>
        <span>Intervals: {nextIntervals.intervals}</span>
        </div>
        <div className={`absolute flex flex-col bg-slate-50 rounded-md w-96  ${isSettings ? "block" : "hidden"}`}>
            <PomodoroSettings intervals={numIntervals} timings={timings} submit={handleSubmit} settings={() => setIsSettings(!isSettings)}/>
        </div>
        <div className='relative top-10'>
            <div className=''>
                <a
                    role="button"
                    href="https://github.com/asjscott/pomodoro/tree/main/src"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    Check out the code
                </a>
            </div>
        </div>
    </div>
    </>
  )
}

export default Pomodoro