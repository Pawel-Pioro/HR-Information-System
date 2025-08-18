import { useState } from "react";
import moment from 'moment'
import LeaveRequestModal from "./LeaveRequestModal";

export default function Attendance({ employee }) {
  const [selectedRequest, setSelectedRequest] = useState(null)

  function selectRequestHandler(request) {
    setSelectedRequest(request)
    document.getElementById('leaveRequestModal').showModal()
  }

  return (
    <div className="card card-border bg-base-200 w-full ">
      <div className="grid p-6 place-items-center">
        <h1 className="text-2xl font-bold">Attendance and Leave</h1>
        <div className="mt-3">
          <div className="stats stats-vertical sm:stats-horizontal shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Leave Balance</div>
              <div className="stat-value">{employee.employee.leaveBalance}</div>
              <div className="stat-desc">Days remaining</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Active Leave Requests</div>
              <div className="stat-value">{employee.employee.leave_requests.length}</div>
              <div className="stat-desc">Amount</div>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold text-center">Active leave requests</p>

          {employee.employee.leave_requests.length > 0
            ?
            <>
              {employee.employee.leave_requests.map((request) => (
                <div key={request.id} className="flex shadow mt-3 p-3 bg-base-100 gap-2 items-center">
                  <p className="text-sm">{moment(request.start_date).format('D MMMM YYYY')}</p>
                  <button className="btn btn-sm" onClick={() => selectRequestHandler(request)}>View</button>
                </div>
              ))}
              <LeaveRequestModal leaveRequestInfo={selectedRequest} />
            </>
            : <>
              <p className=" text-center mt-2 font-light">No requests made</p>
            </>}

        </div>
      </div>
    </div >
  )
}
