require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const path = require('path');

const fs = require('fs');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.options('*', cors());

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
    next();
  });

const User = require('./model/user');
const Project = require('./model/project');
const auth = require("./middleware/auth");

app.get('/', (req,res) => {
    res.send("Server running...");
});

app.post('/signUp', async function (req, res) {
    var data = req.body;
    console.log(data);
    const oldUser = await User.findOne( {username: data.username} );
    if (oldUser){
        return res.status(409).json({'error':"User already exist. Please signIn."});
    }
    User.create({
      'username': data.username,
      'password': data.password,
      'email': '',
      'info': {
        'userCreated': new Date(),
        'lastLogin': new Date()
      }
    }, (err,d)=>{
      // console.log(d);
      if (d) res.status(201).json(d);
      else if(err) {
        console.log(err);
        res.status(400).json({'error': err})
        }else{
            res.status(409).json({'error': "something went wrong"})
        }
    });
});

app.post('/signIn', function (req, res) {
    var data = req.body;
    console.log(data);
    User.findOne({'username': data.username, 'password': data.password}, (err,d)=>{
      if (d){
        d.info.lastLogin = new Date();
        d.info.logins.push(new Date());
        d.markModified('info');
        d.save((e,res)=>{
            if (res) console.log("info updation finished");
            else if (e) {
                console.log(err);
                res.status(409).send({"error": "something went wrong while updating user"})
            } else{
                res.status(409).send({"error": "something went wrong while updating user"})
            }
        })
        res.json(d);
      }else{
        console.log("No user found!");
        res.status(400).send({'error': "user not found.."})
      }
    });
});

app.get('/projects/:user_id', (req,res) => {
    let user_id = req.params.user_id;
    Project.find({user_id}, (err,d)=>{
        if (d) {
            // console.log(d);
            res.cookie('seassion_id', 'test_seasion123');
            res.json(d);
        }else{
            res.json([])
        }
    })
})

app.get('/projects/:user_id/:id', (req,res) => {
    let user_id = req.params.user_id;
    Project.find({_id: req.params.id}, (err,d)=>{
        if (d) {
            // console.log(d);
            res.cookie('seassion_id', 'test_seasion123');
            res.send(d[0]);
        }
    })
})

app.post('/projects/:user_id', async (req,res) => {
    let user_id = req.params.user_id;
    try{
        const { user_id, title, start_date, end_date, description, cover, status, budget, github, tags } = req.body;
        console.log(req.body);

        if (!(user_id, title, start_date, budget, status)){
            res.status(400).send({'error': 'Please pass all t/home/sat/Documents/Others/Github/boilerplate-project-messageboard/routes/api.jshe required fields to create a new entry'})
        }

        let project = await Project.create({
            user_id, title, start_date, end_date, description, cover, status, budget, github, tags
        });
        // res.cookie('seassion_id', 'test_seasion123');
        res.status(201).json(project);
    }catch (err) {
        console.log(err);
        res.json({'error': err});
    }
})

app.patch('/projects/:user_id/:id', (req,res) => {
    let user_id = req.params.user_id;
    const project = req.body;
    Project.findOneAndUpdate({_id: req.params.id}, project, {new: true}, (err,data) => {
        if (err){
            res.status(400).json({
                error: err
            });
        }else if(data){
            res.status(201).json(data);
        }else{
            res.status(400).json(
                {"error": "Something went wrong, can't update the project for this id"}
            );
        }
    });
});

app.delete('/projects/:user_id/:id', (req,res) => {
    Project.findOneAndDelete({_id: req.params.id}, (err,data) => {
        if (err) {console.log(err); res.status(400).json({'error': err})}
        else if(data) {res.status(201).send({'msg': 'Deleted successfully'})}
        else {res.status(409).send({"error": "No project found for this id"})}
    });
});

async function createProject(p){
    let project = await Project.create(p);
}

// let data = JSON.parse(fs.readFileSync(__dirname + "/db.json", 'utf8'))['portfolio'];

// for (let d of data){
//     project = d;
//     project['user_id'] = '62e17afcb2561992d6d2feb3';
//     project['github'] = 'https://github.com/Sathishr424?tab=repositories';
//     project['tags'] = ['Python']
//     createProject(project);
// }

module.exports = app;