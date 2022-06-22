import { projects } from "./projects.js";
import {Color} from 'three' ;
import { IfcViewerAPI } from 'web-ifc-viewer';

console.log("hi")

// Get the current project ID from the URL parameter
const currentUrl = window.location.href; 
const url = new URL(currentUrl);
const currentProjectID = url.searchParams.get("id");

// Get the current project
const currentProject = projects.find(project => project.id === currentProjectID);

// Add the project URL to the iframe
const modelpath = currentProject.url;
console.log(modelpath) ;
const modelname = currentProject.name;
const nameBox = document.querySelector(".simple-card");
nameBox.textContent = modelname ;
// new code -----

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
viewer.grid.setGrid();
viewer.axes.setAxes();

async function loadIfc(url) {
    await viewer.IFC.setWasmPath("node_modules/web-ifc/");
    const model = await viewer.IFC.loadIfcUrl(url);
    viewer.shadowDropper.renderShadow(model.modelID);
}

loadIfc(modelpath);


