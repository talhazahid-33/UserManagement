import axios from "axios";
import React, { useState } from "react";
import AddressTable from "./AddressTable";


const UserData = ()=>{
    const [data, setData] = useState(null);
    function showData(data){


    }

    const getData = async()=>{
        const result = await axios.get("http://localhost:8000/getdata",

        );
        if(result.data.status==="ok"){
            console.log(result.data.data[0].contacts);
            setData(result.data.data[0].contacts)
        }

    }




    return(
        <div>
            <button onClick={getData}>
                Fetch Data
            </button>
            <AddressTable
            data= {data}
            
            ></AddressTable>

        </div>
    )
}

export default UserData;