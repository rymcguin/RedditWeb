import Link from 'next/link'
import RedditLogo from '../images/reddit.svg'

const Navbar: React.FC = () => {
    return(
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
        {/* Logo and Title */}
        <div className="flex items-center">
          <Link href="/">
            <a>
              <RedditLogo className="w=8 h-8 mr-2"/>
            </a>
          </Link>
          <span className="text-2xl font-semibold font">
              <Link href="/">  
                Readit
              </Link>
          </span>
        </div>
        {/* Search Input */}
        <div className="flex items-center mx-auto bg-gray-100 border rounded hover:bg-white hover:border-blue-500">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
          <input type="text" className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none" placeholder="Search"/>
        </div>
        {/* Auth Buttons */}
        <div className="flex">
          <Link href="/login">
            <a className="py-1 mr-4 leading-4 w-28 hollow blue button">Login</a>
          </Link>
          <Link href="/register">
            <a className="py-1 leading-4 w-28 blue button">Sign up</a>
          </Link>
        </div>
        
      </div>
    )
}

export default Navbar