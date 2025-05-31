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
export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
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
          Create Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg font-semibold">Create a new topic</h3>
            <Input
              placeholder="Topic Title"
              name="name"
              label="Name"
              labelPlacement="outside"
              isInvalid={!!formState?.errors.name}
              errorMessage={formState?.errors.name?.join(", ")}
            />

            <Textarea
              label="Description"
              name="description"
              labelPlacement="outside"
              placeholder="Describe your topic in detail"
              minRows={3}
              maxRows={6}
              isInvalid={!!formState?.errors.description}
              errorMessage={formState?.errors.description?.join(", ")}
            />
            {formState?.errors._form && (
              <div className="border border-red-400 bg-red-200 rounded p-2">
                {formState.errors._form.join(", ")}
              </div>
            )}
            <FormButton isLoading={isPending}>Create Topic</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
