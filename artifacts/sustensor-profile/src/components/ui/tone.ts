import { createContext, useContext } from 'react';

/** Whether content sits on a light surface or on dark ink. Set by `Section`, read by text primitives. */
export type Tone = 'light' | 'inverse';

export const ToneContext = createContext<Tone>('light');

export const useTone = () => useContext(ToneContext);
