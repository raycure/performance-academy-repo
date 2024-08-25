import React from "react";

const Banner = () => {
  const bannerData = {
    title: "MOVE THE WAY YOU WANT TO",
    features: [
      {
        icon: "□",
        description:
          "Strength, cardio, yoga, martial arts, cycling, wellness + more. Enjoy 2500+ workouts at your fingertips.",
      },
      {
        icon: "🕴",
        description: "Choose workouts with or without equipment.",
      },
      {
        icon: "○",
        description:
          "Workouts for all fitness levels that are scientifically designed to get results",
      },
    ],
  };

  return (
    <div className="banner bg-dark text-light">
      <div className="bannerContent">
        <h2 className="fs-primary-heading text-center">{bannerData.title}</h2>
        <div className="feature-grid">
          {bannerData.features.map((feature, index) => (
            <div key={index} className="feature-item text-center">
              <div className="feature-icon">{feature.icon}</div>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
