import { useContext, useEffect, useState } from "react"
import EditAttendance from "./EditAttendance"
import EditEmploymentSummary from "./EditEmploymentSummary"
import EditProfileSummary from "./EditProfileSummary"
import { APIContext } from "../../../../context/contexts"
import { useNavigate, useParams } from "react-router-dom"
import AlertPopup from "../../../AlertPopup"

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

    const [message, setMessage] = useState({ type: '', text: '', description: '' })

    useEffect(() => {
        client.get(`accounts/users/${id}/`).then((response) => {
            const data = response.data

            setEmployee(data)

            setUserInputValues({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email
            })
            setEmployeeInputValues({
                ...employeeInputValues,
                employmentStatus: data.employee?.employmentStatus,
                dateOfBirth: data.employee?.dateOfBirth,

                hiredDate: data.employee?.hiredDate,
                startTime: data.employee?.startTime,
                endTime: data.employee?.endTime,
                bonuses: data.employee?.bonuses,

                leaveBalance: data.employee?.leaveBalance,
            })

        }).catch((error) => {
            console.log(error)
        })
    }, [])

    function getFirstFieldError(errors) {
        for (const [title, value] of Object.entries(errors)) {
            if (Array.isArray(value) && value.length > 0) {
                return { title, message: value[0] } // return field name + first error
            } else if (typeof value === "object") {
                const nested = getFirstFieldError(value)
                if (nested) return nested
            }
        }
        return null
    }

    function updateEmployee() {

        client.patch(`accounts/users/${employee.id}/`, {
            ...userInputValues,
            employee: {
                ...employeeInputValues
            }
        }).then((response) => {
            Navigate(`/employees/${id}`)
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 400) {
                let errorObj = (error.response.data)
                const { title: errorTitle, message: errorDesc } = getFirstFieldError(errorObj)
                // let errorTitle = Object.keys(errorObj)[0]
                // let errorDesc = Object.values(errorObj)[0][0]
                console.log(errorObj)
                console.log(errorTitle)
                console.log(errorDesc)
                setMessage({ type: 'error', text: `Invalid value for ${errorTitle}`, description: errorDesc })
            }
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
            <AlertPopup message={message} setMessage={setMessage} />
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
                            <EditEmploymentSummary
                                employee={employee}
                                userInputValues={userInputValues}
                                setUserInputValues={setUserInputValues}
                                employeeInputValues={employeeInputValues}
                                setEmployeeInputValues={setEmployeeInputValues}
                            />
                            <EditAttendance
                                employee={employee}
                                userInputValues={userInputValues}
                                setUserInputValues={setUserInputValues}
                                employeeInputValues={employeeInputValues}
                                setEmployeeInputValues={setEmployeeInputValues}
                            />
                        </>
                    }
                </div>
                <div className="card-actions justify-end col-span-1 md:col-span-2  mr-4 mt-5">
                    <button className="btn btn-success" onClick={updateEmployee}>Save</button>
                </div>
            </div>
        </div>
    )
}
