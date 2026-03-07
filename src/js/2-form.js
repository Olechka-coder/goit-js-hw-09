
const formData = {
  email: "",
  message: ""
};


const STORAGE_KEY = 'feedback-form-state';


const form = document.querySelector('.feedback-form');


function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function loadFromLocalStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";

   
      form.querySelector('input[name="email"]').value = formData.email;
      form.querySelector('textarea[name="message"]').value = formData.message;
    } catch (error) {
      console.error('Помилка при завантаженні даних з localStorage:', error);
    }
  }
}


function clearForm() {
  formData.email = "";
  formData.message = "";
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}


form.addEventListener('input', (event) => {
  const { name, value } = event.target;
  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    saveToLocalStorage();
  }
});


form.addEventListener('submit', (event) => {
  event.preventDefault();

 
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  
  console.log(formData);
  clearForm();
});


document.addEventListener('DOMContentLoaded', loadFromLocalStorage);