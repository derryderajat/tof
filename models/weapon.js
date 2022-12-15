module.exports = (mongoose) => {
  const Weapon = mongoose.model(
    'Weapon',
    mongoose.Schema(
      {
        name: String,
        owner: { id: mongoose.Schema.Types.ObjectId, ref: 'Simulacra' },
        img: String,
        resonance: String,
        element: String,
        shatter: Number,
        charge: Number,
        statRankUP: [String],
        abilities: [
          {
            type: String,
            details: [{ name: String, combos: [String], description: String }],
          },
        ],
      },

      { timestamps: true }
    )
  );

  return Weapon;
};
