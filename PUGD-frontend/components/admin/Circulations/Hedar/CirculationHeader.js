import React from 'react'
import Card from 'components/ui/card/card'


const CirculationHeader = ({Title, children}) => {

    return <React.Fragment>
        <Card>
            <div className="header-container card-header mb-2">
                <i className="material-icons pink-text-blue" style={{margin: "auto"}}>
                    fiber_manual_record
                </i>
                {/*todo fix it*/}
                <h5 className=" uk-icon">
                    {Title}</h5>
                <br/>
            </div>
            {children}
        </Card>
        <style jsx>
            {`
                    
                    .uk-icon { 
                        margin-left:5px;
                        display:inline-block;
                    } 
                    .header-container{
                        display: flex;
                        width: fit-content;
                    }
                `}
        </style>

    </React.Fragment>
}
export default CirculationHeader
