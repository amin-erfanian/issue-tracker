"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/schema/issueSchema";

import { z } from "zod";
import Spinner from "@/app/components/Spinner";
import ErrorMessage from "@/app/components/ErrorMessage";

type issueForm = z.infer<typeof createIssueSchema>;

export default function Home() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<issueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An error has occurred.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <p className="rounded-md text-red-500 bg-red-100 mb-4 py-2 px-4 text-sm">
          {error}
        </p>
      )}
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <input
            {...register("title")}
            className="border border-gray-300 rounded-md py-1 px-4 w-full"
            placeholder="Title"
            type="text"
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <button
          disabled={isSubmitting}
          className=" flex items-center bg-violet-500 px-8 py-2 rounded-md text-white space-x-4"
        >
          <p> Submit </p>
          {isSubmitting && <Spinner />}
        </button>
      </form>
    </div>
  );
}
