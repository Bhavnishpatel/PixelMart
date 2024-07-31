import DashboardSidebar from "../components/DashboardSidebar"
import PhotoManagement from "../components/seller/PhotoManagement"

const SellerDashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      <div>
        {/* we will changes the pages through the switch case here */} 
      </div>
      <PhotoManagement />    
      </div>
  )
}

export default SellerDashboard