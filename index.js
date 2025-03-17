const express = require('express');
const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000;
let books=[];

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
app.get("/status", (request, response)=> {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
 });






//number one
 app.get("/whoami", (req, res) => {
    console.log("here");
    res.json({ studentNumber: "2715751" });  
});
app.get('/books', (req, res) => {
    res.json(books);
});


app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "404 not found" });
    }
    
    res.json(book);
});
app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title || !details || !Array.isArray(details)) {
        return res.status(400).json({ error: "400 Bad Request" });
    }

    const newBook = { id, title, details };
    books.push(newBook);
    res.status(201).json(newBook);
});
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, details } = req.body;

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "404 not found" });
    }

    // Update book details
    if (title) books[bookIndex].title = title;
    if (details) books[bookIndex].details = details;

    res.json(books[bookIndex]);
});
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "404 not found" });
    }

    books.splice(bookIndex, 1);  
    res.status(204).send();
});  
app.post('/books/:id/details', (req, res) => {
    const bookId = req.params.id;
    const { author, genre, publicationYear } = req.body;

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "404 not found" });
    }

    // Add detail to the book
    const detailId = (book.details.length + 1).toString(); 
    const newDetail = { id: detailId, author, genre, publicationYear };

    book.details.push(newDetail);

    res.status(201).json(newDetail);
});
app.delete('/books/:id/details/:detailId', (req, res) => {
    const bookId = req.params.id;
    const detailId = req.params.detailId;

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "404 not found" });
    }

    const detailIndex = book.details.findIndex(d => d.id === detailId);

    if (detailIndex === -1) {
        return res.status(404).json({ error: "404 not found" });
    }

    book.details.splice(detailIndex, 1);  
    res.status(204).send();  
});
