import { useEffect, useState } from 'react';
import { UserDTO } from '../../../models/user';
import * as userService from '../../../services/user-service';
import PieChart from '../../../components/PieChart';
import './styles.css';

function AdminHome() {

  const [user, setUser] = useState<UserDTO>();

  useEffect(() => {
    userService.findMe()
      .then(response => {
        setUser(response.data);
    });
  }, []);

  return (
    <main>
      <section id="admin-home-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">Bem-vindo à àrea administrativa {user?.name}</h2>
      </section>
      <PieChart />
    </main>
  );
}

export default AdminHome;
