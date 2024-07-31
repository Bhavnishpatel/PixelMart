import React from 'react'
import DashboardHeader from '../DashboardHeader'
import ImageAdd from '../ImageAdd'

const PhotoManagement = () => {
  return (
    <div className='flex flex-col sm:flex-row '>
        <div>
            {/* DashBoard header will here */}
            <DashboardHeader />
            {/* Image add  */}
            <ImageAdd />
        </div>
    </div>
  )
}

export default PhotoManagement