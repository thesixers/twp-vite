import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [message, setMessage] = useState("Otp has been sent to Your email")
  const [showMessage, setShowMessage] = useState(false)

  const handleSendOtp = async () => {
    if (!email) return setEmailError("*email field is required");
    console.log(email);
    try {
        // let res = await axios.post("http://localhost:3001/twp/auth/sendotp", {email: email.trim()})
        let res = await axios.post("https://twp2.onrender.com/twp/auth/sendotp", {email: email.trim()})
        let { E, M} = res.data
        if(E) setEmailError(E);
        if(M) {
            setMessage(M)
            hideMessage()
            setIsOtpSent(true);
        };
    } catch (error) {
        console.log(error);
        setEmailError(error.message)
    }
  };

  const handleConfirmOtp = async () => {
    if (!otp) return setOtpError("*otp is field is empty");
    console.log(otp);
    let data = {email: email.trim(), otp: otp.trim()}
    try {
        // let res = await axios.post("http://localhost:3001/twp/auth/otp", data)
        let res = await axios.post("https://twp2.onrender.com/twp/auth/otp", data)
        let { E, M } = res.data;
        if(E) return setOtpError(E);
        if(M) {
            setIsOtpConfirmed(true)
            setMessage(M)
            hideMessage()
        };
    } catch (error) {
        console.log(error);
        setOtpError(error.message)
    }
  };

  const handleResetPassword = async () =>{
    if(!password) return setPassError("*password field is empty")
    if(!confirmPass) return setPassError("*confirm password field is empty")
    if(password !== confirmPass) return setPassError("*both passwords dont match")
    console.log(password, confirmPass);

    let data = {password, email}
    console.log(data);
    try {
        // let res = await axios.put("http://localhost:3001/twp/auth/resetpassword", data)
        let res = await axios.put("https://twp2.onrender.com/twp/auth/resetpassword", data)
        if(res.data.E){
            setPassError(res.data.E)
        }else if(res.data.M){
            setMessage(res.data.M)
            hideMessage()
        }
    } catch (error) {
        console.log(error);
        setPassError(error.message)
    }
  }

  const hideMessage = ()=> {
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 9000);
  }

  return (
    <div className="flex justify-center relative">
      <div className="flex flex-col gap-[15px] h-[100vh]  shadow rounded-[8px] px-[25px] py-[30px] max-w-[500px]">
        <div className="text-[12px] text-red-600">{emailError}</div>
        <h1 className="text-[25px] font-bold text-gray-600">
          Forgot your password
        </h1>
        <div className="text-[13px] font-light text-gray-500 max-w-[400px]">
          Please enter the email address linked to your TWP account so you will
          receive ur otp
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-500"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 border-gray-400 outline-none py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col pt-[10px] gap-[10px] justify-center items-center">
          <button
            className="mt-1 w-full px-3 border-none 
          cursor-pointer text-white outline-none 
          py-2 border rounded-md shadow-sm bg-[#e44616]"
            onClick={handleSendOtp}
          >
            Request OTP
          </button>
          <Link to="/login" className="text-[12px] text-gray-500 underline">
            back to login
          </Link>
        </div>
      </div>

      {isOtpSent && (
        <div className="absolute flex justify-center bg-white w-full h-full">
          {
            !isOtpConfirmed ? 
            <div className="flex flex-col gap-[15px] max-h-[350px] shadow rounded-[8px] px-[25px] py-[30px] max-w-[400px]">
            <div className="text-[10px] text-red-600 ">{otpError}</div>
            <div>
              <h1 className="text-[25px] font-bold text-gray-600">
                OTP Verification
              </h1>
              <div className="text-[13px] font-light text-gray-500 max-w-[400px]">
                Enter OTP code sent to Your Email
              </div>
            </div>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-500"
              >
                otp
              </label>
              <input
                id="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full px-3 border-gray-400 outline-none py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
                placeholder="Enter your otp"
              />
            </div>
            <div className="flex flex-col gap-[10px] justify-center items-center">
              <button
                className="mt-1 w-full px-3 border-none 
              cursor-pointer text-white outline-none 
              py-2 border rounded-md shadow-sm bg-[#e44616]"
                onClick={handleConfirmOtp}
              >
                Verify & Proceed
              </button>
              <div className="flex justify-center gap-[10px] px-[10px]">
                <span className="text-gray-500 text-[13px]">
                  Didn't receive otp code ?
                </span>
                <span className="text-[#e44616] text-center h-[40px] text-[13px] cursor-pointer">
                  Resend Code
                </span>
              </div>
            </div>
          </div>
          : 
          <div className="flex flex-col gap-[15px] max-h-[350px] shadow rounded-[8px] px-[25px] py-[30px] max-w-[400px]">
            <div className="text-[10px] text-red-600 ">{passError}</div>
            <div>
              <h1 className="text-[25px] font-bold text-gray-600">
              Reset your password
              </h1>
            </div>
            <div>
              <label
                htmlFor="otp"
                className="block text-[12px] font-light text-gray-500"
              >
                Enter password
              </label>
              <input
                id="otp"
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 border-gray-400 outline-none py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label
                htmlFor="otp"
                className="block text-[12px] font-light text-gray-500"
              >
                Confirm password
              </label>
              <input
                id="otp"
                type="text"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="mt-1 w-full px-3 border-gray-400 outline-none py-2 border rounded-md shadow-sm focus:ring-red-500 focus:border-gray-700"
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex flex-col gap-[10px] justify-center items-center">
              <button
                className="mt-1 w-full px-3 border-none 
              cursor-pointer text-white outline-none 
              py-2 border rounded-md shadow-sm bg-[#e44616]"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </div>
          }
        </div>
      )}

      {/* message box */}
      {
        showMessage && (
          <div className="bg-white absolute top-[-40px] w-[100%] right-[0px] max-w-[350px] px-1.5">
       <div className="bg-gray-50 p-[5px] border border-[#8ffc8f79] w-full h-full  text-[14px] text-[green] fmessage-box relative">
        {message}
        </div>
      </div>
        )
      }
    </div>
  );
}
