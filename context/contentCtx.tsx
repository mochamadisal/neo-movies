import { createContext, useReducer, Dispatch, ReactElement, ReactNode } from 'react';

type ItemData = {
  id: string
  title: string
  year: number
  rating: number
  imageUrl: string
}

type State = {
  data: ItemData[],
  isError: boolean
}

type Action =
  | { type: 'SET_CONTENT_LIST'; payload: { data: ItemData[] } }
  | { type: 'SET_ERROR_CONTENT_LIST' }

const initialState: State = {
  data: [],
  isError: false
};

const ContentStore = createContext<{
  contentState: State, contentDispatch: Dispatch<Action>
}>({
  contentState: initialState,
  contentDispatch: () => null,
});

const { Provider } = ContentStore ;

interface ContentProviderProps {
  children: ReactNode
}

function ContentProvider({ children }: ContentProviderProps): ReactElement {
  const [contentState, contentDispatch] = useReducer(
    (currentState: State, { type, payload }: any) => {
      switch (type) {
        case 'SET_CONTENT_LIST':
          return {
            data: payload.data,
            isError: false
          };
        case 'SET_ERROR_CONTENT_LIST':
          return {
            ...currentState,
            isError: true
          };
        default:
          throw new Error();
      }
    },
    initialState,
  );

  return (
    <Provider value={{ contentState, contentDispatch }}>
      {children}
    </Provider>
  );
}

export { ContentStore, ContentProvider };