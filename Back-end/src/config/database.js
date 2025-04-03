const mongoose = require('mongoose');
require('dotenv').config(); 

const connection = async () => {
    const options = {
       
        // user: process.env.DB_USER,  // Không cần thiết nếu không dùng authentication
        // pass: process.env.DB_PASSWORD,  // Không cần thiết nếu không dùng authentication
        dbName: process.env.DB_NAME  // Tên cơ sở dữ liệu
    }

    try {
   
        await mongoose.connect(process.env.DB_HOST, options);
        const state = Number(mongoose.connection.readyState);
        
        const dbState = [
            { value: 0, label: 'Disconnected' },
            { value: 1, label: 'Connected' },
            { value: 2, label: 'Connecting' },
            { value: 3, label: 'Disconnecting' }
        ];
        
        console.log(dbState.find(f => f.value === state).label, "to db");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = connection;
