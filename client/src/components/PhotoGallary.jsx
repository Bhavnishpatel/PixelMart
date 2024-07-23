import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import ImageCard from "./ImageCard";

const PhotoGallary = () => {
  return (
    <div className="my-20 bg-white flex flex-col justify-center items-center">
        <h3 className="text-3xl font-semibold my-14">Photos</h3>
        {/* All My Photos Will Displayed Here */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
            {/* Image Card */}
            <ImageCard 
             title="Construction Site"
             author="bhavnishPatel"
             price={25}
             img='https://images.pexels.com/photos/19621553/pexels-photo-19621553/free-photo-of-view-of-a-crane.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
             icon1={<FaShoppingCart  className="text-2xl cursor-pointer hover:scale-110 transition-all ease-linear duration-300 text-black"/>}
             icon2={<IoIosHeart  className="text-2xl cursor-pointer hover:scale-110 transition-all ease-linear duration-300 text-red-500"/>}
            />
            <ImageCard 
             title="Buildings"
             author="ayushGajera"
             price={50}
             img='https://images.pexels.com/photos/16769639/pexels-photo-16769639/free-photo-of-kites-flying-over-people-at-park-in-saigon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
             icon1={<FaShoppingCart  className="text-2xl cursor-pointer hover:scale-110 transition-all ease-linear duration-300 text-black"/>}
             icon2={<IoIosHeart  className="text-2xl cursor-pointer hover:scale-110 transition-all ease-linear duration-300 text-red-500"/>}
            />
        </div>  
    </div>   
  )
}

export default PhotoGallary