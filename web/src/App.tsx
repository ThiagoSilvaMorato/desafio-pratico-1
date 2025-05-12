import { Toaster } from "react-hot-toast";
import GuardRoute from "./GuardRoute";

function App() {
  return (
    <>
      <GuardRoute />
      <Toaster position='bottom-right' />
    </>
  );
}

export default App;
