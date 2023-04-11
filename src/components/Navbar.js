import "./NavbarStyles.css";


function Navbar(){
    return(
        <> 
        <nav>
            <a class="navbar-brand logo-image" href="index.html"><img src={require('./images/logo.png')} alt="alternative"></img></a>
            <div>
                <ul id="navbar"class="navbar-nav ml-auto">
                    <li class="nav-item"><a class="nav-link page-scroll" href="index.html">HOME</a></li>
                    <li class="nav-item"><a class="nav-link page-scroll" href="index.html">TECHQUICKIE</a></li>
                    <li class="nav-item"><a class="nav-link page-scroll" href="index.html">ABOUT</a></li>
                    <li class="nav-item"><a class="nav-link page-scroll" href="index.html">GET STARTED</a></li>
                    
                </ul>
                
                  
      
            </div>
         </nav>
        
        
        
        </>
    )
}
export default Navbar;