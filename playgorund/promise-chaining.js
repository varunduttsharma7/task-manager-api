require(`../src/db/mongoose-connection`);
const Task = require(`../src/db/models/task`);
const User = require(`../src/db/models/user`);

// 6224efca86fd350af21d4eb9

Task.findByIdAndDelete(`6224efca86fd350af21d4eb9`)
  .then(() => {
    console.log(`deleted`);
    return Task.countDocuments({ completed: false });
  })
  .then((tasks) => {
    console.log(tasks);
  });

updateUserAgeAndCount = async () => {
  await User.findByIdAndUpdate(`6224d28942fdc104db9af8e8`, { age: 100 });
  const count = await User.countDocuments({ age: 100 });
  return count;
};

updateUserAgeAndCount()
  .then((count) => {
    console.log(`User(s) with age of 100 are/is ${count}`);
  })
  .catch((e) => {
    console.log(`some issue has occurred`);
  });
