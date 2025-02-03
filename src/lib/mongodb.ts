import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
}

// This line now works since we extended the `globalThis` type
let cached = globalThis.mongoose;

if (!cached) {
    cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connect;
