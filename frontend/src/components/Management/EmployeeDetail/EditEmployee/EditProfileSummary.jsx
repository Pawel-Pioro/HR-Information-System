import { useContext, useEffect, useState } from 'react'
import { APIContext } from '../../../../context/contexts'

function ExtraEmployeeInfo({ employeeInputValues, setEmployeeInputValues, departments, }) {
    return (
        <>
            {/* Phone */}
            < svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-telephone" viewBox="0 0 16 16" >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
            </svg >
            <div >
                <input pattern='^\+?\d{9,20}$' placeholder='Phone number' required className='input text-base validator' type="text" value={employeeInputValues.phoneNumber} onChange={(e) => setEmployeeInputValues(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                <div className='validator-hint hidden'>Phone number must be 9-20 digits</div>
            </div>

            {  /* Department */}
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
                </svg>
                <select value={employeeInputValues.department} onChange={(e) => setEmployeeInputValues({ ...employeeInputValues, department: e.target.value })} className='select'>
                    <option value={""}>Select Department</option>
                    {departments.map((department) => (
                        <option key={department.id} value={department.name}>{department.name}</option>
                    ))}
                </select>

            </>

            { /* Job Title */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
            </svg>
            <div>
                <input required placeholder="Job Title" type="text" value={employeeInputValues.jobTitle} onChange={(e) => setEmployeeInputValues({ ...employeeInputValues, jobTitle: e.target.value })} className="input validator" />
                <div className='validator-hint hidden'>Enter valid job title</div>
            </div>
            {/* Birth date */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cake" viewBox="0 0 16 16">
                <path d="m7.994.013-.595.79a.747.747 0 0 0 .101 1.01V4H5a2 2 0 0 0-2 2v3H2a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2h-1V6a2 2 0 0 0-2-2H8.5V1.806A.747.747 0 0 0 8.592.802zM4 6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v.414a.9.9 0 0 1-.646-.268 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0A.9.9 0 0 1 4 6.414zm0 1.414c.49 0 .98-.187 1.354-.56a.914.914 0 0 1 1.292 0c.748.747 1.96.747 2.708 0a.914.914 0 0 1 1.292 0c.374.373.864.56 1.354.56V9H4zM1 11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.793l-.354.354a.914.914 0 0 1-1.293 0 1.914 1.914 0 0 0-2.707 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0 1.914 1.914 0 0 0-2.708 0 .914.914 0 0 1-1.292 0L1 11.793zm11.646 1.854a1.915 1.915 0 0 0 2.354.279V15H1v-1.867c.737.452 1.715.36 2.354-.28a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.708 0a.914.914 0 0 1 1.292 0c.748.748 1.96.748 2.707 0a.914.914 0 0 1 1.293 0Z" />
            </svg>
            <div>
                <input max={new Date().toISOString().slice(0, 10)} required placeholder="Date of Birth" type="date" value={employeeInputValues.dateOfBirth} onChange={(e) => setEmployeeInputValues({ ...employeeInputValues, dateOfBirth: e.target.value })} className="input validator" />
                <div className='validator-hint hidden'>Enter valid date of birth</div>
            </div>
        </>
    )
}

export default function EditProfileSummary({
    employee,
    userInputValues,
    setUserInputValues,
    employeeInputValues,
    setEmployeeInputValues
}) {
    const { client } = useContext(APIContext)

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        client.get('accounts/departments/').then((response) => {
            setDepartments(response.data)
        })
    }, [])



    return (
        <div className="card card-border bg-base-200 w-full ">
            <div className="p-6">
                <div className="grid place-self-center md:place-self-start mb-5">
                    {/* <input type="text" value={employee.employee.first_name + ' ' + employee.employee.last_name} onChange={(e) => {  }} className="font-bold text-3xl mb-2 input"></input> */}
                    <div className='flex flex-col gap-1 md:flex-row max-w-[300px] mb-2'>
                        <div>
                            <input required placeholder='First Name' type="text" value={userInputValues.first_name} onChange={(e) => { setUserInputValues({ ...userInputValues, first_name: e.target.value }) }} className="font- text-2xl mb-2 input validator" />
                            <div className="validator-hint hidden">Enter valid first name</div>
                        </div>
                        <div>
                            <input required placeholder='Last Name' type="text" value={userInputValues.last_name} onChange={(e) => { setUserInputValues({ ...userInputValues, last_name: e.target.value }) }} className="font- text-2xl mb-2 input validator" />
                            <div className="validator-hint hidden">Enter valid last name</div>
                        </div>
                    </div>
                    {employee.employee != null ?
                        <>
                            <select className='select' value={employeeInputValues.employmentStatus} onChange={(e) => { setEmployeeInputValues({ ...employeeInputValues, employmentStatus: e.target.value }) }}>
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Terminated">Terminated</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Other">Other</option>
                            </select>
                        </>
                        :
                        <span className="badge badge-error">N/A</span>
                    }
                </div>

                <div className="grid grid-cols-[30px_auto] gap-y-2 place-self-center md:place-self-start items-center">
                    {/* ID */}
                    <p className="font-bold text-lg">id</p>
                    <p className="text-lg">#{employee.id}</p>

                    {/* Email */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                    </svg>
                    <div className=''>
                        <input pattern='^(?!\.)(?!.*\.\.)[^@\s]+(?<!\.)@[^@\s]+\.[^@\s]{2,}$' placeholder='Email' type="email" required value={userInputValues.email} onChange={(e) => { setUserInputValues({ ...userInputValues, email: e.target.value }) }} className="text-base input validator" />
                        <div className="validator-hint hidden">Enter valid email address</div>
                    </div>
                    {employee.employee != null &&
                        <>
                            <ExtraEmployeeInfo employeeInputValues={employeeInputValues} setEmployeeInputValues={setEmployeeInputValues} departments={departments} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
