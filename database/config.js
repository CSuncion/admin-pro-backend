const mongoose = require('mongoose');

const dbConnection = async() => {
    // mongodb+srv://mean_user:*****@cluster0.ajhvt.mongodb.net/hospitaldb?authSource=admin&replicaSet=atlas-dc7xb5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }

}

module.exports = {
    dbConnection
}