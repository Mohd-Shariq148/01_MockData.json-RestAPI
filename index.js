const express = require('express')
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 3000

//middleware
app.use(express.urlencoded({extended: false})); //this middleware works
                                           //whenever in the body the form data or
                                        //urlencoded data comes it will allow the data
                                        //in the request.body

//get route html rendering created hybrid route
app.get('/users',(req,res)=>{  
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`)}
    </ul>
    `

    res.send(html);
})


// Rest api routes
app.get('/api/users',(req,res)=>{   //returning json data
    return res.json(users)
})

//here we have grouped 3 routes together
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            const updatedUser = { ...users[userIndex], ...req.body };
            users[userIndex] = updatedUser;
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).json({ status: "error", message: "Internal server error" });
                }
                return res.json({ status: "success", data: updatedUser });
            });
        } else {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
    })  
    .delete((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            const deletedUser = users.splice(userIndex, 1);
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).json({ status: "error", message: "Internal server error" });
                }
                return res.json({ status: "success", message: "User deleted", data: deletedUser });
            });
        } else {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
    });

//------------------------------------------------------------------------------------
app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1}); // adding data to mock_data.json
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: "success", id:users.length});
    });
}); // <-- Added closing curly brace for the route handler function

app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
});
