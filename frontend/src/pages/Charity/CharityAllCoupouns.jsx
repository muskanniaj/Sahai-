import React from 'react'
import DashboardHeader from '../../components/Charity/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Charity/Layout/DashboardSideBar'
/*import AllCoupons from "../../components/Charity/AllCoupons";*/

const CharityAllCoupouns = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={9} />
            </div>
           
          
          </div>
    </div>
  )
}

/*export default CharityAllCoupouns*/