import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import pic from "../../assets/badges/game-on.svg";
import learning1 from "../../assets/svgs/education-learning.svg"
import learning2 from "../../assets/svgs/learning.svg"
import logo from "../../assets/svgs/idea.svg"
const Login_SignUp = () => {
  const [isRegestring, setIsRegestring] = useState<boolean>(true);
  return (
    <div className="flex flex-col gap-5 login-signup min-h-screen justify-center items-center">

      <div className="w-[98%] overflow-hidden relative max-w-[950px] rounded-xl bg-white grid grid-cols-2 gap-2"> 
        <div className="w-full flex items-center test justify-center">
          <img src={learning2} alt="picture" className="size-48" />
        </div>
        {isRegestring ? (
          <Signup setIsRegestring={setIsRegestring} />
        ) : (
          <Login setIsRegestring={setIsRegestring} />
        )}
      
      </div>

    </div>
  );
};

export default Login_SignUp;
