import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../fireBaseConfig";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccessful } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const FirebaseOth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            axios
                .post(
                    "http://localhost:4000/api/auth/google",
                    {
                        username: result.user.displayName,
                        email: result.user.email,
                        image: result.user.photoURL,
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    dispatch(signInSuccessful(res));
                    navigate("/");
                });
        } catch (error) {
            console.log("error from FirebaseOth site: ", error.message);
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex justify-center items-center gap-3 p-2 md:p-3 border-2 rounded-lg hover:bg-gray-200"
        >
            <img
                src="../../public/Google__G__logo.svg.png"
                className="md:w-[25px] h-[18px] md:h-[25px]"
                alt=""
            />
            <span className="font-semibold text-[14px] md:text-[18px]">
                Sign in with Google
            </span>
        </button>
    );
};

export default FirebaseOth;
