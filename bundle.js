import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';

const projects = [
    {
        name: "Model 1 A",
        id: "1",
        url: "ifc_files\\01.ifc"
    },
    {
        name: "Model 2",
        id: "2",
        url: "ifc_files\\02.ifc"
    },
    {
        name: "Model 3",
        id: "3",
        url: "ifc_files\\03.ifc"
    },
    {
        name: "Model 4",
        id: "4",
        url: "ifc_files\\04.ifc"
    },
    {
        name: "Model 5",
        id: "5",
        url: "ifc_files\\05.ifc"
    },
   
];

console.log("hi");

// Get the current project ID from the URL parameter
const currentUrl = window.location.href; 
const url = new URL(currentUrl);
const currentProjectID = url.searchParams.get("id");

// Get the current project
const currentProject = projects.find(project => project.id === currentProjectID);

// Add the project URL to the iframe
const modelpath = currentProject.url;


// new code -----

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
viewer.grid.setGrid();
viewer.axes.setAxes();

async function loadIfc(url) {
    await viewer.IFC.setWasmPath("../../../");
    const model = await viewer.IFC.loadIfcUrl(url);
    viewer.shadowDropper.renderShadow(model.modelID);
}

loadIfc(modelpath);
