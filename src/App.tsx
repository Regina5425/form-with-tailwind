import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormFields } from "./App.interface";

const App: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormFields>({
    mode: "onChange",
  });

  const submitForm: SubmitHandler<IFormFields> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className='flex flex-col gap-5 m-10'>
      <h1 className='text-xl font-bold align-middle'>
        React-hook-form with Tailwind CSS
      </h1>
      <form
        onSubmit={handleSubmit(submitForm)}
        className='flex flex-col rounded-lg border border-blue-500 p-3 w-1/3 items-start gap-4'
      >
        <div className='flex flex-col gap-1'>
          <label htmlFor='name'>Name</label>
          <input
            {...register("name", {
              required: { value: true, message: "Name is required" },
            })}
            id='name'
            type='text'
            placeholder='Your name'
            className='text-zinc-950'
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='age'>Age</label>
          <input
            {...register("age", {
              required: { value: true, message: "Age is required" },
              max: { value: 60, message: "Max age is less than 60" },
            })}
            id='age'
            type='number'
            placeholder='Your age'
            className='text-zinc-950'
          />
          {errors.age && <p className='text-red-500'>{errors.age.message}</p>}
        </div>
        <div className='flex flex-col gap-1'>
          <label>Gender</label>
          <div>
            <input
              {...register("gender")}
              id='male'
              type='radio'
              value='male'
              checked
            />
            <label htmlFor='male'>Man</label>
            <input
              {...register("gender")}
              id='gender'
              type='radio'
              value='female'
            />
            <label htmlFor='female'>Woman</label>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email</label>
          <input
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
                message: "Please enter valid email",
              },
            })}
            id='email'
            type='email'
            placeholder='Your email'
            className='text-zinc-950'
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='phone'>Phone</label>
          <input
            {...register("phone", {
              required: { value: true, message: "Phone is required" },
              maxLength: {
                value: 12,
                message: "Max 12 numbers",
              },
              pattern: {
                value: /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/gm,
                message: "Please enter valid phone number",
              },
            })}
            id='phone'
            type='tel'
            placeholder='+7 (999) 999-99-99'
            className='text-zinc-950'
          />
          {errors.phone && (
            <p className='text-red-500'>{errors.phone.message}</p>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='comment'>Comment</label>
          <textarea
            {...register("comment", {
              required: { value: true, message: "Please leave a comment" },
              maxLength: {
                value: 200,
                message: "Limit of 200 symbols is exceeded",
              },
            })}
            id='comment'
            placeholder='Start typing here...'
            className='text-zinc-950 resize-none'
          />
          {errors.comment && (
            <p className='text-red-500'>{errors.comment.message}</p>
          )}
        </div>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default App;
