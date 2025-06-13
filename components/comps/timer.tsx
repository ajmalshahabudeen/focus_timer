"use client"
import { useTimer } from "react-timer-hook"
import { Button } from "@/components/ui/button"
import { GoEye } from "react-icons/go"
import { useEffect, useState } from "react"
import { ModeToggle } from "../theme-toggle"
export const Timer = () => {
	const minute = 60
	const hour = minute * 60
	const day = hour * 24

	const [totalTime, setTotalTime] = useState(5)

	const getExpiryTimestamp = () => {
		const expTime = new Date()
		expTime.setSeconds(expTime.getSeconds() + totalTime)
		return expTime
	}
	const {
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp: getExpiryTimestamp(),
		autoStart: false,
	})

	const [hide, setHide] = useState(false)

	useEffect(() => {
		restart(getExpiryTimestamp(), isRunning) // Maintain isRunning state
	}, [totalTime, restart, isRunning])

	return (
		//focus timer
		<div className='flex flex-col gap-2 min-h-screen items-center justify-center'>
			<div className='flex flex-col items-center gap-10'>
				<div className='text-7xl md:text-[20rem] electrolize-regular'>
					<span>{days}</span>:<span>{hours}</span>:
					<span>{minutes}</span>:<span>{seconds}</span>
				</div>
				<p
					className={`text-2xl md:text-3xl font-extralight ${
						hide ? "hidden" : ""
					}`}>
					{isRunning ? "Running" : "Not running"}
				</p>
				<div className={`flex gap-2 md:gap-10 ${hide ? "hidden" : ""}`}>
					{!isRunning ? (
						<Button className='size-20' onClick={start}>
							Start
						</Button>
					) : (
						<Button className='size-20' onClick={pause}>
							Pause
						</Button>
					)}
					<Button
						disabled={isRunning}
						className='size-20'
						onClick={resume}>
						Resume
					</Button>
					<Button
						className='size-20'
						onClick={() => {
							restart(getExpiryTimestamp(), false)
						}}>
						Restart
					</Button>
					<Button
						className='size-20'
						variant={"destructive"}
						onClick={() => setTotalTime(0)}>
						Reset
					</Button>
				</div>
				<div className={`flex gap-2 md:gap-10 ${hide ? "hidden" : ""}`}>
					<div className='flex flex-col gap-2 '>
						<p>Minute</p>
						<Button
							variant={"outline"}
							onClick={() =>
								setTotalTime((prev) => prev + minute)
							}>
							+
						</Button>
						<Button
							variant={"outline"}
							onClick={() =>
								setTotalTime((prev) =>
									Math.max(0, prev - minute)
								)
							}>
							-
						</Button>
					</div>
					<div className='flex flex-col gap-2 '>
						<p>Hour</p>
						<Button
							variant={"outline"}
							onClick={() => setTotalTime((prev) => prev + hour)}>
							+
						</Button>
						<Button
							variant={"outline"}
							onClick={() =>
								setTotalTime((prev) => Math.max(0, prev - hour))
							}>
							-
						</Button>
					</div>
					<div className='flex flex-col gap-2 '>
						<p>Day</p>
						<Button
							variant={"outline"}
							onClick={() => setTotalTime((prev) => prev + day)}>
							+
						</Button>
						<Button
							variant={"outline"}
							onClick={() =>
								setTotalTime((prev) => Math.max(0, prev - day))
							}>
							-
						</Button>
					</div>
				</div>
			</div>
			<div className='fixed bottom-0 p-5 w-full flex gap-5 items-center justify-center'>
				<Button onClick={() => setHide(!hide)} variant={"outline"}>
					<GoEye />
				</Button>
				{!hide && <ModeToggle />}
			</div>
		</div>
	)
}
