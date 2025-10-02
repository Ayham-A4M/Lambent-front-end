import { useState } from "react"
import Login from "./login"
import Signup from "./signup"

const Login_SignUp = () => {
    const [isRegestring, setIsRegestring] = useState<boolean>(true);
    return (
        <div className='flex min-h-screen justify-center items-center'>



            {
                isRegestring ?
                    <Signup setIsRegestring={setIsRegestring} />
                    :
                    <Login />
            }



        </div>

    )
}

export default Login_SignUp