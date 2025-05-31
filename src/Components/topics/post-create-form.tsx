"use client";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useActionState, startTransition } from "react";

import * as actions from "@/actions";
import FormButton from "@/Components/common/form-button";
export default function PostCreateForm({ slug }: { slug: string }) {
  const [formState, action, isPending] = useActionState(actions.createPost.bind(null, slug), {
    errors: {},
  });
  // for create a new topic
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button
          color="primary"
          variant="bordered"
          className="w-full text-center font-semibold text-purple-600 hover:bg-purple-100"
        >
          Create Post
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-semibold">Create a new Post</h3>
            <Input
              placeholder="Topic Title"
              name="title"
              label="Title"
              labelPlacement="outside"
              isInvalid={!!formState?.errors.title}
              errorMessage={formState?.errors.title?.join(", ")}
            />

            <Textarea
              label="Content"
              name="content"
              labelPlacement="outside"
              placeholder="Describe your Content in detail"
              minRows={3}
              maxRows={6}
              isInvalid={!!formState?.errors.content}
              errorMessage={formState?.errors.content?.join(", ")}
            />
            {formState?.errors._form && (
              <div className="border border-red-400 bg-red-200 rounded p-2">
                {formState.errors._form.join(", ")}
              </div>
            )}
            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
