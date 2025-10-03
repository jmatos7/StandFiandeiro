import React from "react";
import "../styles/About.scss";

const About: React.FC = () => {
  return (
    <div className="about">
      <section className="about__banner">
        <h1>Sobre o Stand Fiandeiro</h1>
        <p>Qualidade, confiança e as melhores viaturas usadas de Puerto Esperanza</p>
      </section>

      <section className="about__content">
        <div className="about__text">
          <h2>Nossa História</h2>
          <p>
            Eu, Luis Fiandeiro desde sempre fui muito ligado a viaturas. O meu primeiro emprego em Puerto Esperanza foi como taxista, empresa que inclusive geri. Mais tarde tornei-me mecânico e abri a minha própria oficina, onde comecei a adquirir algumas viaturas para venda!
          </p>
          <p>
            Posteriormente abri o Stand do Fiandeiro, negócio que comecou com apenas uma pessoa e que atualmente já tem uma equipa inteira e parceiros externos a tratar dos melhores negócios e oportunidades de Puerto Esperanza, sempre feitos a pensar em si!
          </p>
        </div>

        <div className="about__image">
          <img src="/logo.png" alt="Stand Fiandeiro" loading="lazy" />
        </div>
      </section>

      <section className="about__mission">
        <h2>Nossa Missão</h2>
        <p>
          A nossa missão é garantir viaturas de confiança para todas as gamas de preço aos cidadãos de Puerto Esperanza. Chegou à cidade e quer uma viatura barata? Temos o que precisa... Queres vender o teu carro usado e comprar uma viatura melhor? Também te conseguimos ajudar! Trabalhamos diariamente para garantir uma vasta gama de viaturas de todos os tipos e todos os preços. Sempre com o objetivo de ter uma relação de proximidade com o cliente!
        </p>
      </section>
    </div>
  );
};

export default About;
