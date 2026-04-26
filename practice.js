const promise = new Promise((resolve, reject) => {
    const success = true; // Change to false to test rejection.

    if (success) {
        resolve("The operation was successful!");
    } else {
        reject("The operation failed.");
    }
});

promise
    .then((message) => {
        console.log("Fulfilled:", message);
    })
    .catch((error) => {
        console.error("Rejected:", error);
    })
    .finally(() => {
        console.log("Promise has settled.");
    });