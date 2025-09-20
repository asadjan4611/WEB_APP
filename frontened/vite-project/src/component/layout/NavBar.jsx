
import styles from '../../style/style'
import { naviItems } from '../../static/data'
import { Link } from 'react-router-dom'

const NavBar = ({active}) => {
  // console.log(active)
  return (
  <div className={`${styles.noramlFlex}`}>
      {
        naviItems && naviItems.map((i,index)=>(
          <div key={index} className='flex'>
            <Link to={i.url} className={`${active === index+1 ? 'text-[#db3e00]' : 'text-[#1b6346] font-[600] px-6 cursor-pointer'}`  } >
            {i.title}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default NavBar
