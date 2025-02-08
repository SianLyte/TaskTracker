import { StateSchema } from "@/core/providers/StoreProvider";

export const getDescriptionQuery = (state: StateSchema) => state.tasks.descriptionQuery;