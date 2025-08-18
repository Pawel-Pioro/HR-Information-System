import moment from 'moment'

export default function EmploymentSummary({ employee }) {
  return (
    <div className="card card-border bg-base-200 w-full">
      <div className="grid p-6 place-items-center">
        <h2 className="text-2xl font-bold">Employment Details</h2>
        <div className="mt-3">
          <p><span className="font-bold pr-3">Job Title</span>{employee.employee.jobTitle}</p>
          {employee.employee.department && <p><span className="font-bold pr-3">Department</span>{employee.employee.department}</p>}
          <p><span className="font-bold pr-3">Type</span>{employee.employee.employmentType}</p>
          {employee.employee.manager && <p><span className="font-bold pr-3">Manager</span>{employee.employee.manager.first_name} {employee.employee.manager.last_name}</p>}
          <p><span className="font-bold pr-3">Hired</span>{moment(employee.employee.hiredDate).format('D MMMM YYYY')}</p>
          <p><span className="font-bold pr-3">Schedule</span>{employee.employee.startTime.slice(0, -3)} - {employee.employee.endTime.slice(0, -3)}</p>
          <p><span className="font-bold pr-3">Wage</span>£{employee.employee.hourlyRate}/hour</p>
          <p><span className="font-bold pr-3">Bonuses</span>£{employee.employee.bonuses}</p>
        </div>
      </div>
    </div >
  )
}
