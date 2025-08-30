import { useContext, useEffect, useState } from "react";
import CreateLeaveRequestModal from "./CreateLeaveRequestModal";
import { APIContext } from "../../../context/contexts";

export default function LeaveContainer({ user }) {
    const { client } = useContext(APIContext)

    const [leaveTypes, setLeaveTypes] = useState([])

    useEffect(() => {
        client.get("accounts/leaveTypes/").then((response) => {
            setLeaveTypes(response.data)
        })
    }, [])
    console.log(leaveTypes)
    return (
        <div className="card card-border bg-base-200 w-full">
            <div className="p-6 place-items-center">
                <h2 className="text-2xl font-bold">Time Off</h2>
                <div className="mt-3">
                    <div className="my-4 place-items-center">
                        <div className="stat-title">Leave Balance</div>
                        <div className="stat-value">{user.employee.leaveBalance}</div>
                        <div className="stat-desc">Days remaining</div>
                    </div>

                    <div>
                        <button onClick={() => document.getElementById('createLeaveRequestModal').showModal()} className="btn btn-neutral w-full">Request time off</button>
                        <CreateLeaveRequestModal leaveTypes={leaveTypes} />
                    </div>
                </div>
            </div>
        </div>
    )
}
