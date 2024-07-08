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
const margin = { top: 20, right: 20, bottom: 30, left: 200 };
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

// Add X axis
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Add Y axis
svg.append("g")
    .call(d3.axisLeft(y));

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

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to update bars
function updateBars() {
    bars.each(function(d, i) {
        if (isInViewport(this)) {
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("width", x(d.value));
            
            labels.filter((_, j) => j === i)
                .transition()
                .duration(1000)
                .attr("x", x(d.value) - 5)
                .style("opacity", 1);
        }
    });
}

// Scroll event listener to update bars dynamically
window.addEventListener('scroll', updateBars);

// Initial call to updateBars
updateBars();
