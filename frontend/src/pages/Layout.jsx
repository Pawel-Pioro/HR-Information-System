import Navbar from '../components/Navbar'
import { Outlet, Link, useNavigate } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-12'>
                <div className='col-span-10 lg:col-span-8 col-start-2 lg:col-start-3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
