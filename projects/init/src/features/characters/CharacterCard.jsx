function CharacterCard({ name, race, image }) {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <img src={image} alt={name} className="w-32 h-32 object-cover" />
      <h3 className="text-xl font-bold">{name}</h3>
      <p>{race}</p>
    </div>
  )
}

export default CharacterCard
