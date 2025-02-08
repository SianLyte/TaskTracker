import { StateSchema } from "@/core/providers/StoreProvider";

export const getTaskCardLoadingId = (state: StateSchema) => state.tasks.loadingId;