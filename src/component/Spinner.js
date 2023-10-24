import React from "react";
import {Spin } from 'antd';

function Spinner(){
    return(

        <div className="spinner-parent">
            {/* <i class="ri-loader-2-line"></i> */}
            <Spin  size="large"/>
        </div>
    )
}


export default Spinner;