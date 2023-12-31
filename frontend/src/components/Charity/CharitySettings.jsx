import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadDriver } from "../../redux/actions/donor";
import { toast } from "react-toastify";

const CharitySettings = () => {
  const { driver } = useSelector((state) => state.driver);
  const [avatar,setAvatar] = useState();
  const [name,setName] = useState(driver && driver.name);
  const [description,setDescription] = useState(driver && driver.description ? driver.description : "");
  const [address,setAddress] = useState(driver && driver.address);
  const [phoneNumber,setPhoneNumber] = useState(driver && driver.phoneNumber);
  const [zipCode,setZipcode] = useState(driver && driver.zipCode);


  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    
    await axios.put(`${server}/charity/update-charity-avatar`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }).then((res) => {
        dispatch(loadDriver());
        toast.success("Avatar updated successfully!")
    }).catch((error) => {
        toast.error(error.response.data.message);
    })

  };

  const updateHandler = async (e) => {
    e.preventDefault();
    
    await axios.put(`${server}/charity/update-driver-info`, {
        name,
        address,
        zipCode,
        phoneNumber,
        description,
    }, {withCredentials: true}).then((res) => {
        toast.success("Charity info updated succesfully!");
        dispatch(loadDriver());
    }).catch((error)=> {
        toast.error(error.response.data.message);
    })
  };



  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${backend_url}/${driver.avatar}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* charity info */}
        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Charity Name</label>
            </div>
            <input
              type="name"
              placeholder={`${driver.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Charity description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                driver?.description
                  ? driver.description
                  : "Enter your charity description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Charity Address</label>
            </div>
            <input
              type="name"
              placeholder={driver?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Charity Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={driver?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Charity Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={driver?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Charity"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharitySettings;
