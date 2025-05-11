const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

// Оголошуємо об'єкт для збереження значень
let formData = {
  email: "",
  message: "",
};

// ▪️ Відновлення даних з localStorage при завантаженні
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (parsedData.email) {
      form.elements.email.value = parsedData.email;
    }
    if (parsedData.message) {
      form.elements.message.value = parsedData.message;
    }
  } catch (error) {
    console.error("❗ Помилка при розпарсюванні:", error);
  }
}

// ▪️ Слухач події input
form.addEventListener("input", (event) => {
  const { name, value } = event.target;
  formData[name] = value.trimStart(); // уникаємо пробілів на початку
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// ▪️ Слухач події submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert("Fill please all fields");
    return;
  }

  console.log("Submitted data:", formData);

  // Очищення
  formData = { email: "", message: "" };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});