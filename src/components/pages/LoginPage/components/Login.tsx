// components/Login.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { appFirebase } from '../../../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import styles from './login.module.scss';  
import router from 'next/router';

const auth = getAuth(appFirebase);

const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email === 'bastionalquilerturismo@gmail.com') {
        alert('Bienvenido admin!.');
        console.log("Usuario autenticado:", user);
        router.replace('/adminPanel');
      } else {
        alert('Acceso denegado. Solo el admin puede iniciar sesión.');
        await auth.signOut();
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Iniciar sesión como Admin</h2>
      <button className={styles.loginButton} onClick={handleLogin}>
        <FontAwesomeIcon icon={faGoogle} className={styles.googleIcon} />
        Iniciar sesión  
      </button>
    </div>
  );
};

export default Login;
