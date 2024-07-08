// Data provided
const data = [
    { metric: "% Interventi aggressivi", value: 59 },
    { metric: "Assist da piazzati", value: 61 },
    { metric: "Coinvolgimento in costruzione", value: 69 },
    { metric: "Gioco lungo", value: 42 },
    { metric: "Invasione dell'area", value: 41 },
    { metric: "Passaggi progressivi", value: 88 },
    { metric: "Progressioni palla al piede", value: 93 },
    { metric: "Tocchi per pallone perso", value: 22 },
    { metric: "Verticalità dei passaggi%", value: 77 },
    { metric: "xA", value: 68 }
];

// Dimensions
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 960 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Create SVG container
const svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// X and Y scales
const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

const y = d3.scaleBand()
    .domain(data.map(d => d.metric))
    .range([0, height])
    .padding(0.1);

// Create the initial bars with zero width
const bars = svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.metric))
    .attr("width", 0)
    .attr("height", y.bandwidth());

// Add the labels
const labels = svg.selectAll(".bar-label")
    .data(data)
  .enter().append("text")
    .attr("class", "bar-label")
    .attr("x", 0)
    .attr("y", d => y(d.metric) + y.bandwidth() / 2)
    .attr("dy", ".35em")
    .text(d => d.value)
    .style("opacity", 0);

// Scroll event listener to update bars dynamically
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const chartPosition = document.getElementById('chart').offsetTop;

    if (scrollPosition > chartPosition) {
        // Update bars with animation
        bars.transition()
            .duration(1000)
            .attr("width", d => x(d.value));

        // Update labels with animation
        labels.transition()
            .duration(1000)
            .attr("x", d => x(d.value) + 5)
            .style("opacity", 1);
    }
});
