const router = require("express").Router();
const { request } = require("express");
let Note = require("../model/Note.js");
router.route("/create").post((req,res) => {
    const title = req.body.title;
    const description = req.body.description
    const date = req.body.date;

    const newNote = new Note({
        title,
        description,
        date
    })

    newNote.save().then(()=>{
        res.json("Note created");
    }).catch((err)=>{
        console.log(err);
    })


})

router.route("/getNote/:id").get((req,res) => {
    let noteId = req.params.id;

    Note.findById(noteId)
        .then((note) => {
            res.status(200).send({status: "Note fetched", note: note})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with get Note",error: err.message})
        })
    })

//View all notes
router.route("/").get((req,res)=>{
    Note.find().then((notes)=>{
        res.json(notes)
    }).catch((err)=>{
        console.log(err);
    })
})


http://localhost:/8070/student/update
router.route("/update/:id").post(async (req, res) =>{
    let noteId = req.params.id;
    const title = req.body.title;
    const description = req.body.description
    const date = req.body.date;

    const updateNote = {
        title,
        description,
        date
    }

    const update = await Note.findByIdAndUpdate(noteId, updateNote)
    .then(() => {
        res.status(200).send({status:"Note updated", user: update});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with updating data", error: err.message});
    })
})

router.route("/deleteNote/:id").get(async(req,res) => {
    let noteId = req.params.id;
    await Note.findByIdAndDelete(noteId)
    .then(() => {
        res.status(200).send({status : "Note deleted"});    
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "error with delete data"});
    })
})

module.exports = router; 