import { Chat } from "./components/Chat";

function App() {
  return (
    <div
      className="min-h-full bg-fixed"
      style={{ backgroundImage: "url(background.webp)" }}
    >
      <div className="flex justify-center h-screen">
        <div className="max-w-5xl w-full  h-full">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
