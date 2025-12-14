import { initDB } from './src/database.js';

(async () => {
    try {
        const db = await initDB();
        await db.run("DELETE FROM users WHERE username = 'admin'");
        console.log("User 'admin' deleted. You can now register again.");
    } catch (error) {
        console.error("Error deleting user:", error);
    }
})();
