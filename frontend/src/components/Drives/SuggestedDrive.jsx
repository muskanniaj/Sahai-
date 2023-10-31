import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { driveData } from "../../static/data";
import styles from "../../styles/styles";
import DriveCard from "../Route/DriveCard/DriveCard";

const SuggestedDrive = ({ data }) => {
  const {allDrives} = useSelector((state) => state.drives);
  const [driveData,setDriveData] = useState();

  useEffect(() => {
    const d =
    allDrives && allDrives.filter((i) => i.category === data.category);
    setDriveData(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Drive
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             {
                driveData && driveData.map((i,index) => (
                    <DriveCard data={i} key={index} />
                ))
             }
      </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedDrive;
