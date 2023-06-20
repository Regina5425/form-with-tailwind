import React, { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { IFormFields, IOption } from "./App.interface";
import "./App.css";

const options: IOption[] = [
  { value: "russia", label: "Russia" },
  { value: "china", label: "China" },
  { value: "korea", label: "South Korea" },
];

const getValue = (value: string) => {
  return value ? options.find((option) => option.value === value) : "";
};

const App: React.FC = (): JSX.Element => {
  const initialData: IFormFields = {
    name: "",
    age: 0,
    country: "",
    gender: "male",
    email: "",
    phone: "",
    comment: "",
  };

  const [formData, setFormData] = useState<IFormFields>(initialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IFormFields>({
    mode: "onChange",
  });

  const submitForm: SubmitHandler<IFormFields> = (data) => {
    console.log(data);
    reset();
    setFormData(data);
  };

  return (
    <div className='flex flex-col gap-5 m-10'>
      <h1 className='text-xl font-bold align-middle'>
        React-hook-form with Tailwind CSS
      </h1>
      <div className='flex gap-20'>
        <form onSubmit={handleSubmit(submitForm)} className='form'>
          <div className='flex-input'>
            <label htmlFor='name'>Name</label>
            <input
              {...register("name", {
                required: { value: true, message: "Name is required" },
              })}
              id='name'
              type='text'
              placeholder='Your name'
              className='input'
            />
            {errors.name && <p className='error'>{errors.name.message}</p>}
          </div>
          <div className='flex-input'>
            <label htmlFor='age'>Age</label>
            <input
              {...register("age", {
                required: { value: true, message: "Age is required" },
                max: { value: 60, message: "Max age is less than 60" },
              })}
              id='age'
              type='number'
              placeholder='Your age'
              className='input'
            />
            {errors.age && <p className='error'>{errors.age.message}</p>}
          </div>
          <div className='flex-input'>
            <label htmlFor='country'>Country</label>
            <Controller
              name='country'
              control={control}
              rules={{
                required: { value: true, message: "Field is required" },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Select
                    id='country'
                    placeholder='Your country'
                    options={options}
                    value={getValue(value)}
                    onChange={(newValue) =>
                      onChange((newValue as IOption).value)
                    }
                    classNamePrefix='custom-select'
                  />
                  {error && <p className='error'>{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className='flex-input'>
            <label>Gender</label>
            <div>
              <input
                {...register("gender")}
                id='male'
                type='radio'
                value='male'
                checked
                className='mr-1'
              />
              <label htmlFor='male'>Man</label>
            </div>
            <div>
              <input
                {...register("gender")}
                id='female'
                type='radio'
                value='female'
                className='mr-1'
              />
              <label htmlFor='female'>Woman</label>
            </div>
          </div>
          <div className='flex-input'>
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
              className='input'
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>
          <div className='flex-input'>
            <label htmlFor='phone'>Phone</label>
            <input
              {...register("phone", {
                required: { value: true, message: "Phone is required" },
                maxLength: {
                  value: 12,
                  message: "Max 12 numbers",
                },
                pattern: {
                  value:
                    /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/gm,
                  message: "Please enter valid phone number",
                },
              })}
              id='phone'
              type='tel'
              placeholder='+7 (999) 999-99-99'
              className='input'
            />
            {errors.phone && <p className='error'>{errors.phone.message}</p>}
          </div>
          <div className='flex-input'>
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
              className='input resize-none h-28'
            />
            {errors.comment && (
              <p className='error'>{errors.comment.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='bg-blue-600 border-none rounded-md text-white p-2 hover:bg-blue-400'
          >
            Send
          </button>
        </form>
        {formData.name && (
          <div className='border border-blue-600 rounded-md p-2'>
            <h2 className='font-bold text-xl'>Your data is:</h2>
            <p>Your name: {formData.name}</p>
            <p>Your age: {formData.age}</p>
            <p>Your country: {formData.country}</p>
            <p>Your gender: {formData.gender}</p>
            <p>Your email: {formData.email}</p>
            <p>Your phone: {formData.phone}</p>
            <p>Your comment: {formData.comment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
