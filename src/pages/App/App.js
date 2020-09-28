import React, { useContext } from 'react';
import './App.sass';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Logout from '../Logout/Logout';
import Homepage from '../Homepage/Homepage';
import NotFound from '../NotFound/NotFound';
// import Test from './Test';
import '../../utils/axios.interceptor';
import { UserContext, UserProvider } from '../../context/user.context';
import { MiscProvider } from '../../context/misc.context';
import { ModalsProvider } from '../../context/modals.context';
import { FiltersProvider } from '../../context/filters.context';
import Trending from '../Trending/Trending';
import Footer from '../../components/Footer/Footer';
import PreFooter from '../Homepage/PreFooter/PreFooter';
import Random from '../Random/Random';
import Overlay from '../../components/Overlay/Overlay';
import Browse from '../Browse/Browse';
import Search from '../Search/Search';
import ModalHolder from '../../components/modals/ModalHolder/ModalHolder';
import TagPage from '../Browse/TagPage/TagPage';
import Watch from '../Watch/Watch';
import AdminPanel from '../AdminPanel/AdminPanel';

function App() {
  return (
    <div className="App">
		<UserProvider>
		<MiscProvider>
		<ModalsProvider>
		<FiltersProvider>
		<Router>
			<Header />
			<Sidebar />
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/logout" component={Logout} />
				<Route path="/trending" component={Trending} />
				<Route path="/random" component={Random} />
				<Route path="/browse" exact component={Browse} />
				<Route path="/browse/:tag" component={TagPage} />
				<Route path="/search" component={Search} />
				<Route path="/movie/:id" component={Watch} />
				<Route path="/admin-panel" exact component={AdminPanel} />
				<Route path="/" component={NotFound} />
			</Switch>
			<PreFooter />
			<Footer />
			<Overlay />
			<ModalHolder />
		</Router>
		</FiltersProvider>
		</ModalsProvider>
		</MiscProvider>
		</UserProvider>
    </div>
  );
}

export default App;
