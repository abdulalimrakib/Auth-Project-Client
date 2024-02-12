import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion"
import { fadeIn } from "../variants";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";




const Navbar = () => {
    const [isMenuCliked, setIsMenuCliked] = useState(false)
    const { userData } = useSelector(state => state.user)

    return (
        <div className="bg-[#E3E8F1]">
            <div className="flex justify-between items-center container mx-auto">
                <div>
                    <a className="text-[15px] md:text-[30px] font-bold" href="/">Auth</a>
                </div>
                <ul className="hidden md:flex gap-8">
                    <li><Link to="/" className="font-medium" href="">Home</Link></li>
                    <li><Link to="/about" className="font-medium" href="">About</Link></li>
                    {
                        userData ? (
                            <Link to="/profile"><img src={userData?.data?.userData?.image || userData?.data?.image} className="w-7 h-7 rounded-full object-cover" alt="" /></Link>
                        ) : (
                            <li><Link to="/login" className="font-medium" href="">Login</Link></li>
                        )
                    }
                </ul>

                <div className="md:hidden">
                    <div className="flex items-center gap-5">
                        {
                            isMenuCliked ? (<MdClose onClick={() => setIsMenuCliked(false)} />) : (<FiMenu onClick={() => setIsMenuCliked(true)} />)
                        }
                    </div>
                </div>
            </div>
            <div className={`container ${isMenuCliked ? "block" : "hidden"}`}>
                <ul>
                    <motion.li variants={fadeIn('down', 0.03)} initial="hidden" animate={isMenuCliked ? "show" : "hidden"}><Link to="/" className="font-medium" href="" onClick={() => isMenuCliked(false)}>Home</Link></motion.li>
                    <motion.li variants={fadeIn('down', 0.06)} initial="hidden" animate={isMenuCliked ? "show" : "hidden"}><Link to="/about" className="font-medium" href="" onClick={() => isMenuCliked(false)}>About</Link></motion.li>
                    {
                        userData ? (
                            <motion.li variants={fadeIn('down', 0.09)} initial="hidden" animate={isMenuCliked ? "show" : "hidden"}>
                                <Link to="/profile" className="font-medium" onClick={() => isMenuCliked(false)}>Profile</Link>
                            </motion.li>
                        ) : (
                            <motion.li variants={fadeIn('down', 0.09)} initial="hidden" animate={isMenuCliked ? "show" : "hidden"}><Link to="/login" className="font-medium" href="" onClick={() => isMenuCliked(false)}>Login</Link></motion.li>
                        )
                    }
                    {/* <motion.li variants={fadeIn('down', 0.09)} initial="hidden" animate={isMenuCliked ? "show" : "hidden"}><Link to="/login" className="font-medium" href="">Login</Link></motion.li> */}
                </ul>
            </div>
        </div>
    )
}

export default Navbar