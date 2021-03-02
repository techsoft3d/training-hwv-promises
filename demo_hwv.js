'use strict';

var hwv;

window.onload = () => {
  let scsModelName = "landinggear";

  hwv = new Communicator.WebViewer({
      containerId: "viewer",
      endpointUri: `data/${scsModelName}.scs`
  });

  hwv.start();
}

// Local procedure to wrap model.loadSubtreeFromScsFile logic
// source: https://docs.techsoft3d.com/communicator/latest/build/api_ref/typedoc/classes/communicator.model.html#loadsubtreefromscsfile

// Demonstrate Promises + async/await with HOOPS Web Viewer
// source: https://docs.techsoft3d.com/communicator/latest/build/api_ref/typedoc/classes/communicator.model.html#getnodeproperties

// Demonstration of using Promises to load multiple models using .then() chaining
let handleOnClickThenChain = () => {

  hwv.model.clear(); // Clear the model
};

// Demonstration of using Promises to load multiple models using try/catch asyc/await
let handleOnClickAsyncAwait = async () => {

  hwv.model.clear(); // Clear the model
};

// Attach onClick event handlers to DOM
document.getElementById("then-chain").onclick = handleOnClickThenChain;
document.getElementById("async-await").onclick = handleOnClickAsyncAwait;
