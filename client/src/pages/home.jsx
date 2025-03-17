import React, { useState } from "react";
import Login from "./login";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="homePage">
      <DotLottieReact
        src="https://lottie.host/0c9ca60c-bf5a-4d79-ac12-87243420589c/nMnPVExXcm.lottie"
        loop
        autoplay
        style={{ width: "300px", height: "300px" }}
      />
      <h1>Welcome To Our ChatBot App</h1>
      <button onClick={() => setShowModal(true)}>Get Started</button>

      {showModal && <Login closeModal={setShowModal} modalValue={showModal} />}
    </div>
  );
};

export default Home;
