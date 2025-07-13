import React from "react";

const themes = [
  { name: "Light", value: "light", colors: ["#ffffff", "#111111", "#3b82f6"] },
  { name: "Dark", value: "dark", colors: ["#111111", "#f5f5f5", "#6366f1"] },
  { name: "Retro", value: "retro", colors: ["#fdf6e3", "#657b83", "#b58900"] },
  { name: "Forest", value: "forest", colors: ["#e6f2e6", "#1b4332", "#40916c"] },
  { name: "Pastel", value: "pastel", colors: ["#fef6fb", "#444444", "#f3b1c9"] },
  { name: "Halloween", value: "halloween", colors: ["#1b1b1b", "#fefefe", "#f97316"] },
  { name: "Dracula", value: "dracula", colors: ["#282a36", "#f8f8f2", "#bd93f9"] },
  { name: "Luxury", value: "luxury", colors: ["#1f2937", "#d1d5db", "#facc15"] },
  { name: "Aqua", value: "aqua", colors: ["#e0f7fa", "#004d40", "#00acc1"] },
  { name: "Sunset", value: "sunset", colors: ["#fff7f0", "#5c2a0c", "#f97316"] },
  { name: "Night", value: "night", colors: ["#0f172a", "#f1f5f9", "#3b82f6"] },
];
const SettingsPage = ({ switchTheme }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Choose a Theme</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => switchTheme(theme.value)}
            className="p-4 rounded border border-gray-300 hover:scale-105 transition"
          >
            <div className="flex space-x-1 mb-2">
              {theme.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <span className="text-sm">{theme.name}</span>
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-center mb-4">Preview</h2>

      {/* ✅ CENTERED CONTAINER */}
      <div className="flex items-center justify-center min-h-[40vh]">
        <div
          className="w-full max-w-md p-6 rounded-lg shadow border"
          style={{
            background: "var(--color-base)",
            color: "var(--color-text)",
            borderColor: "var(--color-primary)",
          }}
        >
          {/* ✅ Preview chat card */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-base)] font-bold">
                J
              </div>
              <div className="ml-3">
                <p className="font-semibold">Kp</p>
                <p className="text-xs opacity-70">Online</p>
              </div>
            </div>
            <div className="bg-[var(--color-base)] border border-[var(--color-primary)] rounded-lg p-3 mb-2 shadow">
              <p>Hey! How’s it going?</p>
              <span className="text-xs opacity-50">12:00 PM</span>
            </div>
            <div className="bg-[var(--color-primary)] text-[var(--color-base)] rounded-lg p-3 mb-2 self-end shadow">
              <p>I’m doing great! Just working on some new features.</p>
              <span className="text-xs opacity-50">12:01 PM</span>
            </div>
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              className="flex-1 px-4 py-2 bg-transparent"
              placeholder="This is a preview"
              disabled
            />
            <button
              className="px-4 py-2"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-base)",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;