import { useContext, useEffect, useState } from "react";
import TimeClockingContainer from "../../components/Employee/EmployeeDashboard/TimeClockingContainer";
import { AuthContext } from "../../context/contexts";
import LeaveContainer from "../../components/Employee/EmployeeDashboard/LeaveContainer";

export default function EmployeeDashboard() {
    const { user } = useContext(AuthContext)

    console.log(user)

    return (
        <div>
            <h1 className="font-bold text-4xl text-center my-3">Your Dashboard</h1>
            <div className="grid grid-cols-1 gap-4">
                <TimeClockingContainer />
                <LeaveContainer user={user} />
            </div>
        </div>
    )
}
