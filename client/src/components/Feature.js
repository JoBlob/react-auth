import React, {Component} from "react"
import requireAuth from "./requireAuth";

class Feature extends Component{
    render(){
        return(
            <div>
                you are now logged in with a persisting state ! don't believe me ? press F5
            </div>
        )
    }
}

export default requireAuth(Feature);