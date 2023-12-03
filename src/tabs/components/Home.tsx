import React, { useState, useEffect, useMemo } from "react";
import Dashboard from "../../Layouts/Dashboard";
function Home() {
  chrome;
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const boolData = useMemo(
    () => JSON.parse(localStorage.getItem("proxied")),
    [checked]
  );

  useEffect(() => {
    chrome.proxy.settings.get({ incognito: false }, (config) => {
      if (config.levelOfControl === "controlled_by_this_extension") {
        if (config.value && config.value.mode === "pac_script") {
          setChecked(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (checked) {
      const pacScript = `function FindProxyForURL(url, host) {
        if (isPlainHostName(host)) {
          return 'DIRECT';
        }
        return 'HTTPS px012702.pointtoserver.com:10798';
      }`;

      const config = {
        mode: "pac_script",
        pacScript: {
          data: pacScript,
        },
      };
      chrome.proxy.settings.set({ value: config }, () => {
        
        if (chrome.runtime.lastError) {
          console.error("Error setting proxy:", chrome.runtime.lastError);
        } else {
          console.log("Proxy set successfully");
          setLoading(false);
        }
      });
    }
  }, [checked]);

  const handleChange = () => {
    setLoading(true);
    if (!checked) {
      setTimeout(() => {
        setChecked(true);
      }, 2000);
    } else {
      setChecked(false);
    }
  };

  return (
    <Dashboard>
      <div className="h-full grid grid-rows-3">
        <div className="grid-cols-1">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <p className="text-white text-2xl">heading</p>
              <p className="text-white text-xl">description</p>
            </div>
            <div>image</div>
          </div>
        </div>
        <label
          htmlFor="toggle"
          className="flex items-center cursor-pointer relative"
        >
          <div className="relative">
            <input
              id="toggle"
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={handleChange}
              disabled={loading}
            />
            <div
              className={`bg-gray-600 w-14 h-8 rounded-full ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                checked ? "translate-x-full bg-green-500" : ""
              } ${loading ? "hidden" : ""}`}
            ></div>
            {loading && (
              <div className="absolute top-0 left-0 mt-1 ml-1 animate-spin rounded-full border-t-2 border-b-2 border-gray-900 h-6 w-6"></div>
            )}
          </div>
          <div className="ml-3 text-white font-medium">Toggle</div>
        </label>
        <div className="grid-cols-1">3</div>
      </div>
    </Dashboard>
  );
}

export default Home;
