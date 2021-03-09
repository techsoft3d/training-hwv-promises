'use strict';

function createScsViewer(scsModelName, containerId) {
  return new Promise(function (resolve, reject) {
    var viewer = new Communicator.WebViewer({
      containerId: containerId,
      endpointUri: `data/${scsModelName}.scs`
    });

    resolve(viewer);
  });
};

function registerCallbacks(viewer) {
    let callbacks = {
      sceneReady: () => {
        viewer.view.setBackgroundColor(Communicator.Color.blue(), Communicator.Color.white());
      },
      modelStructureReady: () => {
        console.log(`Model structure is ready!`);
      },
      camera: () => {
        console.log(`Camera change detected:`);
        console.table(JSON.stringify(viewer.view.getCamera().toJson(), null, 4));
      },
    };

    viewer.setCallbacks(callbacks);
    return viewer;
}

var hwv;

window.onload = () => {
  let scsModelName = "landinggear";
  let containerId = "viewer";

  createScsViewer(scsModelName, containerId)
    .then(registerCallbacks)
    .then(viewer => {
      hwv = viewer;
      hwv.start()
    });
}

// Local procedure to wrap model.loadSubtreeFromScsFile logic
var loadModelAsSubtree = (modelName) => {
  var model = hwv.model;
  
  // Retrieve root node of model
  var rootNode = model.getAbsoluteRootNode();
  
  // Create a child node of root node
  var id = model.createNode(rootNode, modelName);
  
  // Load provided model to newly created node
  // Remember to return the promise! See myWaitFunction() in demo_promises.js for reference
  return model.loadSubtreeFromScsFile(id, `data/${modelName}.scs`);

  // If load is successful, loadSubtreeFromScsFile will produce the newly loaded model's root nodes IDs.
  // source: https://docs.techsoft3d.com/communicator/latest/build/api_ref/typedoc/classes/communicator.model.html#loadsubtreefromscsfile
};

// Demonstrate Promises + async/await with HOOPS Web Viewer
let printFirstChildProperties = async nodeIds => {
  let children = hwv.model.getNodeChildren(nodeIds[0])
  let props = await hwv.model.getNodeProperties(children[0])
  console.log(props);

  // source: https://docs.techsoft3d.com/communicator/latest/build/api_ref/typedoc/classes/communicator.model.html#getnodeproperties
};

// Demonstration of using Promises to load multiple models using .then() chaining
let handleOnClickThenChain = () => {

  hwv.model.clear() // Clear the model
    
    .then(() => loadModelAsSubtree('landinggear')) // load first model
    .then((nodeId) => console.log(`nodeId: ${nodeId}`)) // arbitrary unit of work

    .then(() => loadModelAsSubtree('microengine')) // load second
    .then(printFirstChildProperties) // return value is automatically passed to function
  
    .then(() => loadModelAsSubtree('MountainHome')) // load third
    .then((nodeId) => console.log(`nodeId: ${nodeId}`)) // arbitrary unit of work

    .catch(console.error) // handle any errors from above
    .finally(() => console.log('Loading promise chain complete!'));
};

// Demonstration of using Promises to load multiple models using try/catch asyc/await
let handleOnClickAsyncAwait = async () => {

  try {
    await hwv.model.clear(); // Clear the model

    var nodeId = await loadModelAsSubtree('landinggear'); // load first model
    console.log(`nodeId: ${nodeId}`);

    nodeId = await loadModelAsSubtree('microengine'); // load second
    printFirstChildProperties(nodeId);

    nodeId = await loadModelAsSubtree('MountainHome'); // load third
    console.log(`nodeId: ${nodeId}`);
  } catch(err) {
    console.error(err);
  }
  
  console.log('Loading promise chain complete!'); // finally
};

// Attach onClick event handlers to DOM
document.getElementById("then-chain").onclick = handleOnClickThenChain;
document.getElementById("async-await").onclick = handleOnClickAsyncAwait;
