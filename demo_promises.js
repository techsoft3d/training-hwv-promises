'use strict';

/*
Promise Definition:

A promise is an *object* that represents the *eventual* completion (success or failure) of an asynchronous operation and its resulting value.

Promise states:

- Pending (has not completed its work)
- Resolved (completed work successfully, produces a value)
- Rejected (completed work with failure, produces a value)
*/

// Let's use Promises to complete an async task...

// I have an async task: setTimeout()
// I need to handle success and failure separately
// I need to handle post-task clean up

// First, we wrap our async task in an executor function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise
var executor = function(resolve, reject){
};

// Now that our async task is wrapped in an executor function, we create the Promise *object*

// At this point, the status is *pending* and the value is *undefined*
debugger;

//let's chain our logic together using .then()


// Let's wrap the asyncTaskAsAPromiseObject in a function so we can pass arguments to the executor
var myWaitFunction = (timer) => {
}

// Now we can call as a function
  
// Promise.all() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// Promise.race() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
