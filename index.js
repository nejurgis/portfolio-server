let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)

// const fs = require('fs')

// app.use(cors())

let coords = []

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('load history', ()=> {
      io.emit('here you go', coords)

  })
  socket.on("hell", (msg)=> {
    // console.log('msg before stringify:', msg)
    // console.log('msg after stringify:', history)
    if (Array.isArray(msg)) {
      // console.log('array is ok')
    } else {
      console.log('ALARM')
    }

    if (coords.length >= 1500) {
      
      coords.shift()
      // console.log('shifted the coords')
    } else {
      
      coords.push(msg)
      // console.log('msg:', msg)
      // console.log('coords', coords)
    }
    io.emit('livestream', msg)
    // console.log('coordinate:', msg)

    

    // socket.on('load history', ()=> {
    //   // console.log('here you go')
    //   fs.readFile('./hoverData.json', (err,body) => {
    //     let history = JSON.parse(body)
    //     console.log('history:', history)
    //     io.emit('here you go', history)
    //   })
      
    // })
    // fs.readFile('./hoverData.json',  (err,body) => {
    //   let validateJson = (body) => {
    //     try{
    //       let data = JSON.parse(body)
    //       return data
    //     } catch(e) {
    //       console.log('oops')
    //       let data = new Array;
    //       console.log('error:', e)
    //       return data
    //     }
    //   } 

    //   if (err) throw err
    //   let data = validateJson(body)
    //   if (data){
    //     if (data.length >= 150) {
    //       data.shift()
    //     } else {
    //       if (Array.isArray(msg)) {

    //         data.push(msg)
    //       } else {
    //         // file.push([])
    //         console.log('not an array!')
    //       }
    //     }
    //     // need to stringify it back for json to get it
    //     const json = JSON.stringify(data)
        
    //     io.emit('livestream', msg)
    //     console.log('msg:', msg)
    //     fs.writeFile('./hoverData.json', json,'utf8' , (err) => {
    //       if (err) {
    //         console.log('WRITIN AINT WORKIN')
    //         throw err}
    //         // console.log(`${msg} written to file`)
          
            
          
    //     })
    // }
    // })
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT || 3000, () =>{
  console.log('Im the server and ill be runnin');
});


