import { StateSchema } from "@/core/providers/StoreProvider";

export const getTasks = (state: StateSchema) => state.tasks.tasks;