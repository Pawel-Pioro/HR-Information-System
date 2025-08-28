import { useContext, useEffect, useState } from "react"
import { APIContext } from "../../../context/contexts"

export default function TimeClockingContainer() {
    const { client } = useContext(APIContext)
    const [attendanceToday, setAttendanceToday] = useState({})

    useEffect(() => {
        client.get("accounts/attendance/today/").then((response) => {
            setAttendanceToday(response.data)
        })
    }, [])

    function clockInHandler() {
        client.post("accounts/attendance/clock_in/").then((response) => {
            setAttendanceToday(response.data)
        })
    }

    function clockOutHandler() {
        client.post("accounts/attendance/clock_out/").then((response) => {
            setAttendanceToday(response.data)
        })
    }

    function getLocalTime(time) {
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    function getMinutesDifference(targetTimeStr) {
        console.log(targetTimeStr)
        const now = new Date();
        const [hours, minutes] = targetTimeStr.split(":").map(Number);
        const target = new Date();
        target.setHours(hours, minutes, 0, 0);
        const rounded = Math.round((now - target) / 60000)
        return [Math.floor(rounded / 60), rounded % 60];
    }

    console.log(attendanceToday)
    return (
        <div className="card card-border bg-base-200 w-full">
            <div className="p-6 place-items-center">
                <h2 className="text-2xl font-bold">Time Clock</h2>
                <div className="mt-3">
                    {Object.keys(attendanceToday).length ?
                        <div>
                            {attendanceToday.clockOut === null ?
                                <div>
                                    <p className="font-bold mb-3">You are currently clocked in for:</p>
                                    <p className="font-bold text-xl text-center mb-2">{
                                        getMinutesDifference(
                                            getLocalTime(attendanceToday.clockIn)
                                        )[0]
                                    }h {
                                            getMinutesDifference(
                                                getLocalTime(attendanceToday.clockIn)
                                            )[1]
                                        }m</p>
                                    <button onClick={clockOutHandler} className="btn btn-primary w-full">Clock Out</button>

                                </div>
                                :
                                <div>
                                    <p className="font-bold mb-3">You were last clocked out at <span className="text-xl">{getLocalTime(attendanceToday.clockOut)}</span> for:</p>
                                    <p className="font-bold text-xl text-center mb-2">{
                                        getMinutesDifference(
                                            new Date(attendanceToday.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        )[0]
                                    }h {
                                            getMinutesDifference(
                                                new Date(attendanceToday.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })
                                            )[1]
                                        }m</p>
                                    <button onClick={clockOutHandler} className="btn btn-primary w-full">Clock hours</button>
                                </div>
                            }
                        </div>
                        :
                        <div>
                            <p className="font-bold mb-3">You have not clocked in today</p>
                            <button onClick={clockInHandler} className="btn btn-primary w-full">Clock In</button>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}
