import Navbar from "../components/Navbar";


const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0d1b2a] text-[#f1f5f9] flex flex-col items-center">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#f1c40f] via-[#e67e22] to-[#e74c3c] drop-shadow-lg">
          Make Someone Smile Today
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-center max-w-2xl opacity-90">
          Welcome! Here you can easily send warm, friendly cards and messages to your friends and loved ones. Brighten their day and let them know you care – it only takes a moment!<br />
          <span className="inline-block mt-2 text-3xl">😊💖🌟</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl flex flex-col items-center transition-transform hover:scale-105 hover:bg-white/20">
            <span className="text-4xl mb-2">💌</span>
            <h2 className="text-2xl font-bold mb-2">Send a Friendly Card</h2>
            <p className="mb-4 text-center opacity-80">Pick a cheerful design and send a kind card to make someone feel special today.</p>
            <button className="btn btn-primary w-full">Send a Card</button>
          </div>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl flex flex-col items-center transition-transform hover:scale-105 hover:bg-white/20">
            <span className="text-4xl mb-2">✨</span>
            <h2 className="text-2xl font-bold mb-2">Share a Compliment</h2>
            <p className="mb-4 text-center opacity-80">Let your friends know what you appreciate about them with a warm compliment or a fun message.</p>
            <button className="btn btn-secondary w-full">Send Compliment</button>
          </div>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl flex flex-col items-center transition-transform hover:scale-105 hover:bg-white/20">
            <span className="text-4xl mb-2">📸</span>
            <h2 className="text-2xl font-bold mb-2">Share a Memory</h2>
            <p className="mb-4 text-center opacity-80">Remind someone of a happy moment you shared together, or send a favorite photo.</p>
            <button className="btn btn-accent w-full">Share Memory</button>
          </div>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl flex flex-col items-center transition-transform hover:scale-105 hover:bg-white/20">
            <span className="text-4xl mb-2">🎁</span>
            <h2 className="text-2xl font-bold mb-2">Send a Surprise</h2>
            <p className="mb-4 text-center opacity-80">Make someone’s day with a thoughtful surprise or a random act of kindness.</p>
            <button className="btn btn-info w-full">Send Surprise</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
