import makeStore from './src/store';
import startServer from './src/server.js';
import candidates from './entries';

export const store = makeStore();
startServer(store);

console.log(`this is state in index.js line 8: ${candidates}`);

store.dispatch({
  type: 'SET_ENTRIES',
    entries: ['hello', 'tga', 'the blacker the berry']
});
store.dispatch({ type: 'NEXT' });
