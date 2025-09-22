"use client";

import { useEffect, useState } from "react";

type WelcomeProps = {
  name: string | undefined;
};

export const Welcome: React.FC<WelcomeProps> = ({ name }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setText("صبح بخیر ☀️");
    } else if (hour >= 12 && hour < 17) {
      setText("ظهر بخیر 🌤️");
    } else if (hour >= 17 && hour < 21) {
      setText("عصر بخیر 🌇");
    } else {
      setText("شب بخیر 🌙");
    }
  }, []);

  return (
    <div className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white shadow-lg">
      <h2 className="text-base xs:text-xl lg:text-2xl font-bold">
        {text}، {name} عزیز ✨
      </h2>
      <p className="mt-2 text-xs xs:text-sm opacity-90">امیدوارم {text.split(" ")[0]} خوبی داشته باشی 💜</p>
    </div>
  );
};
