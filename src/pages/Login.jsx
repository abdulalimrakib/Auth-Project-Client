import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInSuccessful, signInFailure } from '../redux/userSlice'
import FirebaseOth from '../components/FirebaseOth'

const Login = () => {
    const [formData, setFromData] = useState({});
    const { isLoading, isError } = useSelector((state) => state.user)
    setTimeout(() =>{
        dispatch(signInFailure(false))
    }, 10000)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    };

    const postData = async (e) => {
        try {
            e.preventDefault();
            dispatch(signInStart())
            await axios
                .post("/api/auth/login", formData, {withCredentials: true})
                .then(async (res) => {
                    if (!res?.data?.success) {
                        dispatch(signInFailure(res))
                    } else {
                        dispatch(signInSuccessful(res))
                        navigate("/")
                    }
                })
        } catch (error) {
            console.log(error.message, "from Signup page");
            dispatch(signInFailure(error))
        }
    };

    return (
        <div className="mt-10 p-3 md:p-8 max-w-lg mx-auto md:border-2 rounded-xl">
            <h1 className="text-3xl font-medium text-center">Login</h1>
            <form className="flex flex-col gap-2 mt-8" onSubmit={postData}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 md:p-3 text-black text-[14px] md:text-[18px] w-full rounded-lg border border-teal-400 focus:outline-none focus:ring-2"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-2 md:p-3 text-black text-[14px] md:text-[18px] w-full rounded-lg border border-teal-400 focus:outline-none focus:ring-2"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-600 text-white font-medium p-2 md:p-3 rounded-lg text-[14px] md:text-[18px] uppercase hover:opacity-90 disabled:opacity-70"
                >
                    {isLoading ? "Loading ..." : "Log in"}
                </button>
                <FirebaseOth />
            </form>
            <div className="text-[12px] md:text-[18px] mt-3 flex gap-2">
                <p>Do not have an account?</p>
                <Link to="/signup">
                    <span className="text-blue-600 hover:underline">Sign Up</span>
                </Link>
            </div>
            <p className="text-red-600 text-[12px] md:text-[14px] mt-2 font-serif">
                {isError ? isError.message || "something wrong !!" : ""}
            </p>
        </div>
    );
}

export default Login