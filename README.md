# Promises with HOOPS Web Viewer

The `master` branch of this repository is the *starter code* for the training session.

If you'd like to review the code after the training has been completed, checkout the `completed` branch:

`git checkout completed`

## Prerequisites

You will need a basic understanding of JavaScript's [asynchronous behavior](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous), [dot notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation), and an [growth mindset](https://www.mindsetworks.com/science/).

### Tools

For this project we will need a code editor, an HTTP server, and a browser. You can use your preferred toolset but the trainer will be using the following during the session:

**Code Editor:** [VSCode](https://code.visualstudio.com/download)

**HTTP Server:** [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) from the VisualStudio Marketplace

**Browser:** [Chrome browser](https://www.google.com/chrome/)

## Goal

Attain a fundamental understanding of **why** we use Promises, **how** to use them, and identify Promises in the Web Viewer API.

## Why?

JavaScript is *asynchronous*. This is powerful for the web, but complicated when compared to C++ or Java. Promises can help.

Originally, our only solution was *callback functions* but...nobody likes [callback hell](http://callbackhell.com/).

```javascript
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```

What if we could produce asynchronous code but write it top-down in a `try/catch` style? Hello, [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});

myPromise
  .then(handleResolvedA, handleRejectedA)
  .then(handleResolvedB, handleRejectedB)
  .then(handleResolvedC, handleRejectedC);
```

[caniuse](https://caniuse.com/?search=promises) Promises?

Promises have become common in web development, includeing the [Web Viewer API](https://docs.techsoft3d.com/communicator/latest/build/api_ref/typedoc/modules/communicator.html)!

## How?

Review the content in `demo_promises.js`.

## Promises in the Web Viewer API

Review the content in `demo_hwv.js`.