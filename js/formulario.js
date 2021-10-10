const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const textarea = document.getElementById("mensaje");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  provincia: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  localidad: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  mensaje: /^[\s\S]{1,250}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
  nombre: false,
  apellido: false,
  provincia: false,
  localidad: false,
  email: false,
  mensaje: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "provincia":
      validarCampo(expresiones.provincia, e.target, "provincia");
      break;
    case "localidad":
      validarCampo(expresiones.localidad, e.target, "localidad");
      break;
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "mensaje":
      validarCampo(expresiones.mensaje, e.target, "mensaje");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-correcto");
    document
      .querySelector(`#grupo-${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo-${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo-${campo} .formulario-input-error`)
      .classList.remove("formulario-input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo-${campo}`)
      .classList.add("formulario-grupo-incorrecto");
    document
      .getElementById(`grupo-${campo}`)
      .classList.remove("formulario-grupo-correcto");
    document
      .querySelector(`#grupo-${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo-${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo-${campo} .formulario-input-error`)
      .classList.add("formulario-input-error-activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

textarea.addEventListener("keyup", validarFormulario);
textarea.addEventListener("blur", validarFormulario);

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    campos.apellido &&
    campos.nombre &&
    campos.email &&
    campos.provincia &&
    campos.localidad &&
    campos.mensaje
  ) {
    formulario.reset();

    document
      .getElementById("formulario-mensaje-exito")
      .classList.add("formulario-mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("formulario-mensaje-exito")
        .classList.remove("formulario-mensaje-exito-activo");
    }, 3000);

    document.querySelectorAll(".formulario-grupo-correcto").forEach((icono) => {
      icono.classList.remove("formulario-grupo-correcto");
    });
    swal({
      icon: "success",
      text: "Formulario enviado correctamente",
    });
    campos.apellido = false;
    campos.nombre = false;
    campos.provincia = false;
    campos.localidad = false;
    campos.email = false;
    campos.mensaje = false;
  } else {
    document
      .getElementById("formulario-mensaje")
      .classList.add("formulario-mensaje-activo");

    setTimeout(() => {
      document
        .getElementById("formulario-mensaje")
        .classList.remove("formulario-mensaje-activo");
    }, 3000);
    swal({
      icon: "error",
      text: "Revise que todos los campos se encuentren completados correctamente",
    });
  }
});
