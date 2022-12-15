module.exports = (mongoose) => {
  const Simulacra = mongoose.model(
    'Simulacra',
    mongoose.Schema(
      {
        name: { type: String, unique: true },
        description: String,
        previewIMG: String,
        prototype: String,
        awaken: String,
        rank: String,
        weapon: { type: 'ObjectId', ref: 'Weapon' },
        advancement: [{ stars: String, effect: String }],
        voiceActors: [{ name: String, language: String }],
      },
      { timestamps: true }
    )
  );
  const Weapon = mongoose.model(
    'Weapon',
    mongoose.Schema(
      {
        owner: { type: 'ObjectId', ref: 'Simulacra' },
        nameWeapon: String,
        imgWeapon: String,
        resonance: String,
        element: String,
        shatter: Number,
        charge: Number,
        statRankUP: [String],
      },

      { timestamps: true }
    )
  );
  return { Simulacra, Weapon };
};
