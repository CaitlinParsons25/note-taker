const fs = require('fs');
const router = require('express').Router();
const { notes } = require('../../db/db.json');
const { findById, createNote, validateNote } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewAnimal(req.body, notes);
        res.json(note);
    }
});


module.exports = router;