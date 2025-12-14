import bcrypt from "bcrypt";

export class UserModel {
  constructor(db) {
    this.db = db;
  }

  // Crear usuario
  async createUser(username, password, role = "cajero") {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    try {
      const result = await this.db.run(
        "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
        [username, password_hash, role]
      );
      return { id: result.lastID, username, role };
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        throw new Error("El usuario ya existe");
      }
      throw err;
    }
  }

  // Buscar usuario por username
  async findByUsername(username) {
    return await this.db.get("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
  }

  // Verificar contraseña
  async validatePassword(user, password) {
    return await bcrypt.compare(password, user.password_hash);
  }
}
