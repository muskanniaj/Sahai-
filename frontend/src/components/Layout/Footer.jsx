import React from 'react'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {
  footercompanyLinks,
  footerDriveLinks,
  footerSupportLinks,
} from '../../static/data'

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7"></div>
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://www.globalgiving.org/img/logos/gg_horizontal_color_300.png"
            alt=""
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <br />
          <p>"Empathy in action, changing lives through love."</p>
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Societal</span>
      </div>
    </div>
  )
}

export default Footer
