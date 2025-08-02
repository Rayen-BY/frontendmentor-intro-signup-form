const form = document.getElementById("signupForm");
const inputs = form.querySelectorAll("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let formIsValid = true;

  inputs.forEach((input) => {
    const value = input.value.trim();

    if (value === "") {
      showError(input, `${input.placeholder} cannot be empty`);
      formIsValid = false;
      return;
    }

    if (input.id === "email" && !validateEmail(value)) {
      showError(input, "Looks like this is not an email");
      input.placeholder = "sdqsdqsd";
      formIsValid = false;
      return;
    }

    if (input.id === "password" && !validatePassword(value)) {
      showError(
        input,
        "Password must contain at least one uppercase letter, one digit, and no spaces"
      );
      formIsValid = false;
      return;
    }

    clearError(input);
  });

  if (formIsValid) {
    // Formulaire valide, tu peux l'envoyer ici ou afficher un message de succès
    // form.submit();
    alert("Form submitted successfully !");
  }
});

// Gestion de la touche Enter dans les inputs
inputs.forEach((input, index) => {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = input.value.trim();

      if (value === "") {
        showError(input, `${input.placeholder} cannot be empty`);
        return;
      }

      if (input.id === "email" && !validateEmail(value)) {
        showError(input, "Looks like this is not an email");
        input.value = ""; // vide le champ
        input.placeholder = "email@example/com";
        return;
      }

      if (input.id === "password" && !validatePassword(value)) {
        showError(
          input,
          "Password must contain at least one uppercase letter, one digit, and no spaces"
        );
        input.focus();
        return;
      }

      clearError(input);

      // Passer au champ suivant si possible
      if (index + 1 < inputs.length) {
        inputs[index + 1].focus();
      } else {
        // Dernier input, tu peux soumettre le formulaire ici si tu veux
        // form.submit();
      }
    }
  });
});

function showError(input, message) {
  input.classList.add("error");
  const errorElem = input.nextElementSibling;
  if (errorElem) {
    errorElem.textContent = message;
  }
}

function clearError(input) {
  input.classList.remove("error");
  const errorElem = input.nextElementSibling;
  if (errorElem) {
    errorElem.textContent = "";
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*[A-Z])(?=.*\d)[^\s]+$/;
  return re.test(password);
}
