
export default function EditAttendance({
    employee,
    userInputValues,
    setUserInputValues,
    employeeInputValues,
    setEmployeeInputValues
}) {
    return (
        <div className="card card-border bg-base-200 w-full">
            <div className="grid p-6 place-items-center">
                <h2 className="text-2xl font-bold">Attendance and Leave</h2>
                <div className="mt-3">
                    {/* Leave balance */}
                    <div className="stats">
                        <div className="stat place-items-center">
                            <div className="stat-title">Leave Balance</div>
                            <input
                                min={0}
                                className="input w-1/2 font-extrabold text-center text-xl validator"
                                type="number" value={employeeInputValues.leaveBalance}
                                onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, leaveBalance: e.target.value }) }}
                                placeholder="Balance"
                            />
                            <div className="stat-desc">Days remaining</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
