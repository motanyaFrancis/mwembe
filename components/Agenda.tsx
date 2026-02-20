const agendaItems = [
  {
    title: "Economic Growth",
    description: "Creating jobs and empowering local businesses.",
  },
  {
    title: "Education for All",
    description: "Accessible, high-quality education for every child.",
  },
  {
    title: "Healthcare & Wellbeing",
    description: "Affordable healthcare and stronger communities.",
  },
];

export default function Agenda() {
  return (
    <section className="py-20 px-6 bg-beige">
      <h3 className="text-3xl font-bold text-center mb-12 text-dark">
        Our Agenda
      </h3>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {agendaItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h4 className="text-xl font-semibold text-primary-900 mb-3">
              {item.title}
            </h4>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
