import React from 'react'
import styles from '../../styles/styles'
import CharityInfo from "../../components/Charity/CharityInfo";
import CharityProfileData from "../../components/Charity/CharityProfileData";

const CharityHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
         <div className="w-full flex py-10 justify-between">
          <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
            <CharityInfo isOwner={true} />
          </div>
          <div className="w-[72%] rounded-[4px]">
            <CharityProfileData isOwner={true} />
          </div>
         </div>
    </div>
  )
}

export default CharityHomePage