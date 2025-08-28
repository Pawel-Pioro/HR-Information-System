import { useContext, useEffect, useState } from "react";
import TimeClockingContainer from "../../components/Employee/EmployeeDashboard/TimeClockingContainer";
import { APIContext } from "../../context/contexts";

export default function EmployeeDashboard() {
    const { client } = useContext(APIContext)

    return (
        <div>
            <h1 className="font-bold text-4xl text-center my-3">Your Dashboard</h1>
            <TimeClockingContainer />
        </div>
    )
}
