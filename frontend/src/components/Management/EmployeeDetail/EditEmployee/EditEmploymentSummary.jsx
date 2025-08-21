
export default function EditEmploymentSummary({
    employee,
    userInputValues,
    setUserInputValues,
    employeeInputValues,
    setEmployeeInputValues
}) {
    console.log(employeeInputValues)
    return (
        <div className="card card-border bg-base-200 w-full">
            <div className="grid p-6 place-items-center">
                <h2 className="text-2xl font-bold">Employment Details</h2>
                <div className="mt-3">
                    {/* Employment type */}
                    <div className="flex gap-2 items-center">
                        <p><span className="font-bold">Type</span></p>
                        <select className='select' value={employeeInputValues.employmentType} onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, employmentType: e.target.value }) }}>
                            <option value="Full-Time">Full Time</option>
                            <option value="Part-Time">Part Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Intern">Internship</option>
                            <option value="Student">Student</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Manager */}
                    <div className="flex gap-2 items-center">
                        <p><span className="font-bold">Manager (Email)</span></p>
                        <input pattern='^(?!\.)(?!.*\.\.)[^@\s]+(?<!\.)@[^@\s]+\.[^@\s]{2,}$'
                            placeholder='Manager Email'
                            type="email"
                            value={employeeInputValues.manager ? employeeInputValues.manager : ""}
                            onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, manager: e.target.value === "" ? null : e.target.value }) }}
                            className="text-base input validator" />
                    </div>

                    {/* Hired Date */}
                    <div className="flex gap-2 items-center">
                        <p><span className="font-bold">Hired Date</span></p>
                        <input
                            type="date"
                            required
                            value={employeeInputValues.hiredDate}
                            onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, hiredDate: e.target.value }) }}
                            className=" input validator w-1/2" />
                    </div>

                    {/* Starting Time */}
                    <div className="flex gap-2 items-center">
                        <p><span className="font-bold">Starting Time</span></p>
                        <input
                            type="time"
                            required
                            value={employeeInputValues.startTime}
                            onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, startTime: e.target.value }) }}
                            className=" input validator w-1/2" />
                    </div>

                    {/* Ending Time */}
                    <div className="flex gap-2 items-center">
                        <p><span className="font-bold">Ending Time</span></p>
                        <input
                            type="time"
                            required
                            value={employeeInputValues.endTime}
                            onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, endTime: e.target.value }) }}
                            className=" input validator w-1/2" />
                    </div>

                    {/* Wage */}
                    <div className="flex gap-2 items-center">
                        <p><span className="font-bold">Wage</span></p>
                        <input
                            min={0}
                            type="number"
                            required
                            value={employeeInputValues.hourlyRate}
                            onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, hourlyRate: e.target.value }) }}
                            className=" input validator w-1/4" />

                        <p><span className="font-semibold">/ hour</span></p>
                    </div>

                    {/* Bonuses */}
                    <div className="flex gap-2 items-center">
                        <p><span className="font-bold">Bonuses</span></p>
                        <input
                            min={0}
                            type="number"
                            required
                            value={employeeInputValues.bonuses}
                            onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, bonuses: e.target.value }) }}
                            className=" input validator w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    )
}
