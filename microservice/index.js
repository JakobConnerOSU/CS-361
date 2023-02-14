import fs from "fs";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

const inputPath = "./input.txt";
const outputPath = "./output.png";

const width = 1000;
const height = 400;

const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: width,
    height: height,
    backgroundColor: "white"
});

async function run() {
    while(true) {
        await sleep(1000);
        if(!fs.existsSync(inputPath)) continue;
    
        const inputData = fs.readFileSync(inputPath).toString().replaceAll("\r", "").split("\n");
        if(!validateInputs(inputData)) {
            console.log("Invalid Input!");
            continue;
        }

        const graphBuffer = await generateGraph(inputData)
        
        if(fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        fs.writeFileSync(outputPath, graphBuffer, "base64");

        fs.unlinkSync(inputPath);
    }
}

function validateInputs(inputs) {
    // Verify 4 numbers
    if(inputs.length < 4) return false;
    for(const input of inputs) {
        if(!parseFloat(input)) return false;
    }

    // Principle is greater than 0
    if(inputs[0] < 0) return false;
    // At least one year
    if(inputs[0] < 1) return false;
    // Return rate within [1, 100]
    if(inputs[2] < 1 || inputs[2] > 100) return false;
    // # of times per year within [1, 365]
    if(inputs[3] < 1 || inputs[3] > 365) return false;

    return true;
}

async function generateGraph(inputs) {
    const configuration = {
        type: "line",
        data: {
            datasets: [{
                label: "Value (USD)",
                data: generateData(inputs),
                borderColor: "black",
            }],
            labels: generateLabels(inputs)
        },
        plugins: [{
            id: "background-color",
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.save();
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, width, height);
                ctx.restore();
            }
        }]
    }

    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    return buffer;
}

function generateData(inputs) {
    const principle = inputs[0];
    const years = inputs[1];
    const returnRate = inputs[2] / 100;
    const frequency = inputs[3];

    let data = [];

    const increment = years <= 3 ? 0.25 : 1;

    for(let i = 0; i <= years; i += increment) {
        data.push(Math.round(calculateInterest(principle, returnRate, frequency, i)));
    }

    return data;
}

function generateLabels(inputs) {
    const years = inputs[1];
    
    let labels = [];

    if(years <= 3) {
        for(let i = 0; i <= years; i += 0.25) {
            labels.push(`${i * 12} Months`);
        }
    } else {
        for(let i = 0; i <= years; i++) {
            labels.push(`${i} Years`);
        }
    }

    return labels;
}

function calculateInterest(principle, rate, frequency, time) {
    return principle * Math.pow(1 + (rate / frequency), frequency * time);
}

function sleep(ms) {
    return new Promise(x => setTimeout(x, ms));
}

run();