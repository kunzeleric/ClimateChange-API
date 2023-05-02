const PORT = process.env.PORT || 4000;
import app from './src/index.js';

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})

