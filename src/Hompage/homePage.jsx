import React, { useEffect, useRef, useState } from "react";
import { Input, Nav } from "reactstrap";
import "./homePage.css";
import NavBar from "../Layout/Navbar/navBar";
import newLogo from "../Images/redesignLogo2.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer/footer";
import { useForm } from "react-hook-form";
import image1 from "../Images/support-vec.png"
import "../../src/index.css"
import { vitelWirelessSageMetrics } from "../Utilities/axios";
const HomePage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(false);
    const [rememberMe, setRememberMe] = useState("");

     const userRememberData = JSON.parse(localStorage.getItem("rememberData" || "{}"));
  
    console.log("check check....", rememberMe)

    useEffect(() => {
    if(userRememberData){
        setRememberMe(true);
    }else{
        setRememberMe(false);
        localStorage.removeItem("rememberData");
    }
    }
    ,[])
        
   
    const handleLoginPartner = async (data) => {
        setLoading(true);
       if(rememberMe === true){
        localStorage.setItem("rememberData",JSON.stringify(data));
        } else {
        localStorage.removeItem("rememberData");
        }

        const payload = {
            username: data?.username || userRememberData?.username,
            password: data?.password || userRememberData?.password,
        };

      try {
            const res = await vitelWirelessSageMetrics.post(
                "/registrations/partnerSignIn",
                payload
            );

            console.log("res", res);

            if (res.data.success === true) {
                localStorage.setItem("SageData",JSON.stringify(res.data?.userDetails));
               
                navigate("/dashboard");
            } else {
                setError(true);
                setErrorMessage(res.data.message || "Login failed");
            }
        } catch (err) {
            console.log("err", err);
            setError(true);
            setErrorMessage("Unexpected error occurred, please try again later");
            setShowForm(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="mainContainer">
                <div className="wrapper main-kin p-3 p-md-4 p-lg-5">
                    <div className="logiform-container py-4">
                        <div className="flex-container d-flex flex-wrap  bg-light p-0">
                            <div className="column d-block p-3 p-md-4 p-lg-5 p getstarted-col">
                                <div className="d-flex gap-4 content p-3 px-md-4 py-md-5 px-lg-5 child-w-100 flex-wrap position-relative h-100 align-items-center">
                                    <div className="back-arrow position-relative">
                                        <img src={newLogo} style={{ width: "80px" }} />
                                    </div>
                                    <div className="text-content position-relative">
                                        <span className="text-secondary2">Hi Welcome!</span>
                                        <h2 className="text-white">
                                            SageMetrcis - Tech Support System.
                                        </h2>
                                        <p className="text-secondary2 mt-4">
                                            Log in with your Vitel Wireless iPartner account to access
                                            your dashboard and tools.
                                        </p>
                                    </div>
                                    <div className="content-icon position-relative">
                                        <img
                                            // src="https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_1280.png"
                                            src={image1}
                                            alt=""
                                            className="w-100"
                                        />
                                    </div>
                                </div>
                                 </div>
                                   <div className="column d-block inpulControl p-3 d-flex   h-100">
                                     <div className="content-form ">
                                    <div className="form-wrapper py-4">
                                        <h2 className="mb-4">Login</h2>
                                        <form action="" onSubmit={handleSubmit((data, event) => {
                                            handleLoginPartner(data);
                                        })}>
                                            <div className="form-input con-input-div mb-3 p-0">
                                                <label

                                                    className="text-secondary label-margin"
                                                >
                                                    Email Address
                                                </label>
                                                <div className="input-relative position-relative mt-1 mt-lg-2">
                                                    <input
                                                        type="text"
                                                        className="default-input  py-1 ps-3 py-lg-2 input-required"
                                                        name="yourEmail"
                                                        id="yourEmail"
                                                        defaultValue={userRememberData?.username || ""}

                                                        {...register('username', {
                                                            required: 'Email address is required',
                                                            validate: (value) => value.includes('@' && '.') || "Email must contain '@' and '.",
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                                message: "Invalid email address",
                                                            },
                                                        })}
                                                    />
                                                    <span className="cum-error" style={{ color: "red" }}>{errors.username?.message}</span>

                                                    <div className="nameinput-icon-feedback icon-feedback">
                                                        <i className="fa-solid fa-circle-exclamation text-danger icon"></i>
                                                        <i className="fa-solid fa-circle-check text-success icon"></i>
                                                    </div>
                                                </div>
                                                <small className="email-error-feedback error-feedback text-danger text-small"></small>
                                            </div>
                                            <div className="form-input con-input-div mb-3 p-0">
                                                <label

                                                    className="text-secondary label-margin"
                                                >
                                                    Password
                                                </label>
                                                <div className="input-relative position-relative mt-1 mt-lg-2">
                                                    <input
                                                        type="password"
                                                        className="default-input  py-1 ps-3 py-lg-2 input-required"
                                                        name="password"
                                                        id="yourPassword"
                                                        defaultValue={userRememberData?.password || ""}
                                                        autoComplete="on"
                                                        {...register('password', {
                                                            required: 'Password is required',
                                                            maxLength: {},
                                                        })}
                                                    />
                                                    <span className="cum-error" style={{ color: "red" }}>{errors.password?.message}</span>

                                                    <div className="nameinput-icon-feedback icon-feedback">
                                                        <i className="fa-solid fa-circle-exclamation text-danger icon"></i>
                                                        <i className="fa-solid fa-circle-check text-success icon"></i>
                                                    </div>
                                                    <div id="showPassword" className="show-password">
                                                        <i className="fa-solid fa-eye icon"></i>
                                                        <i className="fa-solid fa-eye-slash icon"></i>
                                                    </div>
                                                </div>
                                                <small>
                                                    <a
                                                        // href="javascript:void(0)"
                                                        className="show-password"
                                                    ></a>
                                                </small>
                                                <small className="pw-error-feedback error-feedback text-danger text-small"></small>
                                            </div>
                                            <div className="form-check mb-3 p-0 label-margin" >
                                                <input
                                                    type="checkbox"
                                                    name="rememberme"
                                                    style={{ cursor:"pointer"} }
                                                    id="rememberMe"
                                                    checked={rememberMe}
                                                    onChange={(e) => setRememberMe(e.target.checked)} // ✅ true if checked, false if not
                                                />
                                                <label htmlFor="rememberMe">Remember me</label>
                                            </div>
                                            {error && !loading &&
                                                <div className="error">{errorMessage}</div>
                                            }


                                            { }
                                            <div className="form-submit">
                                                {
                                                    loading ? <button
                                                        disabled
                                                        id="btnCreateAccount"
                                                        className="btn  w-100  py-lg-2 mt-1 mt-lg-2 "
                                                    >
                                                        <span className="loader"></span>
                                                        {/* Login */}
                                                    </button> : <button
                                                        disabled={loading}

                                                        id="btnCreateAccount"
                                                        type="submit"
                                                        className="btn  w-100  py-lg-2 mt-1 mt-lg-2 "
                                                    >
                                                        Login
                                                    </button>
                                                }


                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default HomePage;
