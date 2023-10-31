import React from 'react'
import DashboardHeader from '../../components/Charity/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Charity/Layout/DashboardSideBar'
import AllDrives from "../../components/Charity/AllDrives";

const CharityAllDrives = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={3} />
            </div>
            <div className="w-full justify-center flex">
                <AllDrives />
            </div>
          </div>
    </div>
  )
}

export default CharityAllDrives