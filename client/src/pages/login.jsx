import React, { useContext } from "react";
import OtpInput from "react-otp-input";
import { apiConnector } from "../service/api-connector";
import { AppContext } from "../context/common-store";
import { auth } from "../service/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ closeModal }) => {
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const navigate = useNavigate();
  const { loginResponseData, user, storeTokenInLS } = useContext(AppContext);

  // handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Sending otp...", {
      className: "custom-toast",
    });

    try {
      const response = await apiConnector("POST", auth.SEND_OTP_API, {
        email: email,
      });

      if (!response.data.success) {
        alert(response.data.message);
      } else {
        setEmail("");
        loginResponseData({
          email: response.data.response.email,
          status: response.data.success,
        });

        toast.update(loadingToastId, {
          render: "OTP sent successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
          position: "top-center",
          className: "custom-toast",
        });

        // console.log("otp response : ", response);
      }
    } catch (error) {
      // console.log("Error occur while sending otp to user : ", error);
      toast.update(loadingToastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        className: "custom-toast",
      });
    }
  };

  // handle otp and verify submit
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Verifying otp...");

    try {
      const response = await apiConnector("POST", auth.LOGIN_API, {
        email: user.email,
        otp: otp,
      });

      if (!response.data.success) {
        alert(response.data.message);
      } else {
        storeTokenInLS(response.data.token);
        navigate("/dashboard");
        loginResponseData({
          email: "",
          status: false,
        });
        toast.update(loadingToastId, {
          render: "Verified successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
          position: "top-center",
          className: "custom-toast",
        });
        // console.log("verify otp response : ", response);
      }
    } catch (error) {
      // console.log("Error occur while sending verify otp : ", error);
      toast.update(loadingToastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        className: "custom-toast",
      });
    }
  };

  return (
    <>
      <div className="modalWrapper"></div>
      <div className="modalBox">
        {!user?.status ? (
          <>
            <div>
              <h3>Login</h3>
              <h3 onClick={() => closeModal(false)}>X</h3>
            </div>
            <form onSubmit={(e) => handleLoginSubmit(e)}>
              <input
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter email address"
              />
              <input type="submit" value="Login" />
            </form>
          </>
        ) : (
          <>
            <div>
              <h3>Verify OTP</h3>
              <h3 onClick={() => closeModal(false)}>X</h3>
            </div>
            <form onSubmit={(e) => handleVerifyOtp(e)}>
              <OtpInput
                required
                numInputs={6}
                name={otp}
                value={otp}
                onChange={setOtp}
                renderInput={(props) => (
                  <input {...props} placeholder="-" className="otp-boxes" />
                )}
              />
              <input type="submit" value="Verify" />
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
