import React from 'react'
import DashboardHeader from '../../components/Charity/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Charity/Layout/DashboardSideBar'
import DashboardMessages from "../../components/Charity/DashboardMessages";

const CharityInboxPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={8} />
      </div>
       <DashboardMessages />
    </div>
  </div>
  )
}

export default CharityInboxPage