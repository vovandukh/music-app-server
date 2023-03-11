const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT;



(async () =>
{
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT , ()=>{console.log(`server work in port ${PORT}`)})
})();