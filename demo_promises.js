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
  // Prepare data
  let timer = Math.floor(Math.random() * 1000);

  // Send async request
  setTimeout(() => {
    if (timer % 2 === 0) {
      resolve(`Timer is even! ${timer}`); // Async task successful!
    }else {
      reject(`Timer is odd! ${timer}`); // Async task Unsuccessful : (
    }
  }, timer);
};

// Now that our async task is wrapped in an executor function, we create the Promise *object*
var asyncTaskAsAPromiseObject = new Promise(executor);

// At this point, the status is *pending* and the value is *undefined*
debugger;

//let's chain our logic together using .then()
asyncTaskAsAPromiseObject
  .then(value => { debugger; console.log(`Results: ${value}`)}) // Handle when 'promise' status is *resolved*
  .then(() => console.log('wow this is great')) // arbitrary unit of work
  .catch(errorMessage => { debugger; console.error(errorMessage);}) //Handle when 'promise' status from above is *rejected*
  .finally(() => console.log('performing post-task clean up...')); // alway run at end, regardless of success or failure from above


// Let's wrap the asyncTaskAsAPromiseObject in a function so we can pass arguments to the executor
var myWaitFunction = (timer) => {
  // perform some work...

  // We return a Promise object so we can use .then() chaining
  return new Promise((resolve, reject) => {
    // Send async request
    setTimeout(() => {
      if (timer % 2 === 0) {
        resolve(`Timer is even! ${timer}`); // Async task successful!
      }else {
        reject(`Timer is odd! ${timer}`); // Async task UNsuccessful : (
      }
    }, timer);
  });
}

// Now we can call as a function
myWaitFunction(1000)
  .then(value => { debugger; console.log(`Results: ${value}`)}) // Handle when 'promise' status is *resolved*
  .then(() => console.log('wow this is great')) // arbitrary unit of work
  .catch(errorMessage => { debugger; console.error(errorMessage);}) //Handle when 'promise' status from above is *rejected*
  .finally(() => console.log('performing post-task clean up...')); // alway run at end, regardless of success or failure from above
  
// Promise.all() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// Promise.race() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
var myListOfPromises = [myWaitFunction(1000), myWaitFunction(2000)];
Promise.all(myListOfPromises)
  .then((result) => console.log(result[1])); // result is array[] of each resolve/rejected Promise
