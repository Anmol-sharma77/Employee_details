const express = require("express");
const fs = require("fs");
const cors=require('cors');
const con=require("./database")
const app = express();
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use(cors());
app.use(express.json());
const queryAsync = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql ,(err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
app.post("/todo",function(request,response){
  const todo=request.body;
  savetodo(todo,function(error){
    if(error)
    
    {
      response.status(500);
      response.json({error:error});
    }
    else{
      response.status(200);
      response.send();
    }
  });
});
async function savetodo(todo,callback)
{
  try {
    await queryAsync(`insert into todo values(${todo.id},"${todo.task}","${todo.createdBy}",${todo.flag})`);
    callback(null)
    return;
  } catch (error) {
    console.log(error);
    callback(error);
    return;
  }
  // gettodos(null,true,function(error,todos){
  //   if(error)
  //   {
  //     callback(error)
  //   }
  //   else{
  //     todos.push(todo);
  //     fs.writeFile("todos.txt",JSON.stringify(todos),function(error){
  //       if(error){
  //         console.log(error);
  //       callback(error);}
  //       else{
  //       callback();}
  //     });
  //   }
  // });
}
app.get("/todos", function(request,response){
  try {
    const name=request.query.name;
  gettodos(name,false,function(error,todos){
    if(error)
    {
      response.status(500).json({error:error});
    }
    else{
      response.status(200).json(todos);
    }
  })
  } catch (error) {
    console.log(error);
  }
});
async function gettodos(username,all,callback)
{
  try {
    
    const todo=await queryAsync(`select * from todo where createdBy="${username}"`);
    callback(null,todo)
  } catch (error) {
    console.log(error);
    callback(null,[])
  }
  // fs.readFile("todos.txt","utf-8",function(error,data){
  //   if(error)
  //   {
  //     callback(error);
  //   }
  //   else
  //   {
  //     if (data.length===0)
  //     {
  //       data="[]";
  //     }
  //     try{
  //       let todos=JSON.parse(data);
  //       if(all)
  //       {
  //         callback(null,todos);
  //         return;
  //       }
  //       const filteredTodos=todos.filter(function(todo){
  //         return todo.createdBy===username;
  //       });
  //       callback(null,filteredTodos);
  //     }catch(error){
  //       callback(null, []);
  //     }
  //   }
  // });
}
app.listen(8000,function(error)
{
  if(error)
  console.log(error);
  else
  console.log("Server is running on port 8000");
})
app.delete("/todo", async function (request, response) {
    const todo = request.body;
    try {
    
      await queryAsync(`delete from todo where id=${todo.id}`);
      response.status(200).send();
    } catch (error) {
      console.log(error);
      response.status(500).json({error:error});
    }
    // gettodos(null, true, function (error, todos) {
    //   if (error) {
    //     response.status(500);
    //     response.json({ error: error });
    //   } else {
    //     const filteredTodos = todos.filter(function (item) {
    //       return item.id !== Number(todo.id);
    //     });
    //     fs.writeFile("todos.txt",JSON.stringify(filteredTodos),function (error) {
    //         if (error) {
    //           response.status(500);
    //           response.json({ error: error });
    //         } else {
    //           response.status(200);
    //           response.send();
    //         }
    //       }
    //     );
    //   }
    // });
  });
  app.post("/update",async function (request, response) {
    const todo = request.body;
    try {
    
    await queryAsync(`update todo set flag=${!flag} where id=${todo.id}`);
    response.status(200).send();
  } catch (error) {
    console.log(error);
    response.status(500).json({error:error});
  }
    // gettodos(null, true, function (error, todos) {
    //   if (error) {
    //     response.status(500);
    //     response.json({ error: error });
    //   } else {
    //     const filteredTodos = todos.filter(function (item) {
    //       if(item.id===Number(todo.id)){
    //           if(Number(item.flag)===1)
    //            item.flag=0;
    //            else
    //            item.flag=1;}
    //       return true;
    //     });
    //     fs.writeFile("todos.txt",JSON.stringify(filteredTodos),function (error) {
    //         if (error) {
    //           response.status(500);
    //           response.json({ error: error });
    //         } else {
    //           response.status(200);
    //           response.send();
    //         }
    //       }
    //     );
    //   }
    // });
  }); 