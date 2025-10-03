import { useState } from "react"
import Login from "./login"
import Signup from "./signup"
const Login_SignUp = () => {
    const [isRegestring, setIsRegestring] = useState<boolean>(true);
    return (
        <div className=' flex flex-col gap-5 login-signup min-h-screen justify-center items-center' >
            {
                isRegestring ?
                    <Signup setIsRegestring={setIsRegestring} />
                    :
                    <Login setIsRegestring={setIsRegestring} />
            }



        </div>

    )
}

export default Login_SignUp