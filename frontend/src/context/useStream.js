import { createContext, useContext } from 'react';

const StreamContext = createContext();
export const useStream = () => useContext(StreamContext);

export default StreamContext;
