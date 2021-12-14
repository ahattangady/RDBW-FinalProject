//initialize response to 0
let response = 0;

// make map for supersector names and codes:
const supersector = {
  '00': 'Total nonfarm',
  '05': 'Total private',
  '06': 'Goods-producing',
  '07': 'Service-providing',
  '08': 'Private service-producing',
  '10': 'Mining and logging',
  '20': 'Construction',
  '30': 'Manufacturing',
  '31': 'Durable Goods',
  '32': 'Nondurable Goods',
  '40': 'Trade, transportation, and utilities',
  '41': 'Wholesale trade',
  '42': 'Retail trade',
  '43': 'Transportation and warehousing',
  '44': 'Utilities',
  '50': 'Information',
  '55': 'Financial activities',
  '60': 'Professional and business services',
  '65': 'Education and business services',
  '70': 'Leisure and hospitality',
  '80': 'Other services',
  '90': 'Government'
};

//extract individual supersector codes from 'supersector' map
let supersector_codes = Object.keys(supersector)
//let ID_prefix = "CE";
//let ID_adjustment = "U";
//let ID_supersector = "00";
//let ID_industry = "000000";
//let ID_Data_Type = "01";
//let seriesID = ID_prefix + ID_adjustment + ID_supersector + ID_industry + ID_Data_Type;

// These are colors from chart.js utils
const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  darkred: 'rgb(152, 18, 18)',
  pink:'rgb(255, 24, 208)',
  mauve:'rgb(204, 153, 153)',
  lightblue: 'rgb(172,222,247)',
  lightyellow: 'rgb(255, 255, 153)',
  mintgreen: 'rgb(153,255,204)',
  lavender: 'rgb(204,204,255)',
  darkgreen: 'rgb(0,51,0)',
  darkgrey: 'rgb(0,0,0)',
  darkblue: 'rgb(0,0,102)',
  darkpurple: 'rgb(51,0,51)',
  coral: 'rgb(255,102,102)',
  violet: 'rgb(66,1,157)',
  brightgreen: 'rgb(102, 255, 102)',
  teal: 'rgb(0, 153, 153)'
};
//console.dir(CHART_COLORS);
let color_border = Object.keys(CHART_COLORS)

const CHART_COLORS_50_Percent = {
  red: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgba(255, 159, 64, 0.5)',
  yellow: 'rgba(255, 205, 86, 0.5)',
  green: 'rgba(75, 192, 192, 0.5)',
  blue: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgba(153, 102, 255, 0.5)',
  grey: 'rgba(201, 203, 207, 0.5)',
  darkred: 'rgba(152, 18, 18, 0,5)',
  pink:'rgba(255, 24, 208, 0.5)',
  mauve:'rgba(204, 153, 153, 0.5)',
  lightblue: 'rgba(172,222,247, 0.5)',
  lightyellow: 'rgba(255, 255, 153, 0.5)',
  mintgreen: 'rgba(153, 255, 204, 0.5)',
  lavender: 'rgba(204, 204, 255, 0.5)',
  darkgreen: 'rgba(0, 51, 0, 0.5)',
  darkgrey: 'rgba(0, 0, 0, 0.73)',
  darkblue: 'rgba(0, 0, 102, 0.5)',
  darkpurple: 'rgba(51, 0, 51, 0.5)',
  coral: 'rgba(255, 102, 102, 0.5)',
  violet: 'rgba(66,1,157,0.5)',
  brightgreen: 'rgba(102, 255, 102, 0.5)',
  teal: 'rgba(0, 153, 153, 0.5)'
};
//console.log(CHART_COLORS_50_Percent);
//    end utils
let color_background = Object.keys(CHART_COLORS_50_Percent)

//function to accept response from responseReceivedHandler
function responseReceivedHandler() {
  if (this.status == 200) {
    console.log(this.response);
    let dataArray = this.response.Results.series[0].data;
    let seriesID = this.response.Results.series[0].seriesID;
    let supersectorID = seriesID.substring(3,5);
    //let response = 0;
    let dataset = {
      label: [],
      data: [],
      borderColor: CHART_COLORS.red,
      backgroundColor: CHART_COLORS_50_Percent.red,
      hidden: true
    };

    //for loop to push data labels (dates)
    for (let i = dataArray.length - 1; i >= 0; i--){
      dataset.data.push(dataArray[i].value);
      if(response == 0){
        data.labels.push(dataArray[i].periodName + " " + dataArray[i].year);
      }
    }

    dataset.label = supersector[supersectorID]
    dataset.borderColor = CHART_COLORS[color_border[response]]
    dataset.backgroundColor = CHART_COLORS_50_Percent[color_background[response]]

  //data.labels.push(this.response);
  //console.log(this.response);
  data.datasets.push(dataset)
  response++
  }
  else {
    console.log ("error");
  }
};

const data = {
  labels: [],
  datasets: []
};
//console.dir(data);

//const labels = [];
//console.log("labels");
//console.log(labels);

//constant to create line graph & make it responsive
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Employees in Thousands'
      }
    }
  }
};
console.log(config);

/*function registration (){
  let registrationkey = "";
  if(registrationkey == ""){
    alert("Please enter registration key. You can obtain an API key here: https://www.bls.gov/developers/");
  }
};*/

//constant to create chart
const myChart = new Chart(
  document.getElementById('myChart'),
  config);
console.dir(myChart);
console.log("Ending");

//split query and concatenate so the supersector code can go through the loop to graph each sector
for (let i = 0; i < supersector_codes.length; i++){
  let query_link1 = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"
  let query_link2= "00000001?registrationkey="
  let userAPIkey = "" //user can input their own API key here

  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType = "json";
  xhr.open("GET", query_link1 + supersector_codes[i] + query_link2 + userAPIkey);
  xhr.send();
};
