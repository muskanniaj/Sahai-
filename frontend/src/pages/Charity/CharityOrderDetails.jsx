import React from 'react'
import DashboardHeader from '../../components/Charity/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import OrderDetails from "../../components/Charity/OrderDetails";

const CharityOrderDetails = () => {
  return (
    <div>
         <DashboardHeader />
         <OrderDetails />
          <Footer />
    </div>
  )
}

export default CharityOrderDetails