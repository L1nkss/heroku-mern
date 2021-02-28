const {
  Schema, model, Types, mongoose, NextFunction, Document,
} = require("mongoose");
const bcrypt = require("bcrypt");

export type TUserFavoriteFilms = {
  id: number,
  backdropPath: string,
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  favoriteFilms: TUserFavoriteFilms[]
}

const UserSchema = new Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  favoriteFilms: [],
});

// Перед обновлением записи, хешируем пароль
UserSchema.pre("findOneAndUpdate", async function (this: any, next: any) {
  try {
    if (this._update.password) {
      const hashed = await bcrypt.hash(this._update.password, 10);
      this._update.password = hashed;
    }
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.isCorrectPassword = function (password: any, callback: any) {
  bcrypt.compare(password, this.password, (err: any, same: boolean) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = model("User", UserSchema);
