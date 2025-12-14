import { initDB } from './src/database.js';

(async () => {
    try {
        const db = await initDB();
        const users = await db.all("SELECT id, username, role, password_hash FROM users");
        console.log("Users found:", users);
    } catch (error) {
        console.error("Error reading users:", error);
    }
})();
