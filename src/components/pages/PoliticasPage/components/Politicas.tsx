import React from 'react';
import styles from './politicas.module.scss';

const Politicas: React.FC = () => {
  return (
    <div className={styles.politicasContainer}>
      <h1>Política de Privacidad de Bastion</h1>
      <p><strong>Última actualización: 21/10/2024</strong></p>

      <p>
        En <strong>Bastion</strong> , valoramos tu privacidad y estamos comprometidos a proteger tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos la información que obtenemos a través de nuestro sitio web.
      </p>

      <h2>1. Información que Recopilamos</h2>
      <p>
        Recopilamos información personal que nos proporcionas cuando realizas una reserva, te registras en nuestro sitio o te pones en contacto con nosotros. Esta información puede incluir, pero no se limita a:
      </p>
      <ul>
        <li>Nombre</li>
        <li>Dirección de correo electrónico</li>
        <li>Número de teléfono</li>
        <li>Información de pago (por ejemplo, detalles de tarjetas de crédito)</li>
        <li>Preferencias de alojamiento</li>
        <li>Cualquier otra información que decidas proporcionarnos</li>
      </ul>

      <h2>2. Uso de la Información</h2>
      <p>
        Utilizamos tu información personal para:
      </p>
      <ul>
        <li>Procesar y gestionar tus reservas.</li>
        <li>Comunicarnos sobre tu reserva y cualquier cambio relevante.</li>
        <li>Mejorar nuestro servicio y la experiencia del usuario.</li>
        <li>Enviar promociones, ofertas especiales y actualizaciones (si te has suscrito a nuestro boletín informativo).</li>
        <li>Cumplir con nuestras obligaciones legales y reglamentarias.</li>
      </ul>

      <h2>3. Compartir la Información</h2>
      <p>
        No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
      </p>
      <ul>
        <li>Con proveedores de servicios que nos ayudan a operar nuestro sitio web y a ofrecer nuestros servicios (por ejemplo, procesadores de pagos).</li>
        <li>Para cumplir con la ley o en respuesta a solicitudes legales.</li>
        <li>Para proteger nuestros derechos, la privacidad, la seguridad o la propiedad de otros.</li>
      </ul>

      <h2>4. Cookies y Tecnologías Similares</h2>
      <p>
        Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario. Puedes optar por desactivar las cookies a través de la configuración de tu navegador, pero esto puede afectar tu capacidad para utilizar algunas funciones de nuestro sitio.
      </p>

      <h2>5. Seguridad de la Información</h2>
      <p>
        Tomamos medidas razonables para proteger la información personal que recopilamos. Sin embargo, ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro, y no podemos garantizar su seguridad absoluta.
      </p>

      <h2>6. Tus Derechos</h2>
      <p>
        Tienes derecho a acceder, corregir o eliminar tu información personal. Si deseas ejercer estos derechos, por favor contáctanos a través de los detalles que se indican a continuación.
      </p>

      <h2>7. Cambios a Esta Política de Privacidad</h2>
      <p>
        Nos reservamos el derecho a modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página con una nueva fecha de última actualización. Te recomendamos que revises esta Política periódicamente para estar informado sobre cómo protegemos tu información.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Si tienes preguntas sobre esta Política de Privacidad o nuestras prácticas, por favor contáctanos:
      </p>
      <ul>
        <li><strong>Email:</strong> bastionalquilerturismo@gmail.com</li>
        <li><strong>Teléfono:</strong> +54 9 2994 22-9283</li>
        {/* <li><strong>Dirección:</strong> [tu dirección]</li> */}
      </ul>
    </div>
  );
};

export default Politicas;
