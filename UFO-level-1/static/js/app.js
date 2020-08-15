// Get data from data.js and save in JavaScript array
var tableData = data;
// Display the number of items in the array
var tableDataLength = tableData.length;
console.log("Length of the dataset: " + tableData.length);
// Display the first datetime
console.log("The first datetime: " + tableData[0].datetime);
// Display the last datetime
console.log("The last datetime: " + tableData[tableDataLength-1].datetime);
// Get a reference to the table body
var tbody = d3.select("tbody");
// Using arrowfunction to populate the table
tableData.forEach((data) => {
    var row = tbody.append("tr");
    Object.entries(data).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
// Select the filter button based on its id value
var FilterButton = d3.select("#filter-btn");
// Select the reset button based on its id value
var ResetButton = d3.select("#reset-btn");

// Create a event handler 
ResetButton.on("click", ResetForm);
// Complete the event handler function for ResetForm
function ResetForm() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Get a reference to the table body
  var tbody = d3.select("tbody");
  // Clear existing data
  tbody.html("");
  // Using arrowfunction to populate the table
  tableData.forEach((data) => {
    var row = tbody.append("tr");
    Object.entries(data).forEach(([key, value]) => 
    {
        var cell = row.append("td");
        cell.text(value);
    });
  });
  console.log("Form resetted !!");
  // Let's create list of states where UFO was spotted
  var states =  tableData.map(data => data.state);
  // Check the filtered states
  console.log(states);
  // Count the frequency of states in the filtered states
  var stateFrequency = stateCount(states);
  // Check frequency of states
  console.log(stateFrequency);
  // Plotting function
  barStatePlot(stateFrequency);
  // Animate saucer during calling the filter function
  animateSaucer();
} 

// Select the form
var form = d3.select("#form");
// Create a event handler
form.on("change",dataEntry);
FilterButton.on("click", dataEntry);

// Complete the event handler function for the form
function dataEntry() 
{
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Validate form field
  CheckforDate();
  // Select the input element and get the value property
  var FormDate = d3.select("#datetime").property("value");
  // Display the input in the console
  console.log(FormDate);
  // Filter data table
  filteredDate();
}
// Validate function for date entry
function CheckforDate()
{
  targetField = document.getElementById("datetime");
  if (targetField.value.length === 0)
  {
    alert("Please enter a valid date");
    targetField.focus();
    targetField.style.background = "LightBlue";
    return false;
  }
  targetField.style.background = "white";
}
// Create a function that filters data based on input field
function filteredDate()
{
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input element and get the value property
  var formDate = d3.select("#datetime").property("value");
  // Filter data using map & arrow function
  var filteredDate = tableData.filter(data => data.datetime === formDate);
  // Display the number of items filtered in console
  console.log("Length of filtered dataset: " + filteredDate.length);
  // Get a reference to the table body
  var tbody = d3.select("tbody");
  // Clear existing data
  tbody.html("");
  // Using arrowfunction to populate the table with filtered dates
    filteredDate.forEach((data) => {
      var row = tbody.append("tr");
      Object.entries(data).forEach(([key, value]) => 
      {
          var cell = row.append("td");
          cell.text(value);
      });
    });
  // Let's create list of states where UFO was spotted
  var states =  filteredDate.map(filtered_data => filtered_data.state);
  // Check the filtered states
  console.log(states);
  // Count the frequency of states in the filtered states
  var stateFrequency = stateCount(states);
  // Check frequency of states
  console.log(stateFrequency);
  // Plotting function
  barStatePlot(stateFrequency);
  // Animate saucer during calling the filter function
  animateSaucer();

  return false;
}
// Create a function that counts the number of times a state appears in a list
function stateCount(stateList) 
{
  // Create an object to hold the state frequency
  var stateFrequency = {};
  //Iterate over the array
  for(var i =0; i < stateList.length; i++) {
    currentState = stateList[i];
    // Check the number of times currentCity appears
    if (currentState in stateFrequency) {
      // We found one more instance
      stateFrequency[currentState] += 1;
    }
    else {
      // First instance of that city
      stateFrequency[currentState] = 1;
    }
  }
  return stateFrequency;
}
// A function to create a barplot
function barStatePlot (stateFrequency) 
{
  var Frequency = [];
  Object.values(stateFrequency).forEach(state_value => Frequency.push(state_value))
  console.log(Frequency)
  var States = [];
  Object.keys(stateFrequency).forEach(state_key => States.push(state_key))
  console.log(States)
    
  // Create trace object
  var trace1 = {
    x: States,
    y: Frequency,
    type: "bar"
  };
  var data = [trace1];
  var layout = {
    plot_bgcolor:"black",
    paper_bgcolor:"#FFF3",
    margin:{l:50,r:50,b:50,t:50},
    title: {
      text:"UFO Sightings Statewise",
      font:{
        family: 'Georgia,serif',
        color:'white',
        size: 24
      },
      xanchor: 'center',
      yanchor:'top'
    },
    xaxis:{
      title: {
        text: "State",
        font: {
          family:'Arial,Helvetica,sans-serif',
          size: 20,
          color: 'white',
        }
      },
      showgrid: false,
      tickmode: 'auto',
      ticks:'inside',
      tickcolor:'white',
      tickwidth: 2,
      tickfont:{
        family:'Georgia,serif',
        size: 14,
        color: 'white',
      }
    },
    yaxis:{
      title: {
        text: "UFO Sightings",
        font: {
          family:'Arial,Helvetica,sans-serif',
          size: 20,
          color: 'white',
        }
      },
      showgrid: true,
      gridcolor: 'white',
      gridwidth: 1,
      tickfont:{
        family:'Arial,Helvetica,sans-serif',
        size: 14,
        color: 'white',
      } 
    }
  };
  var config ={responsive:true}
  Plotly.newPlot("plot",data,layout,config);

  return false;
}

// Function to animate saucer gif image
function animateSaucer() 
{
  let start = Date.now(); // remember start time
  let timer = setInterval(saucerTimer,20); // updates every 20ms 
 // function defining time interval
 function saucerTimer()
  {
    let timePassed = Date.now() - start; // Update time passed
    if (timePassed >= 2000) {
      clearInterval(timer); // finish the animation after 2 seconds
      saucer.style.left = 0 + 'px'; // saucer comes back to center
      return;
    }
    // draw the animation at the moment timePassed
    saucerMove(timePassed);
  }
  // saucer image  moves left from 0px to 400px over 2 seconds
  function saucerMove(timePassed) {
    saucer.style.left = timePassed / 5 + 'px';
  }
  
} 
