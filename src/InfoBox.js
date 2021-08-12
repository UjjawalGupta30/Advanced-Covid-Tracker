import React from 'react'
import { Card , CardContent ,Typography } from "@material-ui/core";


function InfoBox({title,cases,total,test}) {
    return (
        <Card className="infoBox">
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


            {/* vaccinated */}
            <Typography className="infoBox_test">
                {test} 
            </Typography>




          </CardContent>
        </Card>
            
        
    )
}

export default InfoBox
