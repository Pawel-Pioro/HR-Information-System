import { useContext, useState } from 'react'
import { APIContext, AuthContext } from '../../../context/contexts'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function CreateLeaveRequestModal({ setMessage, leaveTypes }) {
  const { client } = useContext(APIContext)
  const { user } = useContext(AuthContext)

  const [userInputs, setUserInputs] = useState({
    range: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    },
    leaveTypeId: "1",
    reason: ""
  })

  function createLeaveRequest(e) {
    e.preventDefault()
    client.post("accounts/leaveRequests/", {
      start_date: userInputs.range.startDate.toISOString().slice(0, 10),
      end_date: userInputs.range.endDate.toISOString().slice(0, 10),
      leave_type: userInputs.leaveTypeId,
      reason: userInputs.reason,
    }).then((response) => {
      window.location.reload()
    }).catch((error) => {
      console.log(error)
    })
  }
  console.log(userInputs)

  return (
    <dialog id="createLeaveRequestModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </form>
        <h1 className="font-bold text-lg mb-3">Create Leave Request </h1>
        <form onSubmit={createLeaveRequest}>
          <div className="fieldset">
            <legend className="fieldset-legend">Dates</legend>
            <DateRange
              minDate={new Date()}
              editableDateInputs={true}
              onChange={item => setUserInputs({ ...userInputs, range: item.selection })}
              moveRangeOnFirstSelection={false}
              ranges={[userInputs.range]}
            />
          </div>
          <div className="fieldset">
            <legend className="fieldset-legend">Leave Type</legend>

            <select value={userInputs.leaveTypeId} onChange={(e) => setUserInputs({ ...userInputs, leaveTypeId: e.target.value })} required className='select validator'>
              {leaveTypes.map((leaveType) =>
                <option key={leaveType.id} value={leaveType.id}>{leaveType.name}</option>
              )}
            </select>
          </div>
          <div className="fieldset">
            <legend className="fieldset-legend">Reason</legend>
            <textarea value={userInputs.reason} onChange={(e) => setUserInputs({ ...userInputs, reason: e.target.value })} required className="textarea textarea-bordered w-full validator" placeholder="Leave a reason"></textarea>
          </div>

          <div className='flex place-self-end mt-6'>
            <button className='btn btn-success' >Confirm</button>
          </div>
        </form >
      </div>
      <form method="dialog" className="modal-backdrop"><button>close</button></form>
    </dialog >
  )
}
