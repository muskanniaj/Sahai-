import React from 'react'
import DashboardHeader from '../../components/Charity/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Charity/Layout/DashboardSideBar'
import CreateDrive from "../../components/Charity/CreateDrive";

const CharityCreateDrive = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <CreateDrive />
            </div>
          </div>
    </div>
  )
}

export default CharityCreateDrive