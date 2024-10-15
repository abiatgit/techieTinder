
const book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  pages: 180,
};

const arr=["title","author","pages"]


const canWeAllow=arr.every(item=>Object.keys(book).includes(item))
console.log(canWeAllow)