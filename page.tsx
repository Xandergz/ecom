"use client";
import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from'yup'
import { filterFormikErrors } from "@/app/utils/formikHelpers";

const validationSchema = yup.object().shape({
 Nombre: yup.string().required("Nombre es requerido!"),
 Correoelectronico: yup.string().required("Correo electronico invalido!"),
 Contraseña: yup.string().min(8, 'Contraseña debe ser minimo 8 caracteres')
.required('Contraseña es requerida!')
})
export default function SignUp() {
    const {values, handleChange, handleBlur, handleSubmit, isSubmitting,
errors, 
touched,
} =useFormik({
    initialValues: {Nombre: '', Correoelectronico: '', Contraseña: ''},
    validationSchema,
 onSubmit: async (values, action) => {
    action.setSubmitting(true)
    await fetch("/api/users", {
     method:"POST",
     body: JSON.stringify(values),
 }).then(async (res) => {
  if (res.ok) {
    const result= await res.json();
    console.log(result);
  }
  action.setSubmitting(false)
 });
},
});

    const formErrors: string[] = filterFormikErrors(errors, touched, values);
    
    const {Correoelectronico, Nombre, Contraseña }= values

  return (
    <AuthFormContainer title="Crear cuenta nueva" onSubmit={handleSubmit}>
      <Input name="Nombre" label="Nombre" onBlur={handleBlur}onChange={handleChange} value={Nombre} />
      <Input name="Correoelectronico" label="Correoelectronico" onBlur={handleBlur}onChange={handleChange}value={Correoelectronico} />
      <Input name="Contraseña" label="Contraseña" type="password" onBlur={handleBlur}onChange={handleChange}value={Contraseña}/>
      <Button disabled={isSubmitting} type="submit" className="w-full">
        Registrarse
      </Button>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}