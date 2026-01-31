const demoFunc = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Bhawesh");
    }, 1000);
  });
};

const greet = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`hello ${name}`);
    }, 1000);
  });
};

async function getNum() {
  let name = await demoFunc();
  console.log(name);
  let output = await greet(name);
  console.log(output);
}
