const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

// Set up express endpoint to serve the bundled app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000

// Start the server (needed for Heroku)
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
