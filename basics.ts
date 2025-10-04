// Primitices: number, string, boolean 
// More complex types: arrays, objects 
// Function types, parameters 

// Primitives 

let age: number;
age = 12;

let userName: string;
userName = 'Yejin';

let isInstructor: boolean;
isInstructor = true;

// More complex types 
let hobbies: string[];
hobbies = ['Sports', 'Cooking'];

// let person: {
//   name: string;
//   age: number;
// };

// type alias 
type Person = {
  name: string;
  age: number;
}
let person: Person;

person = {
  name: 'Yejin',
  age: 22,
}

// person = {
//   isEmployee: true
// }

// let people: {
//   name: string;
//   age: number;
// }[];
let people: Person[];

// Type inference
let topic = 'TypeScript'
// topic = 12345; // 에러 ! 

// Union type 
let course: string | number = 'React-The Complete Guide';
course = 1235;

let userName2: string | string[];
userName = 'Yejin';


// Functions & Types 
function add(a: number, b: number) {
  return a + b;
}

function printOutput(value: any) {
  console.log(value);
  // 반환값 없음 -> void 
}

// Generics 
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

// updatedArray[0].split(''); 