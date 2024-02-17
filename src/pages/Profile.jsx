import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../fireBaseConfig";
import axios from "axios";
import {
    signInFailure,
    updateStart,
    updateSuccessful,
    updateFailure,
    deleteSuccessful,
    deleteFailure,
    userSignOut,
} from "../redux/userSlice";

const Profile = () => {
    const { isLoading, userData, isError } = useSelector((state) => state.user);
    const [formData, setFromData] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);
    const [imageFile, setImageFile] = useState();
    if(isError || isUpdated){
        setTimeout(() =>{
            dispatch(signInFailure(false))
            setIsUpdated(false)
        }, 5000)
    }

    const [imagePercentage, setImagePercentage] = useState(0);
    const [imageError, setImageError] = useState(false);
    const imgRef = useRef(null);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (imageFile) handaleUploadImage(imageFile);
    }, [imageFile]);

    const handaleUploadImage = async (imageFile) => {
        const storageLocation = getStorage(app);
        const fileName = new Date().getDate() + imageFile.name;
        const storageRef = ref(storageLocation, fileName);
        const uploadImage = uploadBytesResumable(storageRef, imageFile);
        uploadImage.on(
            "state_changed",
            (snapshot) => {
                const parcentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercentage(Math.round(parcentage));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref).then((downloadUrl) => {
                    setFromData({ ...formData, image: downloadUrl });
                });
            }
        );
    };

    const handlePostData = async (e) => {
        try {
            e.preventDefault();
            dispatch(updateStart());

            await axios
                .post(
                    `http://localhost:4000/api/user/update/${userData?.data?.userData?._id || userData?.data?._id
                    }`,
                    formData,
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    if (res?.data?.success === false) {
                        return dispatch(updateFailure(res));
                    } else {
                        dispatch(updateSuccessful(res));
                        setIsUpdated(true);
                    }
                });
        } catch (error) {
            console.log(error.message, "from update page");
            dispatch(updateFailure(error));
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await axios
                .delete(
                    `http://localhost:4000/api/user/delete/${userData?.data?.userData?._id || userData?.data?._id
                    }`,
                    { withCredentials: true }
                )
                .then((res) => dispatch(deleteSuccessful(res)));
        } catch (error) {
            dispatch(deleteFailure(error));
        }
    };

    const handleSignOut = async () => {
        try {
            await axios
                .get("http://localhost:4000/api/auth/sign-out", {withCredentials: true})
                .then((res) => dispatch(userSignOut(res)));
        } catch (error) { }
    };
    return (
        <div className="mt-10 p-3 max-w-lg mx-auto flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
                Profile
            </h2>
            <form
                action=""
                className="flex flex-col gap-4 mt-3"
                onSubmit={handlePostData}
            >
                <input
                    type="file"
                    ref={imgRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
                <img
                    src={
                        formData.image ||
                        userData?.data?.userData?.image ||
                        userData?.data?.image
                    }
                    className=" rounded-full w-28 h-28 object-cover self-center cursor-pointer outline outline-teal-100"
                    alt="image"
                    onClick={() => imgRef.current.click()}
                />
                <p className="text-center">
                    {imageError ? (
                        <span>
                            Error uploading image (file size must be less than 2 MB)
                        </span>
                    ) : imagePercentage > 0 && imagePercentage < 100 ? (
                        <span className="text-slate-700">{`Uploading: ${imagePercentage} %`}</span>
                    ) : imagePercentage === 100 ? (
                        <span className="text-green-700">Image uploaded successfully</span>
                    ) : (
                        ""
                    )}
                </p>
                <input
                    type="text"
                    placeholder="User Name"
                    className="p-2 md:p-3 text-black text-[14px] md:text-[18px] w-full rounded-lg border border-teal-400 focus:outline-none focus:ring-2"
                    name="username"
                    defaultValue={
                        userData?.data?.userData?.username || userData?.data?.username
                    }
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 md:p-3 text-black text-[14px] md:text-[18px] w-full rounded-lg border border-teal-400 focus:outline-none focus:ring-2"
                    name="email"
                    defaultValue={
                        userData?.data?.userData?.email || userData?.data?.email
                    }
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="p-2 md:p-3 text-black text-[14px] md:text-[18px] w-full rounded-lg border border-teal-400 focus:outline-none focus:ring-2"
                    onChange={handleChange}
                />
                <button className="p-2 md:p-3 text-black font-semibold text-[14px] md:text-[18px] w-full rounded-lg border bg-teal-400 focus:outline-none focus:ring-2">
                    {isLoading ? "Loading ..." : "Update"}
                </button>
            </form>
            <div className="text-red-700 flex justify-between items-center">
                <span
                    className="cursor-pointer hover:opacity-85"
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </span>
                <span
                    className="cursor-pointer hover:opacity-85"
                    onClick={handleSignOut}
                >
                    Sign Out
                </span>
            </div>
            <p className="text-red-600 text-[12px] md:text-[14px] font-serif">
                {isError && "something wrong !!"}
            </p>
            <p className="text-green-600 text-[12px] md:text-[14px] font-serif">
                {isUpdated && "Updated successfully"}
            </p>
        </div>
    );
};

export default Profile;
