export const getCourseGradient = (name: string) => {
  const gradients = [
    "from-indigo-500 to-violet-900", // Indigo/Violet
    "from-rose-500 to-pink-900",     // Rosa
    "from-emerald-500 to-teal-900",  // Verde/Esmeralda
    "from-orange-500 to-red-900",    // Laranja/Vermelho
    "from-amber-400 to-orange-700",  // Amarelo/Âmbar
    "from-sky-500 to-indigo-900",    // Azul Sky
    "from-fuchsia-500 to-purple-900",// Fuchsia
    "from-cyan-500 to-blue-800",     // Ciano
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % gradients.length;
  return `bg-linear-to-br ${gradients[index]}`;
};