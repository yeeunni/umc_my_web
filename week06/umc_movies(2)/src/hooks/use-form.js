import { useEffect, useState } from "react"
import { validateLogin } from "../utils/validate"

function useForm(initialValue,validate) {
    const [values,setValues] = useState(initialValue)
    
     const [touched,setTouched]=useState({ })
    
     const [errors,setErrors]=useState({})

     
//value: 값들, input change 값 e.target.value
//name: field값 예를 들어, email 및 password
 const handleChangeInput = (name,value) => {
    setValues({
        ...values,
        [name]:value
    })
 }

 const handleBlur =(name)=>{
    setTouched({
        ...touched,
        [name]:true
    })
 }
 const getTextInputProps = (name)=>{
    const value = values[name];
    const onChange=(e)=>handleChangeInput(name,e.target.value);
    const onBlur=()=>handleBlur(name);

    return {value,onChange,onBlur}
 }
 useEffect(()=>{
    const newErrors = validate(values);
    setErrors(newErrors);

 },[validate,values]);

 return {values,errors,touched,getTextInputProps}

}
export default useForm;