import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CharityCreate from "../components/Charity/CharityCreate";

const CharityCreatePage = () => {
  const navigate = useNavigate();
  const { isDriver,driver } = useSelector((state) => state.driver);

  useEffect(() => {
    if(isDriver === true){
      navigate(`/charity/${driver._id}`);
    }
  }, [])
  return (
    <div>
        <CharityCreate />
    </div>
  )
}

export default CharityCreatePage