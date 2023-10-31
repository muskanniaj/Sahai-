import React from "react";
import Footer from "../../components/Layout/Footer";
import CharitySettings from "../../components/Charity/CharitySettings";
import DashboardHeader from "../../components/Charity/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Charity/Layout/DashboardSideBar";

const CharitySettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
        <CharitySettings />
      </div>
    </div>
  );
};

export default CharitySettingsPage;
