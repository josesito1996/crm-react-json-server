import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(5, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("Campo Obligatorio"),
    empresa: Yup.string().required("Campo Obligatorio"),
    email: Yup.string().email("Email no valido").required("Campo Obligatorio"),
    telefono: Yup.number()
      .integer("Numero no valido")
      .positive("No puede ser negativo")
      .typeError("Numero no valido"),
  });

  const handleSubmit = async (values) => {
    try {
      let respuesta;
      const url = import.meta.env.VITE_API_URL;
      if (cliente.id) {
        console.log("Editando...");
        respuesta = await fetch(`${url}/${cliente.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        console.log("Nuevo Registro");
        respuesta = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }
      //const resultado = respuesta.json();
      await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-center text-xl uppercase">
        {cliente.nombre ? "Editar" : "Agregar"} Cliente
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente.notas ? cliente.notas : "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          // await es para que espere hasta que se cumpla el metodo y despues resetee el form.
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  name="nombre"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  placeholder="Nombre del cliente"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  name="empresa"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  placeholder="Nombre de la empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  placeholder="alguien@example.com"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  name="telefono"
                  className="mt-2 block w-full p-3 bg-gray-100"
                  placeholder="Telefono del cliente"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas del cliente:
                </label>
                <Field
                  id="notas"
                  as="textarea"
                  type="text"
                  name="notas"
                  className="mt-2 block w-full p-3 bg-gray-100 h-40"
                  placeholder="Notas del cliente"
                />
              </div>
              <input
                type="submit"
                value={(cliente.nombre ? "Editar" : "Agregar") + " Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
