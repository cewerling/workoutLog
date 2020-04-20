import React, {useState, useEffect} from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

// The code below replaces the old code.  This code uses Context.  It was created during the last module (https://elevenfifty.instructure.com/courses/187/pages/convert-to-context-optional-not-updated-to-hooks?module_item_id=13326)

constructor() {
  super();
  this.setToken = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }
  this.state = {
    sessionToken: '',
    setToken: this.setToken
  }
}

render() {
  return (
    <Router>
      <AuthContext.Provider value={this.state}>
      <div>
        <SiteBar clickLogout={this.logout} />
        {this.protectedViews()}
      </div>
      </AuthContext.Provider>
    </Router>
  ):
}



// Removed this when converting to Context in the last module.  See App_OLD_Before_Context.  That is the old file.
// But, it is pretty much here below as well.

//   const [sessionToken, setSessionToken] = useState('');

//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       setSessionToken(localStorage.getItem('token'));
//     }
//   }, [])

//   const updateToken = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setSessionToken(newToken);
//     console.log(sessionToken);
//   }

//   const clearToken = () => {
//     localStorage.clear();
//     setSessionToken('');
//   }

//   const protectedViews = () => {
//     return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} />
//     : <Auth updateToken={updateToken} />)
//   }

//   return (
//     <div>
//       <Sitebar clickLogout={clearToken} />
//       {protectedViews()}
//     </div>
//   );
// }

export default App;