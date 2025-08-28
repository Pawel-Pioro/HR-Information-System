import { useContext } from "react"
import { AuthContext } from "../../context/contexts"
import EmployeeDashboard from "./EmployeeDashboard"

export default function EmployeeLandingPage() {
    const { user } = useContext(AuthContext)

    if (user.employee == null) {
        return (
            <div>
                <h1 className="font-bold text-4xl text-center my-3">Not a user</h1>
            </div>
        )
    }
    else {
        return (
            <EmployeeDashboard />
        )
    }
}
