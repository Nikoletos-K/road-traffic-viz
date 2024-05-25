d3.csv('data.csv').then(data => {
    const margin = {top: 20, right: 30, bottom: 70, left: 50};
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d['VICTIMS CATEGORY BY TYPE AND AGE']))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d['TOTAL'])])
        .nice()
        .range([height, 0]);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d['VICTIMS CATEGORY BY TYPE AND AGE']))
        .attr("y", d => y(d['TOTAL']))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d['TOTAL']))
        .attr("fill", "steelblue")
        .on("mouseover", function() {
            d3.select(this).attr("fill", "orange");
        })
        .on("mouseout", function() {
            d3.select(this).attr("fill", "steelblue");
        });

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(y));
});
