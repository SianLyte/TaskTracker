import { StateSchema } from "@/core/providers/StoreProvider";

export const getTasksLoading = (state: StateSchema) => state.tasks.loading;