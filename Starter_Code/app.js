// Build the metadata panel
console.log(`Sample Selected: ${sample}`);

function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;


    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(metaObj => metaObj.id === parseInt(sample));
    let result = resultArray[0];
    console.log(result);


    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");


    // Use `.html("") to clear any existing metadata
    panel.html("");


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
    panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
});



  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;


    // Filter the samples for the object with the desired sample number

    let resultArray = samples.filter(sampleObj => sampleObj.id === sample.toString());
    let result = resultArray[0];
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let bubbleData = [
      {
        x:
        y:
        text: otu_labels,
        mode:
        marker:  {
          size: sample_values,
          color: otu_ids, 
          colorscale: "Earth"
        }
      }
    ];

    // Render the Bubble Chart
    Plotly.newplot("bubble", bubbleData, bubbleLayout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map (otuID => `OTU ${otuID}`))

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  let selector = d3.select("#selDataset");
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    

    // 1.Get the list of sample names  ---> // Get the names field
    let sampleNames = data.names;

    //2. Add each sample name to the dropdown ---> Use d3 to select the dropdown with id of `#selDataset ---->// Use the list of sample names to populate the select options
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    // 3.Get the first sample and build the initial charts -----> Get the first sample from the list-----> // Build charts and metadata panel with the first sample
    let firstSample = sampleNames[0];
    buildMetadata(firstSample);  
  });
}

// Function for event listener
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
