import { useContext, useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { APIContext, AuthContext } from "../../../context/contexts"
import ProfileSummary from "./ProfileSummary"
import EmploymentSummary from "./EmploymentSummary"
import Attendance from "./Attendance"

export default function EmployeeDetail() {
    const { id } = useParams()
    const { client } = useContext(APIContext)

    const Navigate = useNavigate()

    const [employee, setEmployee] = useState({})

    useEffect(() => {
        client.get(`accounts/employees/${id}/`).then((response) => {
            setEmployee(response.data)
        }).catch((error) => {
            Navigate('/employees')
        })
    }, [])

    console.log(employee)
    return (
        <div>
            <div className="flex justify-between items-center">
                <button className="btn btn-ghost my-3" onClick={() => { Navigate('/employees') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
                    </svg>
                    Go back
                </button>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-circle mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                            </path>
                        </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-26 p-2 shadow-sm">
                        <li><a onClick={() => { Navigate(`/employees/${id}/edit`) }}>Edit</a></li>
                        <li><a className="text-error">Delete</a></li>
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
                <div className="">
                    <ProfileSummary employee={employee} />
                </div>
                <div className="grid gap-4">
                    {employee.employee &&
                        <>
                            <EmploymentSummary employee={employee} />
                            <Attendance employee={employee} />
                        </>}
                </div>
            </div>
        </div>
    )
}
