import { useState } from "react";
//https://www.youtube.com/watch?v=6am-yn3ZLEw&list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A&index=33
function useInput(initialValue){
    const [value, setValue] = useState(initialValue);

    const reset = () =>{
        setValue(initialValue);
    }
    const bind = {
        value,
        onChange: e => {
            setValue(e.target.value);
        }
    }
    return [value, bind, reset]
}
export default useInput;