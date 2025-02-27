import Queue from "queue-promise";

const resolve = (value: any) => new Promise((resolve, _) => resolve(value));
const reject = (value: any) => new Promise((resolve, _) => resolve(value));

const queue = new Queue();

// $ExpectType State
queue.state;
// $ExpectError
queue.state = false;

// $ExpectType number
queue.size;
// $ExpectError
queue.size = 5;

// $ExpectType boolean
queue.isEmpty;
// $ExpectError
queue.isEmpty = false;

// $ExpectType boolean
queue.shouldRun;
// $ExpectError
queue.shouldRun = false;

// $ExpectType void
queue.start();

// $ExpectType void
queue.stop();

(async () => {
  // $ExpectType any
  const a = await queue.dequeue();
  // $ExpectType any
  const [c, d] = await queue.dequeue();
  // $ExpectType any
  const [e, f, g] = await queue.dequeue();
})();

// $ExpectType number[]
queue.enqueue(() => resolve("Success"));
// $ExpectType number[]
queue.enqueue(() => reject("Error"));
// $ExpectType number[]
queue.enqueue([() => reject("Success"), () => reject("Error")]);
// $ExpectError
queue.enqueue("ab");
// $ExpectError
queue.enqueue(1234);
// $ExpectError
queue.enqueue(true);

// $ExpectType void
queue.add(() => resolve("Success"));
// $ExpectType void
queue.add(() => reject("Error"));
// $ExpectType void
queue.add([() => reject("Success"), () => reject("Error")]);
// $ExpectError
queue.add("ab");
// $ExpectError
queue.add(1234);
// $ExpectError
queue.add(true);

// $ExpectType void
queue.clear();
