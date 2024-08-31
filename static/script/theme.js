document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light"; // Default to 'light' if no theme is set

  // Apply the saved theme class to the body
  document.body.classList.add(`bg-${savedTheme}`);

  // Set the initial button text
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  // Handle theme toggle
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("bg-dark")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.classList.remove(`bg-${currentTheme}`);
    document.body.classList.add(`bg-${newTheme}`);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
});
