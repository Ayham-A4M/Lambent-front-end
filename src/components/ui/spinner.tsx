// import { CgSpinnerTwo } from "react-icons/cg";
// import { CgSpinnerTwoAlt } from "react-icons/cg";
import { PiSpinnerBold } from "react-icons/pi";
const Spinner = ({talwindSize}:{talwindSize?:string}) => {
  return (
    <PiSpinnerBold className={`${talwindSize?talwindSize:"size-10"} animate-spin `}/>
  )
}

export default Spinner