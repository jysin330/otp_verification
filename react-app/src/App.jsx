// import React, { useState, useRef, useEffect } from "react";
// import "./App.css";

// const App = () => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputRef = useRef([]);
//   useEffect(() => {
//     inputRef.current[0].focus();
//   }, []);

//   const handleChange = (e, index) => {
//     if (isNaN(e.target.value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value;
//     setOtp(newOtp);

//     if (e.target.value !== "") {
//       if (index === 5) {
//         inputRef.current[index].blur();
//       } else {
//         inputRef.current[index + 1].focus();
//       }
//     } else {
//       inputRef.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData
//       .getData("text/plain")
//       .slice(0, 6)
//       .split("");
//     const newOtp = [...otp];
//     pastedData.forEach((data, index) => {
//       if (isNaN(data)) return;
//       newOtp[index] = data;
//     });
//     setOtp(newOtp);
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "") {
//       inputRef.current[index - 1].focus();
//     } else if (e.key === "ArrowLeft" && index !== 0) {
//       inputRef.current[index - 1].focus();
//     } else if (e.key === "ArrowRight" && index !== 5) {
//       inputRef.current[index + 1].focus();
//     }
//   };

//   return (
//     <div className="container">
//       <button className="button">Verify Phone Number</button>
//       <div className="popup">
//         <h2>Phone Verification</h2>
//         <p>Enter the 6-digit code we sent to your phone number</p>
//         <div className="input-container">
//           {otp.map((data, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={data}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               onPaste={handlePaste}
//               ref={(ref) => (inputRef.current[index] = ref)}
//             />
//           ))}
//         </div>
//         <button className="verify-button">Verify</button>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Function to handle the button click
  const handleButtonClick = () => {
    setShowPopup(true);
  };

  // Function to handle the input change
  const handleInputChange = (index, e) => {
    const newOtp = [...otp];
    if (e.target.value.match(/^[0-9]+$/)) {
      newOtp[index] = e.target.value;
      setOtp(newOtp);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Function to handle the input keydown event
  const handleInputKeyDown = (index, e) => {
    const newOtp = [...otp];
    if (e.key === "Backspace" && index > 0) {
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Function to handle the paste event
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text/plain");
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length && i < inputRefs.current.length; i++) {
      if (pasteData[i].match(/^[0-9]+$/)) {
        newOtp[i] = pasteData[i];
      }
    }
    setOtp(newOtp);
  };

  // Function to handle the verification
  const handleVerification = () => {
    const enteredOtp = otp.join("");
    // Perform phone verification with the entered OTP
    // If the verification succeeds, redirect the user to the next page
  };

  // UseEffect hook to set the focus on the first input field when the popup is shown
  useEffect(() => {
    if (showPopup) {
      inputRefs.current[0].focus();
    }
  }, [showPopup]);

  return (
    <div className="container">
      <button className="button" onClick={handleButtonClick}>
        Verify Phone
      </button>
      {showPopup && (
        <div className="popup">
          <h2>Phone Verification</h2>
          <p>Enter the 6-digit verification code sent to your phone</p>
          <div className="input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleInputKeyDown(index, e)}
                onPaste={(e) => handlePaste(e)}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </div>
          <button className="verify-button" onClick={handleVerification}>
        Verify
      </button>
    </div>
  )}
</div>
  )}

  export default App;
