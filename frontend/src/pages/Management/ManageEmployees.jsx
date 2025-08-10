import { useContext, useEffect, useState } from "react"
import { APIContext, AuthContext } from "../../context/contexts"
import { useNavigate } from "react-router-dom"

function EmployeeTable() {
    const { client } = useContext(APIContext)
    const { setLoading } = useContext(AuthContext)
    const Navigate = useNavigate()

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        setLoading(true)
        client.get("accounts/employees/").then((response) => {
            setEmployees(response.data.employees)
        })
        setLoading(false)
    }, [])
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.first_name} {employee.last_name}</td>
                            <td>{employee.email}</td>
                            {employee.employee != null
                                ? (
                                    <>
                                        <td>{employee.employee.jobTitle}</td>
                                        <td>{employee.employee.department ? employee.employee.department.name : "N/A"}</td>
                                        <td>{employee.employee.employmentStatus}</td>
                                    </>
                                )
                                : (<>
                                    <td>Not an employee yet</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </>
                                )
                            }
                            <td><button className="btn btn-neutral" onClick={() => { Navigate(`/employees/${employee.id}`) }}>Manage</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default function ManageEmployees() {
    return (
        <div>
            <h1 className="font-bold text-4xl text-center my-3">Manage Employees</h1>

            <EmployeeTable />
        </div>
    )
}
