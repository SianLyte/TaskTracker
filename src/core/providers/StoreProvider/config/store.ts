import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { useDispatch } from 'react-redux'
import { taskReducer } from '@/entities/Task'

export function createReduxStore (initialState?: StateSchema) {

  const rootReducers:ReducersMapObject<StateSchema> = {
    tasks: taskReducer
  }

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: true,
    preloadedState: initialState
  })
}

type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppDispatch = useDispatch<AppDispatch>;
