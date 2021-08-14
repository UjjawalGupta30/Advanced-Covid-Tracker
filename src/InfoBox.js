import React from 'react'
import { Card , CardContent ,Typography } from "@material-ui/core";
import "./Infobox.css"


function InfoBox({title,cases,active,isRed,total,...props}) {
    return (
        <Card  onClick={props.onClick} 
        className={`infoBox ${active && "infoBox-selected"} ${
          isRed && "infoBox--red"
        }`}>
          <CardContent>
            {/* title coronavirus cases*/}
            <Typography className="infoBox_title" color ="textSecondary">
                {title}
            </Typography>


            {/* Number of cases */}
            <h2 className="infoBox_cases">{cases}</h2>


            {/* 1.2 m total */}
            <Typography className="infoBox_total">
                {total} Total
            </Typography>


          



          </CardContent>
        </Card>
            
        
    )
}

export default InfoBox
