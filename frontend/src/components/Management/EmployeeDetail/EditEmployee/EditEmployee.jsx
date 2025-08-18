import { useContext, useState } from "react"
import EditAttendance from "./EditAttendance"
import EditEmploymentSummary from "./EditEmploymentSummary"
import EditProfileSummary from "./EditProfileSummary"
import { APIContext } from "../../../../context/contexts"

export default function EditEmployee({ employee, setEditMode }) {
    const { client } = useContext(APIContext)

    const [userInputValues, setUserInputValues] = useState({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email
    })
    const [employeeInputValues, setEmployeeInputValues] = useState({
        employmentStatus: employee.employee?.employmentStatus,
        phoneNumber: employee.employee?.phoneNumber,
        ...(employee.employee?.department && { department: employee.employee?.department }),
        jobTitle: employee.employee?.jobTitle,
        dateOfBirth: employee.employee?.dateOfBirth,
    })

    function updateEmployee() {

        client.patch(`accounts/employees/${employee.id}/`, {
            ...userInputValues,
            employee: {
                ...employeeInputValues
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    console.log({
        ...userInputValues,
        employee: {
            ...employeeInputValues
        }
    })

    return (
        <>
            <div className="">
                <EditProfileSummary
                    employee={employee}
                    userInputValues={userInputValues}
                    setUserInputValues={setUserInputValues}
                    employeeInputValues={employeeInputValues}
                    setEmployeeInputValues={setEmployeeInputValues}
                />
            </div>
            <div className="grid gap-4">
                {employee.employee &&
                    <>
                        <EditEmploymentSummary employee={employee} />
                        <EditAttendance employee={employee} />
                    </>}
            </div>
            <div className="card-actions mr-4 mt-5">
                <button className="btn btn-success" onClick={updateEmployee}>Save</button>
            </div>
        </>
    )
}
