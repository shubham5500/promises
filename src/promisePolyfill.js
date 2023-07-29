function MyPromise(executor) {
  let isResolved = false;
  let resolvedValue;
  let rejectedValue;
  let isFullfilled = false;
  let isCalled = false;
  let isReject = false;
  let thenHandler;
  let catchHandler;

  function resolve(val) {
    isResolved = true;
    resolvedValue = val;
    if (typeof thenHandler === "function" && !isCalled) {
      const val = thenHandler(resolvedValue);
      console.log({ val });
      if (val) {
        resolvedValue = val;
      }
      isCalled = true;
    }
  }

  function reject(val) {
    isReject = true;
    rejectedValue = val;
  }

  this.then = function (handler) {
    thenHandler = handler;
    if (isResolved && !isCalled) {
      const val = handler(resolvedValue);
      console.log({ val });

      if (val) {
        resolvedValue = val;
      }
    }
    return this;
  };
  this.catch = function (handler) {
    catchHandler = handler;
    if (isResolved) {
      handler(rejectedValue);
    }
  };
  executor(resolve, reject);
}

const newPromise = new MyPromise((res, rej) => {
  console.log("IM EXECUTOR");
  setTimeout(() => {
    res("RESOLVED VALUE");
  }, 5000);
})
  .then((resValue) => {
    console.log({ resValue });
    return "resValue";
  })
  .then((val) => {
    console.log("..............", val);
  });
