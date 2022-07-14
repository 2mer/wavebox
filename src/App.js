import './App.css';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage';
import AppProviders from './AppProviders';

function App() {
	return (
		<AppProviders>
			<Layout>
				<MainPage />
			</Layout>
		</AppProviders>
	);
}

export default App;
