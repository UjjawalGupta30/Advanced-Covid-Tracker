import React, { useState, useEffect } from "react";
import { Line} from "react-chartjs-2";
import numeral from "numeral";



// const options = {
//   legend: {
//     display: false,
//   },
//   elements: {
//     point: {
//       radius: 0,
//     },
//   },
//   maintainAspectRatio: false,
//   tooltips: {
//     mode: "index",
//     intersect: false,
//     callbacks: {
//       label: function (tooltipItem, data) {
//         return numeral(tooltipItem.value).format("+0,0");
//       },
//     },
//   },
//   scales: {
//     xAxes: [
//       {
//         type: "time",
//         time: {
//           format: "MM/DD/YY",
//           tooltipFormat: "ll",
//         },
//       },
//     ],
//     yAxes: [
//       {
//         gridLines: {
//           display: false,
//         },
//         ticks: {
//           // Include a dollar sign in the ticks
//           callback: function (value, index, values) {
//             return numeral(value).format("0a");
//           },
//         },
//       },
//     ],
//   },
// };

// const buildChartData = (data, casesType) => {
//   let chartData = [0];

//   let lastDataPoint;


//   let tempLables = [0];
//   let tempData2 = [0];


//   for (let date in data.cases) {
//     if (lastDataPoint) {

//       tempLables.push(date);
//       tempData2.push(data.cases[date] - lastDataPoint);

//       let newDataPoint = {
//         x: date,
//         y: data.cases[date] - lastDataPoint,
//       };
//       chartData.push(newDataPoint);
//     }
//     lastDataPoint = data.cases[date][casesType];
//     // console.log(lastDataPoint, date);
//   }


//   console.log(tempLables)
//   // setLables(tempLables);
//   // setData2(tempData2);

//   return [chartData, tempLables, tempData2];
// };


// function LineGraph({ casesType }) {
//   // const [data, setData] = useState({});
//   const [labelsData, setLables] = useState([]);
//   const [secondData, setData2] = useState([]);

//   useEffect(() => {

//     const fetchData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           let [chartData, tempLables, tempData2] = buildChartData(data, casesType);
//           setLables(tempLables);
//           setData2(tempData2);
//           // setData(chartData);
//           console.log(labelsData)
//           console.log(secondData)
//           // console.log(chartData);
//           // buildChart(chartData);
//         });
//     };

//     fetchData();
//   }, [casesType]);


//   return (
//     <div>
//       {
//         <Line
//           data={{
//             labels: labelsData,
//             datasets: [
//               {
                
//                 label: " Worldwide Covid Cases",
//                 data: secondData,
//                 fill: true,
//                 backgroundColor: "#FF4D4D",
//                 borderColor: "#F70000	",
                

//               },
//             ]
//           }
//           }
//         />
//       }
//     </div>
//   );
// }

// export default LineGraph;
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  try{
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
    console.log(data);
  }
}catch(error){
  return;
}
  return chartData;

};

function LineGraph({ casesType = "cases", ...props }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          // console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;