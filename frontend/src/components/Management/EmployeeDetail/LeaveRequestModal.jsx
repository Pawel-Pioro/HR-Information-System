import moment from 'moment'
import { useContext } from 'react'
import { APIContext } from '../../../context/contexts'

export default function LeaveRequestModal({ leaveRequestInfo, setMessage }) {
  const { client } = useContext(APIContext)

  function rejectRequest() {
    client.delete(`accounts/leaveRequests/${leaveRequestInfo.id}/reject/`).then((response) => {
      window.location.reload()
    })
  }

  function acceptRequest() {
    client.patch(`accounts/leaveRequests/${leaveRequestInfo.id}/accept/`).then((response) => {
      window.location.reload()
    })
      .catch((error) => {
        setMessage({
          type: 'error',
          text: error.response.data.error,
        })
      })
  }

  return (
    <dialog id="leaveRequestModal" className="modal modal-bottom sm:modal-middle">
      {leaveRequestInfo &&
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </form>
          <h1 className="font-bold text-lg mb-2">Leave Request starting {moment(leaveRequestInfo.start_date).format('D MMMM YYYY')}</h1>
          <div className='pl-3'>
            <p className='text-sm'><span className="font-bold pr-3">Duration</span>{leaveRequestInfo.duration} days</p>
            <p className='text-sm'><span className="font-bold pr-3">End Date</span>{moment(leaveRequestInfo.end_date).format('D MMMM YYYY')}</p>
            <p className='text-sm'><span className="font-bold pr-3">Leave Type</span>{leaveRequestInfo.leave_type_name}</p>
            <p className='text-sm'><span className="font-bold pr-3">Reason</span>{leaveRequestInfo.reason}</p>
            <div className='flex gap-3 place-self-center mt-3'>
              <button className='btn btn-success' onClick={acceptRequest}>Accept</button>
              <button className='btn btn-error' onClick={rejectRequest}>Reject</button>
            </div>
          </div>
        </div>
      }
      <form method="dialog" className="modal-backdrop"><button>close</button></form>
    </dialog>
  )
}
