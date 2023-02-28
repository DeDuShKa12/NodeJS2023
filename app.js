const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join('test', 'files', 'dir5'), (err)=>{
//   if (err) throw new Error();
// })

// fs.unlink(path.join('test', 'files', 'text1.txt'), (err)=>{
//   if (err) throw new Error();
// })
// fs.appendFile(path.join('test','files', 'text5.txt'), 'Hello from Okten again!', (err)=>{
//   if (err) throw new Error();
// })

fs.readdir(path.join('test', 'files'), {withFileTypes: true},(err, data)=>{
  if (err) throw new Error();
  data.forEach(file=>{
    if (file.isFile()){
      console.log({file})

    }
    else if (file.isDirectory()){
      console.log({DIR: {file}})
    }
  })
})
