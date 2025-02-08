import { StateSchema } from "@/core/providers/StoreProvider";

export const getTaskCardDeleteLoadingId = (state: StateSchema) => state.tasks.deleteLoadingId;