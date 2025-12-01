import { createContext, useContext } from 'react';

const StreamVideoContext = createContext();

export const useStreamVideo = () => useContext(StreamVideoContext);

export default StreamVideoContext;
