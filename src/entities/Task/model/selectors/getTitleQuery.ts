import { StateSchema } from "@/core/providers/StoreProvider";

export const getTitleQuery = (state: StateSchema) => state.tasks.titleQuery;