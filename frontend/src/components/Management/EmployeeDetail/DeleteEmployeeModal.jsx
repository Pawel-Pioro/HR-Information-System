import { useContext } from "react"
import { APIContext } from "../../../context/contexts"

export default function DeleteEmployeeModal({ employee, setMessage }) {
    const { client } = useContext(APIContext)

    function DeleteHandler() {
        if (employee.employee) {
            client.delete(`accounts/employees/${employee.employee.id}/`).then((response) => {
                window.location.reload()
            })
        }
        else {
            setMessage({
                type: "error",
                text: "User doesn't have an employee account"
            })
        }
    }

    return (
        <dialog id="deleteEmployeeModal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h1 className="font-bold text-lg mb-2">Delete Employee</h1>
                    <p className="">Are you sure you want to delete this employee?</p>
                    <p className="text-sm ">The base user will still exist</p>
                </form>
                <div className="modal-action">
                    <button className="btn btn-error" onClick={DeleteHandler}>Delete</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}
