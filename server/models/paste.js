import mongoose from "mongoose";

const pasteSchema = mongoose.Schema({
  idx: { type: String, required: true },
  paste: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: null,
  },
});

pasteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Pastes = mongoose.model("Pastes", pasteSchema);

export default Pastes;
