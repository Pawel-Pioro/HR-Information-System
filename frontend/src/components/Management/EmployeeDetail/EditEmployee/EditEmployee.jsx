import { useContext, useEffect, useState } from "react"
import EditAttendance from "./EditAttendance"
import EditEmploymentSummary from "./EditEmploymentSummary"
import EditProfileSummary from "./EditProfileSummary"
import { APIContext } from "../../../../context/contexts"
import { useNavigate, useParams } from "react-router-dom"

export default function EditEmployee() {
    const { id } = useParams()
    const { client } = useContext(APIContext)

    const Navigate = useNavigate()

    const [employee, setEmployee] = useState({})

    const [userInputValues, setUserInputValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
    })
    const [employeeInputValues, setEmployeeInputValues] = useState({
        employmentStatus: "",
        phoneNumber: "",
        department: "",
        jobTitle: "",
        dateOfBirth: "",
    })

    useEffect(() => {
        client.get(`accounts/employees/${id}/`).then((response) => {
            const data = response.data

            setEmployee(data)

            setUserInputValues({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email
            })
            setEmployeeInputValues({
                employmentStatus: data.employee?.employmentStatus,
                phoneNumber: data.employee?.phoneNumber,
                ...(data.employee?.department && { department: data.employee?.department }),
                jobTitle: data.employee?.jobTitle,
                dateOfBirth: data.employee?.dateOfBirth,
            })

        }).catch((error) => {
            console.log(error)
        })
    }, [])



    function updateEmployee() {

        client.patch(`accounts/employees/${employee.id}/`, {
            ...userInputValues,
            employee: {
                ...employeeInputValues
            }
        }).then((response) => {
            Navigate(`/employees/${id}`)
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
        <div>
            <div className="flex justify-between items-center">
                <button className="btn btn-ghost my-3" onClick={() => { Navigate(`/employees/${id}`) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
                    </svg>
                    Go back
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
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
                        </>
                    }
                </div>
                <div className="card-actions mr-4 mt-5">
                    <button className="btn btn-success" onClick={updateEmployee}>Save</button>
                </div>
            </div>
        </div>
    )
}
