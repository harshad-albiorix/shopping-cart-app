declare global {
    // Declare the properties you want to add to globalThis here
    namespace NodeJS {
        interface Global {
            mongoose: {
                conn: import('mongoose').Connection | null;
                promise: Promise<import('mongoose').Connection> | null;
            };
        }
    }
}

// If you're using globalThis, then you can also use:
globalThis.mongoose = globalThis.mongoose || { conn: null, promise: null };
