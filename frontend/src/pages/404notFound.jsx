import { Link } from "react-router-dom";

export default function NotFound() {


    return (
        <div>
            <main className="grid place-items-center  px-6 py-24 sm:py-32 lg:px-8 ">
                <div className="text-center border-0 sm:border p-4 sm:p-10">
                    <p className="font-bold text-7xl">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-300">
                        Page not found
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="btn btn-primary px-3.5 py-2.5 font-semibold "
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
