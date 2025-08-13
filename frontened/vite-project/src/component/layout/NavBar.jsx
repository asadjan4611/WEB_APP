
import styles from '../../style/style'
import { naviItems } from '../../static/data'
import { Link } from 'react-router-dom'

const NavBar = ({active}) => {
  return (
  <div className={`${styles.noramlFlex}`}>
      {
        naviItems && naviItems.map((i,index)=>(
          <div key={index} className='flex'>
            <Link to={"/i"} className={`${active === index+1} ? "text-[#17dd1f] : "text-green font-[600] px-6 cursor-pointer"` } >
            {i.title}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default NavBar
