import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import DriveDetails from '../components/Drives/DriveDetails'
import SuggestedDrive from '../components/Drives/SuggestedDrive'
import { useSelector } from 'react-redux'

const DriveDetailsPage = () => {
  const { allDrives } = useSelector((state) => state.drives)
  //const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [searchParams] = useSearchParams()
  //const eventData = searchParams.get("isEvent");

  // useEffect(() => {
  //   if (eventData !== null) {
  //     const data = allEvents && allEvents.find((i) => i._id === id);
  //     setData(data);
  //   } else {
  //     const data = allDrives && allDrives.find((i) => i._id === id);
  //     setData(data);
  //   }
  // }, [allDrives, allEvents]);

  useEffect(() => {
    if (true) {
      const data = allDrives && allDrives.find((i) => i._id === id)
      setData(data)
    }
  }, [allDrives])

  return (
    <div>
      <Header />
      <DriveDetails data={data} />
      {
        // !eventData && (
        <>{data && <SuggestedDrive data={data} />}</>
        // )
      }
      <Footer />
    </div>
  )
}

export default DriveDetailsPage
