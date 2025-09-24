import React from "react";
import "../styles/About.scss";

const About: React.FC = () => {
  return (
    <div className="about">
      <section className="about__banner">
        <h1>Sobre o Stand Fiandeiro</h1>
        <p>Qualidade, confiança e os melhores carros usados de Puerto Esperanza</p>
      </section>

      <section className="about__content">
        <div className="about__text">
          <h2>Nossa História</h2>
          <p>
            O Stand Fiandeiro começou como um pequeno negócio familiar no coração de Puerto Esperanza. 
            Ao longo dos anos, conquistamos a confiança da comunidade graças à nossa transparência e dedicação.
          </p>
          <p>
            Hoje, oferecemos uma seleção exclusiva de carros usados de qualidade, garantindo sempre o melhor serviço 
            e atendimento personalizado.
          </p>
        </div>

        <div className="about__image">
          <img src="/logo.png" alt="Stand Fiandeiro" loading="lazy"/>
        </div>
      </section>

      <section className="about__mission">
        <h2>Nossa Missão</h2>
        <p>
          Proporcionar aos habitantes de Puerto Esperanza carros usados de confiança, com preços justos e atendimento personalizado, 
          tornando a experiência de compra agradável e segura.
        </p>
      </section>
    </div>
  );
};

export default About;
