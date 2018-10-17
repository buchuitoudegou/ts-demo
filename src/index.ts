import app from './app';
import { port } from './config';

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});