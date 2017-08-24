module.exports = () => {
  const colors = ["#8B88FF", "#0090D8", "#FF9C00", "#7BB31A"];
  return colors[Math.floor(Math.random() * 4)];
};