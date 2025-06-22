import type { ReactElement } from "react"

interface ButtonProps{
    variant:"primary"|"secoundary",
    text:string ,
    startIcon?:ReactElement,
    onClick?:()=>void,
    fullWidth?:boolean,
    loading?:boolean
}

const VariantStyles={
    "primary":"bg-purple-600 text-white",
    "secoundary":"bg-purple-200 text-purple-600",
};

const DefaultStyles="px-4 py-2 rounded-md font-light flex justify-center items-center"
export const Button=({variant,text,startIcon,onClick,fullWidth,loading}:ButtonProps)=>{

  return <button onClick={onClick} className={`${VariantStyles[variant]} ${DefaultStyles}`+`${fullWidth ? " w-full flex  justify-center items-center":""}`+`${loading?"opacity-45" :""}`}
  disabled={loading}>
   
    <div className="pr-2"> {startIcon}</div>
       
        {text}
    
    </button>
}