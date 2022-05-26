import * as React from 'react';
import './style.css';
import { nopeResolver } from '@hookform/resolvers/nope';
import { useForm } from 'react-hook-form';
import * as Nope from 'nope-validator';

type FormInputs={
  email:string;
  password:string;
}

const schema=Nope.object().shape({
  email:Nope.string().required("email is required").email("email is required"),
  password:Nope.string().required("password is reuired")
})

export default function App() {
  const{register,formState,handleSubmit}=useForm<FormInputs>({
    resolver:nopeResolver(schema)
  })
  const { onChange, onBlur, name, ref } = register('email'); 

const handleChange=(e:any)=>{
console.log(e.target.value)
}
const onSubmit=(data:FormInputs)=>{
  console.log({email:data.email, password:data.password})
}
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
        <label className="label">Email:</label>
        <input type="text" placeholder="Email" {...register("email")}/>
        <p className="error">{formState.errors.email?.message}</p>
        <label className="label">Password:</label>
        <input type="password" placeholder="Password" {...register("password")}/>
        <p className="error">{formState.errors.password?.message}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
