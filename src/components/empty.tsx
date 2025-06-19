
import NoData from '../assets/no-data.svg'
function Empty() {
  return (
    <div className='w-full h-full p-5 flex justify-center items-center'><img className='min-w-20 min-h-20 max-w-96 max-h-96' src={NoData} alt='nodata' width={648} height={642} /></div>
  )
}

export default Empty