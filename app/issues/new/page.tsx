"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

interface issueForm {
  title: string;
  description: string;
}

export default function Home() {
  const { handleSubmit, register, control } = useForm<issueForm>();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const response = await axios.post("/api/issues", data);
        console.log(response);
      })}
      className="max-w-xl p-5 space-y-4"
    >
      <input
        {...register("title")}
        className="border border-gray-300 rounded-md py-1 px-4 w-full"
        placeholder="Title"
        type="text"
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <button className="bg-violet-500 px-8 py-2 rounded-md text-white">
        Submit
      </button>
    </form>
  );
}
