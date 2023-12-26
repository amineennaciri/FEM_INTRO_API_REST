import * as dotenv from 'dotenv';
dotenv.config();//this is what looks at the dotenv file, gets evers single environment variable in there, loads them up into your environmnet and now you can access them on process.env we do this in index.ts because this is the entry point to our server, so we want these envs to load up immediately so the rest of the app can use them.

import app from './server';
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});